<template>
  <aside class="list" :class="classes">
    <ul class="list__group">
      <li v-if="posts" v-for="post in posts" class="list__item">
        <Nuxt-link :to="`/blogue/${post.path}`" class="list__post">
          <div class="list__content">
            <h5 class="list__title">{{ post.title || ((post.fulltitle) ? post.fulltitle[0].content : ' ') }}</h5>
          </div>

          <Nuxt-link :to="`/blogue/categorie/${post.category}`">
            <icon :id="post.category" class="list__icon" :class="`list__icon--${post.category}`"/>
          </Nuxt-link>
        </Nuxt-link>
      </li>
    </ul>

    <nav class="list__nav">
      <button class="paging paging--prev" :data-disabled="!prevPage" @click="page--"></button>
      <button class="paging" :data-disabled="!nextPage" @click="page++"></button>
    </nav>
  </aside>
</template>

<script>
import {getElapsedTime} from "@/utils/time";
// import Api from "../../../api";

export default {
  name: 'post-list',
  props: { preventNav: Boolean },

  mounted() {
    this.page = 1
  },

  data() {
    return {
      page: null,
      posts: null,
      pages: null,
      update: {
        active: false,
        swap: false,
        class: null,
        post: false
      }
    }
  },

  computed: {
    nextPage() { return this.page < this.pages },
    prevPage() { return this.page > 1 },
    classes() {
      return {
        'list-swap': this.update.swap,
        'update-active': this.update.active,
        [`update-${this.update.class}`]: this.update.active,
        'no-click': this.preventNav
      }
    }
  },

  watch: {
    page(to, from) {
      let delay = (from) ? 450
        : 250

      let [oldClass, newClass] = (to > from) ? ['left', 'right']
        : ['right', 'left']

      this.update.active = true
      this.update.class = oldClass

      setTimeout(() => {
        this.update.swap = true
        this.update.class = newClass

        Api.dispatch.fetchPostFeed({ page: this.page, pageSize: 6 }).then(({ posts, pages }) => {
          this.posts = posts
          this.pages = pages
          this.update.swap = false

          setTimeout(() => {
            this.update.active = false
          }, 25)
        })
        .catch(() => {
          this.posts = false
          this.pages = 1
        })
      }, delay)
    }
  },

  methods: {
    getElapsedTime
  }
}
</script>

<style lang="scss">
@import '@/sass/tools';
// @import "../node_modules/sass-tools/all.scss";

.list__item {
  transition: transform 200ms cb(io), opacity 200ms cb(io);
  transform: translateX(0);
  opacity: 1;

  @for $i from 2 through 6 {
    &:nth-of-type(#{$i}) {
      transition-delay: #{($i - 1) * 50}ms;
    }
  }

  .update-active & {
    opacity: 0;
  }

  .update-left & {
    transform: translateX(-5%);
  }

  .update-right & {
    transform: translateX(5%);
  }

  .list-swap & {
    transition: none;
    transition-delay: .3s;
  }
}
</style>
