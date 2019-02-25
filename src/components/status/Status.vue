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

  props: {
    /**
     * Whether the request to enable Web3 should happen right away.
     */
    deferred: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    loading: false,
    available: false,
    account: null,
    networkVersion: null
  }),

  methods: {
    /**
     * Sets up web3, calls window.ethereum.enable(), and updates status
     * @public
     */
    getWeb3() {
      if (typeof window.ethereum === "undefined") {
        return
      }
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
          this.loading = false
          this.update()
        })
        .catch(error => {
          this.account = null
          this.networkVersion = null
          this.loading = false
          this.update()
        })
    },

    update() {
      /**
       * Fires when the status of Web3 changes.
       * @event update
       * @type { object }
       */
      this.$emit("update", {
        available: this.available,
        account: this.account,
        networkVersion: this.networkVersion
      })
    }
  },

  mounted() {
    if (this.deferred || typeof window.ethereum === "undefined") {
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
      account: this.account,
      networkVersion: this.networkVersion,
      getWeb3: this.getWeb3
    })
    if (children.length) {
      return create("div", [children])
    }
    return children
  }
}
</script>
