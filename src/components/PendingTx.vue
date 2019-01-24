<script>
import { getMinedTx } from "../utils"

export default {
  props: {
    tx: {
      type: [String, Object],
      required: true
    },
    interval: {
      type: [String, Number]
    },
    timeout: {
      type: [String, Number]
    }
  },
  model: {
    prop: "tx",
    event: "mined"
  },

  data: () => ({
    pending: true,
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
          this.$emit("mined", this.localTx)
          this.pending = false
        })
        .catch(error => {
          this.error = error
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
      console.warn("[PendingTx] Requires 1 root element. Using injected <div>.")
      return create("div", [children])
    }
    return children
  }
}
</script>
