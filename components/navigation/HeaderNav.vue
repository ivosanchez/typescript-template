<template>
  <header 
    class="header" :class="classes">

    <Nuxt-link to="/">
      <spk-logo class="header__logo"/>
    </Nuxt-link>

    <ul 
      v-if="mobile" class="header__social">
      
      <li  class="header__account">

        <a :href="account.url" target="_blank">
          <icon :id="facebook"/></a>
          
      </li>
    </ul>

    <mobile-menu 
    
    v-if="mobile" :expand="expand" :links="links" @menu-close="expand = false"/>

    <button v-if="mobile" class="burger" :class="burgerState" @click="expand = !expand"><i class="burger--icon"></i></button>

    <nav v-if="!mobile">

      <Nuxt-link  :to="'/contact'" class="header__link">
         mail
        </Nuxt-link>
      
      <Nuxt-link to="/noticias" class="header__link header__link--cta">
        <icon id="newsletter"/>
        <span>Infolettre</span>
      </Nuxt-link>
    </nav>
  </header>
</template>

<script>
import MobileMenu from './MobileMenu'

export default {
  name: 'header-nav',
  components: { MobileMenu },
  props: { modifier: String },

  data() {
    return {
      expand: false
    }
  },

  computed: {
    mobile() { return this.$mq.mobile },
    links() { return this.$store.state.content.meta.links },
    social() {
      return {
        accounts: this.$store.state.content.meta.accounts,
        label: this.$store.state.content.meta.label
      }
    },
    classes() {
      return {
        [`header--${this.modifier}`]: this.modifier,
        'header--menu-open': this.expand
      }
    },
    burgerState() {
      return {
        'burger--close': this.expand
      }
    }
  }
}
</script>



// WEBPACK FOOTER //
// HeaderNav.vue?83f27eba
