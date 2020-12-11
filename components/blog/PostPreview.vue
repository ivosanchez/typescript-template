<template>
  <article class="preview" :class="classes">
    <Nuxt-link :to="link" class="preview__link">
      <img v-if="post.image" class="preview__img" :src="image" :alt="post.image.alt">
    </Nuxt-link>

    <Nuxt-link :to="link" class="preview__content">
      <Nuxt-link :to="`/blogue/categorie/${post.category}`">
        <icon :id="post.category" :class="`preview__icon preview__icon--${post.category}`"/>
      </Nuxt-link>

      <h3 class="preview__title">{{ title }}</h3>
      <p v-if="featured">{{ getExcerpt() }}</p>
      <p :class="`preview__cat preview__cat--${post.category}`">{{ cat }}</p>
    </Nuxt-link>
  </article>
</template>

<script>
import {clipText} from "@/utils/text";
import {getElapsedTime} from "@/utils/time";

export default {
  name: 'post-preview',
  props: {
    post: Object,
    params: Object,
    featured: Boolean
  },

  computed: {
    cat() { return this.$store.state.categories[this.post.category].label },
    image() { return (this.featured) ? this.post.image.crops.featured : this.post.image.url },
    title() {
      let title = this.post.title || ((this.post.fulltitle) ? this.post.fulltitle[0].content : ' ')
      return (this.featured) ? clipText(title, 75) : title
    },
    link() {
      return {
        name: 'blog-post',
        params: { uid: this.post.path, ...this.params }
      }
    },
    classes() {
      return {
        'preview--featured': this.featured
      }
    }
  },

  methods: {
    getElapsedTime,
    getExcerpt() {
      let excerpt = ''
      let i = 0

      while (!~excerpt.indexOf('...')) {
        let next = this.post.text[i]
        if (next.component === 'content-text') {
          excerpt += ' ' + clipText(next.content, 160 - excerpt.length)
        }
        i++
      }

      return excerpt.replace(/<[^>]+>/g, '')
    }
  }
}
</script>



// WEBPACK FOOTER //
// PostPreview.vue?102fc438
