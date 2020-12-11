<template>
  <div>
    <h3 class="background__banner home__banner">{{ content.banner }}</h3>

    <section class="contact">
      <div class="contact__info">
        <h4 class="contact__label contact__label--info">coordonnées</h4>
        <address class="contact__item">{{ content.address }}</address>

        <span>
          <h5 class="contact__item">{{ content.phone }}</h5>
          <h5 class="contact__item">{{ content.email }}</h5>
        </span>
      </div>

      <form name="contact-form" action="/" method="post" ref="form" class="contact__form" :class="form" @submit.prevent="send" netlify>
        <fieldset class="contact__field">
          <label class="contact__label" for="name">nom</label>
          <input id="name" name="name" class="contact__input" type="text" autocomplete="name" autocapitalize="words" autocorrect="off" spellcheck="false"
            v-model="fields.name.value" :data-invalid="!fields.name.valid" @focus="fields.name.valid = true"/>
        </fieldset>

        <fieldset class="contact__field">
          <label class="contact__label" for="email">courriel</label>
          <input id="email" name="email" class="contact__input" type="text" autocomplete="email"
            v-model="fields.email.value" :data-invalid="!fields.email.valid" @focus="fields.email.valid = true"/>
        </fieldset>

        <fieldset class="contact__field contact__field--full">
          <label class="contact__label" for="message">message</label>
          <textarea id="message" name="message" class="contact__input contact__input--message"
            v-model="fields.message.value" :data-invalid="!fields.message.valid" @focus="fields.message.valid = true"></textarea>
        </fieldset>

        <button class="button button--fill" :class="submitButton">
          <span class="button__bg">
            <svg class="button__fold button__fold--c"><use xlink:href="#button-fold-c"/></svg>
            <svg class="button__fold button__fold--b"><use xlink:href="#button-fold-b"/></svg>
            <svg class="button__fold button__fold--a"><use xlink:href="#button-fold-a"/></svg>
          </span>

          <span class="button__label">envoyer</span>
        </button>

        <div class="contact__message">
          <span class="contact__success" :class="successMessage">Votre message a bien été envoyé, merci!</span>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
export default {
  name: 'contact-view',
  mounted() {
    this.$emit('panel-open')
  },

  beforeDestroy() {
    this.$emit('panel-close')
  },

  data() {
    return {
      success: false,
      submitted: false,
      fields: {
        name: {
          value: null,
          valid: true,
          required: true,
          sanitize: [ /<[^>]+>/g ]
        },
        email: {
          value: null,
          valid: true,
          required: true,
          pattern: /[^\s@]+@[^\s@]+\.[^\s@]+/
        },
        message: {
          value: null,
          valid: true,
          required: true,
          sanitize: [ /<[^>]+>/g ]
        }
      }
    }
  },

  computed: {
    entries() { return Object.keys(this.fields).map(name => ({ name, ...this.fields[name] })) },
    content() {
      let { contact: banner, address, phone, email } = this.$store.state.content.meta
      return { banner, address, phone, email }
    },
    form() {
      return {
        'submitted': this.submitted
      }
    },
    submitButton() {
      return {
        'button--disabled': this.submitted
      }
    },
    successMessage() {
      return {
        'contact__success--visible': this.success
      }
    }
  },

  methods: {
    valid() {
      return this.entries.every(field => {
        let notNull = !field.required || !!(field.value && field.value.replace(/\s/g, '').length)
        let matches = !field.pattern || field.pattern.test(field.value)
        let valid = notNull && matches
        this.fields[field.name].valid = valid
        return valid
      })
    },
    getFormData() {
      let formData = { 'form-name': this.$refs.form.attributes.name.value }

      this.entries.forEach(({ name, value, sanitize }) => {
        if (sanitize && value) {
          sanitize.forEach(pattern => {
            value = value.replace(pattern, '')
          })
        }

        formData[name] = value
      })

      return Promise.resolve(formData)
    },
    send() {
      if (!this.submitted) {
        this.submitted = true

        if (this.valid()) {
          this.getFormData().then(formData => {
            this.$http.post(this.$refs.form.attributes.action.value, formData, { emulateJSON: true }).then(response => {
              this.success = true
            })
          })
        } else {
          this.submitted = false
        }
      }
    }
  }
}
</script>



// WEBPACK FOOTER //
// Contact.vue?7082d396