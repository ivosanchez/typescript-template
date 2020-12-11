<template>
  <content-wrapper :tag="item.props.tag" v-html="item.content"/>
</template>

<script>
export default {
  name: 'content-text',
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>



// WEBPACK FOOTER //
// Text.vue?4b77246c