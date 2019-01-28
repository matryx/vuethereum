<script>
import ethers from "ethers"

export default {
  name: "vth-contract",

  props: {
    address: {
      type: String,
      required: true
    },
    abi: {
      type: Array,
      required: true
    }
  },

  data: () => ({
    contract: null
  }),

  mounted() {
    const provider = window.web3.currentProvider
    const signer = new ethers.providers.Web3Provider(provider).getSigner()
    this.contract = new ethers.Contract(this.address, this.abi, signer)
  },

  render(create) {
    if (!this.$scopedSlots.default) {
      return create(false)
    }
    const children = this.$scopedSlots.default({
      ...this.contract // Must pass in clone
    })
    if (children.length) {
      // Can only return 1 root node
      return create("div", [children])
    }
    return children
  }
}
</script>
