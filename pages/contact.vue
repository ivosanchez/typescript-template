<template>
  <main class="container">

    <myAuthors :datasource="fooddata" />
    <!-- <AppRestaurantInfo :datasource="fooddata" /> -->

  </main>
</template>

<script>
import AppRestaurantInfo from "@/components/AppRestaurantInfo.vue";

export default {
  components: {

    AppRestaurantInfo: () =>
      import(/* webpackPrefetch: true */ "@/components/AppRestaurantInfo.vue"),
  },

  computed: {
    fooddata() {
      return this.$store.state.fooddata;
    },
  },
};
</script>
<style scoped>
*{
  background: rgba(0, 255, 0, 0.61);
}
</style>