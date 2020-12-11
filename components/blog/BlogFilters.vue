<template>
  <ul class="blog__filters">
    <li class="blog__filter" :class="noActiveFilter"><Nuxt-link to="/blogue" class="blog__filter--link">{{ 'Tous' }}</Nuxt-link></li>

    <Nuxt-link v-for="category in categories" :to="`/blogue/categorie/${category.name}`" tag="li" :class="`blog__filter blog__filter--${category.name}`">
      <a class="blog__filter--link"><icon :id="category.name"/><span class="blog__filter--label">{{ category.label }}</span></a>
    </Nuxt-link>
  </ul>
</template>

<script>
export default {
  name: 'blog-filters',
  computed: {
    categories() {
      let categories = this.$store.state.categories
      return Object.keys(categories).map(cat => categories[cat])
    },
    noActiveFilter() {
      return {
        'active': !~this.$route.path.indexOf('categorie')
      }
    }
  }
}
</script>



// WEBPACK FOOTER //
// BlogFilters.vue?71f201e2