export default {
  name: 'safe-link',
  render(h) {
    let tag = (this.url) ? 'a' : 'span'
    let data = (this.url) ? { attrs: { href: this.url, target: '_blank' } } : {}
    return h(tag, data, this.$slots.default)
  },
  props: {
    url: String
  }
}



// WEBPACK FOOTER //
// ./src/components/content/safe-link.js