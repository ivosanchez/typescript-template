<template>
  <div class="suggested">
    <h5 class="suggested__title">{{ title }}</h5>

    <ul v-if="posts" class="suggested__list">
      <li v-for="post in posts" class="suggested__post">
        <Nuxt-link :to="post.path">{{ clipText(post.title, 60) }}</Nuxt-link>
        <time class="suggested__published"><icon :id="'clock'"/>Il y a {{ getElapsedTime({ date: post.published, lang: 'fr' }) }}</time>
      </li>
    </ul>
  </div>
</template>

<script>
import {getElapsedTime} from "@/utils/time";
import {clipText} from "@/utils/text";
// import Api from "src/api";

export default {
  name: 'suggested-posts',
  props: {
    post: Object,
    title: String,
    count: Number,
    minimum: {
      type: Number,
      default: 2
    }
  },

  mounted() {
    this.updating = true
    this.getSimilarPosts(this.post.path)
  },

  data() {
    return {
      posts: null,
      precision: 3,
      updating: false
    }
  },

  computed: {
    postId() { return this.post.id }
  },

  watch: {
    postId() {
      if (!this.updating) {
        this.updating = true
        this.getSimilarPosts(this.post.path)
      }
    }
  },

  methods: {
    getElapsedTime,
    clipText,
    getSimilarPosts(path) {
      let iterations = 0
      this.posts = []

      Api.dispatch.fetchSimilarPosts(this.postId, this.precision, this.minimum).then(posts => {
        posts.forEach(uid => {
          Api.dispatch.fetchPost(uid).then(post => {
            this.posts.push(post)
            this.updating = false
          })
        })
      }).catch(posts => {
        if (iterations < 6) {
          this.precision = Math.ceil(this.precision * 1.3)
          this.getSimilarPosts()
        } else {
          posts.forEach(uid => {
            Api.dispatch.fetchPost(uid).then(post => {
              this.posts.push(post)
              this.updating = false
            })
          })
        }
      })
    }
  }
}
</script>



// WEBPACK FOOTER //
// SuggestedPosts.vue?7aaa25d9<template>
  <div class="suggested">
    <h5 class="suggested__title">{{ title }}</h5>

    <ul v-if="posts" class="suggested__list">
      <li v-for="post in posts" class="suggested__post">
        <Nuxt-link :to="post.path">{{ clipText(post.title, 60) }}</Nuxt-link>
        <time class="suggested__published"><icon :id="'clock'"/>Il y a {{ getElapsedTime({ date: post.published, lang: 'fr' }) }}</time>
      </li>
    </ul>
  </div>
</template>

<script>
import { getElapsedTime } from '@/utils/time'
import { clipText } from '@/utils/text'
// import Api from 'src/api'

export default {
  name: 'suggested-posts',
  props: {
    post: Object,
    title: String,
    count: Number,
    minimum: {
      type: Number,
      default: 2
    }
  },

  mounted() {
    this.updating = true
    this.getSimilarPosts(this.post.path)
  },

  data() {
    return {
      posts: null,
      precision: 3,
      updating: false
    }
  },

  computed: {
    postId() { return this.post.id }
  },

  watch: {
    postId() {
      if (!this.updating) {
        this.updating = true
        this.getSimilarPosts(this.post.path)
      }
    }
  },

  methods: {
    getElapsedTime,
    clipText,
    getSimilarPosts(path) {
      let iterations = 0
      this.posts = []

      Api.dispatch.fetchSimilarPosts(this.postId, this.precision, this.minimum).then(posts => {
        posts.forEach(uid => {
          Api.dispatch.fetchPost(uid).then(post => {
            this.posts.push(post)
            this.updating = false
          })
        })
      }).catch(posts => {
        if (iterations < 6) {
          this.precision = Math.ceil(this.precision * 1.3)
          this.getSimilarPosts()
        } else {
          posts.forEach(uid => {
            Api.dispatch.fetchPost(uid).then(post => {
              this.posts.push(post)
              this.updating = false
            })
          })
        }
      })
    }
  }
}
</script>
