<template>
  <object v-html="symbols" />
</template>

<script>
export default {
  name: 'SvgSymbols',
  props: { name: String },

  data () {
    return {
      symbols: null
    }
  },
  beforeMount () {
    this.$http.get(`/static/svg/${this.name}.svg`)
      .then(response => response.blob())
      .then((blob) => {
        const reader = new FileReader()
        reader.onload = () => { this.symbols = reader.result }
        reader.readAsText(blob)
      })
  }
}
</script>

<style scoped>
  object { display: none }
</style>
