<template>
  <aside class="sidebar" :class="classes">
    <Nuxt-link v-if="to" :to="to" class="sidebar__link"><span class="sidebar__label">{{ label }}</span></Nuxt-link>

    <div v-if="left" class="sidebar__social">
      <h6>{{ social.label }}</h6>

      <ul>
        <li v-for="account in social.accounts" class="sidebar__account">
          <a :href="account.url"  target="_blank"><icon :id="account.icon"/></a>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'side-bar',
  props: {
    modifier: String,
    left: Boolean,
    to: String
  },

  computed: {
    label() {
      return this.$router.options.routes.find(route => route.path === this.to).meta.label
    },
    social() {
      return {
        accounts: this.$store.state.content.meta.accounts,
        label: this.$store.state.content.meta.label
      }
    },
    classes() {
      return {
        'sidebar--left': this.left,
        'sidebar--right': !this.left,
        'sidebar--linked': this.to,
        [`sidebar--${this.modifier}`]: this.modifier
      }
    }
  }
}
</script>



// WEBPACK FOOTER //
// SideBar.vue?eef5b498