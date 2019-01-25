<script>
import Web3 from "web3"

export default {
  name: "vth-status",

  // TODO: Props?
  // config={{
  //   DEBUG:false,
  //   requiredNetwork:['Unknown','Rinkeby'],
  //   hide:false
  // }}
  // metatx={METATX}
  // fallbackWeb3Provider={new Web3.providers.HttpProvider(WEB3_PROVIDER)}
  // onUpdate={(state)=>{
  //  console.log("metamask state update:",state)
  //  if(state.web3Provider) {
  //    state.web3 = new Web3(state.web3Provider)
  //    this.setState(state)
  //  }
  // }}

  data: () => ({
    loading: false,
    available: false,
    enabled: false,
    account: null,
    networkVersion: null
  }),

  methods: {
    getWeb3() {
      this.available = true

      const web3 = new Web3(window.ethereum)
      window.web3 = web3

      const getNetwork = new Promise((resolve, reject) => {
        web3.version.getNetwork((err, networkVersion) => {
          if (err) {
            return reject(err)
          }
          resolve(networkVersion)
        })
      })
      const getAccounts = window.ethereum.enable()

      this.loading = true
      return Promise.all([getAccounts, getNetwork])
        .then(results => {
          const [accounts, networkVersion] = results
          this.account = accounts[0]
          this.networkVersion = networkVersion
          this.enabled = true
          this.loading = false
          this.update()
        })
        .catch(error => {
          this.enabled = false
          this.account = null
          this.networkVersion = null
          this.loading = false
          this.update()
        })
    },

    update() {
      this.$emit("update", {
        available: this.available,
        enabled: this.enabled,
        account: this.account,
        networkVersion: this.networkVersion
      })
    }
  },

  mounted() {
    if (typeof window.ethereum === "undefined") {
      return
    }
    this.getWeb3().then(() => {
      window.web3.currentProvider.publicConfigStore.on("update", config => {
        this.account = config.selectedAddress
        this.networkVersion = config.networkVersion
        this.update()
      })
    })
  },

  render(create) {
    const children = this.$scopedSlots.default({
      loading: this.loading,
      available: this.available,
      enabled: this.enabled,
      account: this.account,
      networkVersion: this.networkVersion,
      getWeb3: this.getWeb3
    })
    if (children.length) {
      console.warn("[Web3Provider] Requires 1 root element. Using injected <div>.")
      return create("div", [children])
    }
    return children
  }
}
</script>
