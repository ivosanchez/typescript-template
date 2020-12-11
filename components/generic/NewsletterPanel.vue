<template>
  <div>
    <h3 class="background__banner home__banner">Info-<br/>lettre</h3>
    <newsletter-form :content="content" class="newsletter--panel">
      <p class="newsletter__message">{{ message }}</p>
    </newsletter-form>
  </div>
</template>

<script>
import NewsletterForm from './NewsletterForm'

export default {
  name: 'newsletter-panel',
  components: { NewsletterForm },
  mounted() {
    this.$emit('panel-open')
  },

  beforeDestroy() {
    this.$emit('panel-close')
  },

  computed: {
    message() { return this.$store.state.content.meta['signup-message'] },
    content() {
      let { 'signup-title': title, 'signup-label': submit } = this.$store.state.content.meta
      return {
        title,
        submit,
        placeholder: 'Courriel'
      }
    }
  }
}
</script>



// WEBPACK FOOTER //
// NewsletterPanel.vue?4a0a5783