export default {
  name: 'content-wrapper',
  render(h) {
    return h(this.tag, this.$slots.default)
  },
  props: {
    tag: {
      type: String,
      required: true
    }
  }
}



// WEBPACK FOOTER //
// ./src/components/content/wrapper.js