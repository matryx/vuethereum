<script>
import { getMinedTx } from "../../utils/index"

export default {
  name: "vth-tx",

  props: {
    /**
     * An Ethereum transaction object or hash address
     */
    tx: {
      type: [String, Object],
      required: true
    },
    /**
     * How frequently in milliseconds to check on the status of the transaction
     */
    interval: {
      type: [String, Number]
    },
    /**
     * How much time in milliseconds before the pending transaction should error
     */
    timeout: {
      type: [String, Number]
    }
  },

  data: () => ({
    pending: false,
    error: null,
    localTx: null
  }),

  methods: {
    getMinedTx(txReceipt) {
      txReceipt = txReceipt || this.localTx
      const options = {
        interval: +this.interval,
        timeout: +this.timeout
      }
      this.pending = true
      getMinedTx(txReceipt, options)
        .then(tx => {
          this.localTx = tx
          /**
           * The mined transaction object
           * @event mined
           * @type { object }
           */
          this.$emit("mined", this.localTx)
          this.pending = false
        })
        .catch(error => {
          this.error = error
          /**
           * An error object if there is one
           * @event error
           * @type { error }
           */
          this.$emit("error", error)
          this.pending = false
        })
    }
  },

  watch: {
    tx: {
      immediate: true,
      deep: true,
      handler(nextTx) {
        if (!nextTx) return

        if (typeof nextTx === "object") {
          this.localTx = nextTx
        } else {
          window.web3.eth.getTransactionReceipt(nextTx, (error, tx) => {
            if (error) {
              this.error = error
            } else if (tx && tx.blockNumber) {
              this.localTx = tx
            }
          })
        }
        this.getMinedTx(nextTx)
      }
    }
  },

  render(create) {
    if (!this.$scopedSlots.default) {
      return create(false)
    }
    const children = this.$scopedSlots.default({
      pending: this.pending,
      tx: this.localTx,
      error: this.error,
      getMinedTx: this.getMinedTx
    })
    if (children.length) {
      return create("div", [children])
    }
    return children
  }
}
</script>
