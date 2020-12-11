export default {
  beforeMount() {
    this.updateMeta()
  },

  computed: {
    metaData() {
      return {
        title: this.content.metatitle,
        description: this.content.metadesc,
        openGraph: {
          image: (this.content.ogimage) ? this.content.ogimage.crops.facebook : null
        }
      }
    }
  },

  methods: {
    updateMeta() {
      this.$meta.tags = this.metaData
    }
  }
}



// WEBPACK FOOTER //
// ./src/components/mixins/meta-data.js