<script>
import blockies from "blockies"

const NAME = "vth-blockie"

export default {
  name: NAME,

  functional: true,

  props: {
    string: {
      type: String,
      required: true
    },
    options: {
      type: Object
    }
  },

  render(create, { props, data }) {
    const avatar = blockies({
      ...props.options,
      seed: props.string
    })

    return create("img", {
      class: [NAME, data.staticClass],
      attrs: {
        ...data.attrs,
        src: avatar.toDataURL(),
        alt: data.attrs.alt || props.string
      }
    })
  }
}
</script>
