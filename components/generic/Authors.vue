<template>
  <div>
    <div class="background">
      <h3 class="background__banner home__banner home__banner--panel">{{ banner }}</h3>
    </div>

    <section v-if="ready" class="author__list">
      <div v-for="author in authors" v-if="!author.hidden" class="author">
        <figure class="author__figure">
          <img v-if="author.photo" :src="author.photo.url" :alt="author.photo.alt"/>
        </figure>

        <ul class="author__social">
          <li v-for="account in author.accounts" class="author__link">
            <a :href="account.url" target="_blank"><icon :id="account.network"/></a>
          </li>

          <li v-if="author.photo" class="author__overflow" :style="`background-image:url(${author.photo.url});`"></li>
        </ul>

        <h4 class="author__name">{{ author.name }}</h4>
        <h5 class="author__title">{{ author.title }}</h5>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'authors-view',
  mounted() {
    if (!Object.keys(this.authors).length) {
      this.$store.dispatch('fetchAuthors')
    } else {
      this.ready = true
      this.$emit('panel-open')
    }
  },

  beforeDestroy() {
    this.$emit('panel-close')
  },

  data() {
    return {
      ready: false
    }
  },

  computed: mapState({
    authors: state => state.authors,
    banner: state => state.content.meta.authors
  }),

  watch: {
    authors() {
      if (!this.ready) {
        this.ready = true
        this.$emit('panel-open')
      }
    }
  }
}
</script>



// WEBPACK FOOTER //
// Authors.vue?4c25862e