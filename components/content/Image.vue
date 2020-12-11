<template>
  <figure>
    <img :src="content.url" :alt="content.alt" :style="`width:${content.width}px;`"/>
    <figcaption v-if="content.caption && content.caption.length">{{ content.caption }}</figcaption>
  </figure>
</template>

<script>
export default {
  name: 'content-image',
  props: {
    item: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      content: this.item.content
    }
  }
}
</script>
