<template>
  <svg class="icon"><use :xlink:href="`#${id}`"/></svg>
</template>

<script>
export default {
  name: 'icon',
  props: { id: String }
}
</script>



// WEBPACK FOOTER //
// Icon.vue?aabe67a2