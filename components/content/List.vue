<template>
  <ul>
    <li v-for="li in item.content" v-html="li"></li>
  </ul>
</template>

<script>
export default {
  name: 'content-list',
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>



// WEBPACK FOOTER //
// List.vue?41cc7334