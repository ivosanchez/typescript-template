<template>
  <menu class="menu" :class="classes" :style="`height:${height}px;`">
    <li class="menu__tray menu__tray--nodes">
      <nav class="menu__nav">
        <Nuxt-link to="/" class="menu__link" exact @click.native="$emit('menu-close')">{{ homeNode.meta.label }}</Nuxt-link>
        <Nuxt-link v-for="node in nodes" v-if="!node.meta.hidden && node.meta.index" :to="node.path" class="menu__link" @click.native="$emit('menu-close')">{{ node.meta.label }}</Nuxt-link>
      </nav>
    </li>

    <li class="menu__tray menu__tray--links">
      <nav class="menu__nav">
        <Nuxt-link v-for="link in links" :to="link.path" class="menu__link" @click.native="$emit('menu-close')">{{ link.label }}</Nuxt-link>
        <Nuxt-link to="/infolettre" class="menu__link menu__link--cta" @click.native="$emit('menu-close')">
          <icon id="newsletter"/>
          <span>Infolettre</span>
        </Nuxt-link>
      </nav>
    </li>
  </menu>
</template>

<script>
export default {
  name: 'mobile-menu',
  props: {
    links: Array,
    expand: Boolean
  },

  beforeDestroy() {
    document.removeEventListener('touchmove', this.preventScroll)
  },

  data() {
    return {
      height: window.innerHeight
    }
  },

  computed: {
    nodes() { return this.$router.options.routes.map(({ path, meta }) => ({ path, meta })) },
    homeNode() { return this.$router.options.routes[0] },
    classes() {
      return {
        'menu--open': this.expand
      }
    }
  },

  watch: {
    expand(expanded) {
      if (expanded) {
        this.height = window.innerHeight
        document.addEventListener('touchmove', this.preventScroll, { passive: false })
      } else {
        document.removeEventListener('touchmove', this.preventScroll)
      }
    }
  },

  methods: {
    manage(e) {
      if (e.target.classList.contains('menu__link')) {
        this.$emit('menu-close')
      }
    },
    preventScroll(e) {
      e.preventDefault()
    }
  }
}
</script>



// WEBPACK FOOTER //
// MobileMenu.vue?96cdd25e