<template>
  <footer v-if="$mq.desktop" class="footer" :class="classes">
    <nav class="footer__nav">
      <Nuxt-link to="/" class="footer__node" exact>{{ homeNode.meta.label }}</Nuxt-link>
      <Nuxt-link v-for="node in nodes" v-if="!node.meta.hidden && node.meta.index" :to="node.path" class="footer__node">{{ node.meta.label }}</Nuxt-link>
    </nav>

    <side-bar
      :left="true"
      :to="sidebars.left ? sidebars.left.to : null"
      :modifier="sidebars.left ? sidebars.left.modifier : null"/>

    <side-bar v-if="sidebars.right"
      :to="sidebars.right.to"
      :modifier="sidebars.right.modifier"/>

  </footer>
</template>

<script>
import SideBar from './SideBar'

export default {
  name: 'footer-nav',
  components: { SideBar },
  props: {
    modifier: String,
    sidebars: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    nodes() { return this.$router.options.routes.map(({ path, meta }) => ({ path, meta })) },
    homeNode() { return this.$router.options.routes[0] },
    classes() {
      return {
        [`footer--${this.modifier}`]: this.modifier
      }
    }
  }
}
</script>



// WEBPACK FOOTER //
// FooterNav.vue?6e190e24
