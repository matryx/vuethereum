<script>
import blockies from "blockies"

const NAME = "vth-blockie"

/**
 * Component for implementing [Ethereum Blockies](https://github.com/ethereum/blockies)
 */
export default {
  name: NAME,

  functional: true,

  props: {
    /**
     * The string you want to depict as a blockie (usually an Ethereum address)
     */
    string: {
      type: String,
      required: true
    },
    /**
     * Accepts the same options as [Ethereum Blockies](https://github.com/ethereum/blockies#use)
     */
    options: {
      type: Object
    },
    /**
     * If you want the final result to be round
     */
    round: {
      type: Boolean
    }
  },

  render(create, { props, data }) {
    const avatar = blockies({
      ...props.options,
      seed: props.string
    })

    return create("img", {
      class: [NAME, data.staticClass, { [`${NAME}--round`]: props.round }],
      attrs: {
        ...data.attrs,
        src: avatar.toDataURL(),
        alt: data.attrs.alt || props.string
      }
    })
  }
}
</script>

<style>
.vth-blockie--round {
  border-radius: 50%;
}
</style>
