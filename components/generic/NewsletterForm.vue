<template>
  <div class="newsletter">
    <h5 class="newsletter__title">{{ content.title }}</h5>

    <slot/>

    <form name="newsletter-form" action="/" method="post" ref="form" class="newsletter__form" :class="formClasses" @submit.prevent="send" netlify>
      <input id="email" name="email" class="newsletter__input" type="text" autocomplete="email" :placeholder="content.placeholder"
        v-model="value" :data-invalid="!valid" @focus="valid = true"/>

      <button class="button button--fill newsletter__submit" :class="submitButton">
        <span class="button__bg">
          <svg class="button__fold button__fold--c"><use xlink:href="#button-fold-c"/></svg>
          <svg class="button__fold button__fold--b"><use xlink:href="#button-fold-b"/></svg>
          <svg class="button__fold button__fold--a"><use xlink:href="#button-fold-a"/></svg>
        </span>

        <span class="button__label">{{ content.submit }}</span>
      </button>

      <h6 class="newsletter__success">Vous êtes maintenant abonné à l'infolettre!</h6>
    </form>
  </div>
</template>

<script>
export default {
  name: 'newsletter-form',
  props: {
    content: Object
  },

  data() {
    return {
      value: '',
      valid: true,
      success: false,
      submitted: false
    }
  },

  computed: {
    formClasses() {
      return {
        'success': this.success,
        'submitted': this.submitted
      }
    },
    submitButton() {
      return {
        'button--disabled': this.submitted
      }
    }
  },

  methods: {
    send() {
      if (!this.submitted) {
        this.submitted = true

        if (this.value.length && /[^\s@]+@[^\s@]+\.[^\s@]+/.test(this.value)) {
          let formData = {
            'form-name': this.$refs.form.attributes.name.value,
            'email': this.value
          }

          this.$http.post(this.$refs.form.attributes.action.value, formData, { emulateJSON: true }).then(response => {
            this.success = true
          })
        } else {
          this.valid = false
          this.submitted = false
        }
      }
    }
  }
}
</script>



// WEBPACK FOOTER //
// NewsletterForm.vue?dce7962a