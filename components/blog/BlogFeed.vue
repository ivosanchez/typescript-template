<template>
  <section class="feed" :class="className">
    <transition name="feature" appear>
      <div v-show="showFeatured" class="feed__featured">
        <post-preview v-if="featuredPost" :post="featuredPost" :featured="true"/>
      </div>
    </transition>

    <post-grid class="feed__grid" :visible="visible" :posts="posts" :column-count="columns"
      @posts-loaded="showFeatured = firstPage && !category"/>

    <nav class="feed__nav">
      <Nuxt-link :to="prevPage || ''" tag="button" class="paging paging--prev" :data-disabled="!prevPage"/>
      <Nuxt-link :to="nextPage || ''" tag="button" class="paging" :data-disabled="!nextPage"/>
    </nav>
  </section>
</template>

<script>
import PostPreview from "./PostPreview";
import PostGrid from "./PostGrid";
// import Api from "src/api";

export default {
  name: 'blog-feed',
  components: { PostGrid, PostPreview },
  props: {
    cat: String,
    paging: String,
    featured: String
  },

  beforeMount() {
    if (this.paging) {
      this.page = parseInt(this.paging)
    }

    if (!this.$parent.showFeed) {
      this.visible = false
    }

    Api.dispatch.fetchPost(this.featured).then(post => {
      this.featuredPost = post
    }).catch(() => {
      this.featuredPost = false
    })
  },

  data() {
    return {
      page: 1,
      pages: 0,
      posts: [],
      visible: true,
      featuredPost: null,
      showFeatured: false
    }
  },

  computed: {
    firstPage() { return this.page === 1 },
    totalPosts() { return this.$store.state.posts.total },
    pagingOffset() { return this.$store.state.posts.offset },
    onlyTablet() { return this.$mq.tablet && !this.$mq.desktop },
    offsetFeatured() { return this.$store.state.posts.offsetFeatured },
    category() { return (this.$parent.useCats) ? this.cat : false },
    columns() { return ((this.firstPage && !this.category) || this.onlyTablet) ? 3 : 5 },
    className() {
      return { 'feed--padded': this.$parent.useCats }
    },
    nextPage() {
      let currentPage = (this.category) ? this.page
        : this.page - 1

      if (currentPage >= this.pages || this.totalPosts <= 6 || this.totalPosts === 7 && this.offsetFeatured) {
        return false
      }

      return (this.category) ? `/blogue/categorie/${this.category}/page/${this.page + 1}`
        : `/blogue/page/${this.page + 1}`
    },
    prevPage() {
      let path

      if (this.firstPage) {
        return false
      }

      path = (this.category) ? `/blogue/categorie/${this.category}`
        : '/blogue'

      return (this.page > 2) ? `${path}/page/${this.page - 1}` : path
    }
  },

  watch: {
    paging(to) {
      let toPage = parseInt(to)
      this.page = toPage || 1
      this.getPosts()
    },
    category() {
      this.getPosts()
    },
    onlyTablet() {
      this.getPosts()
    },
    posts() {
      setTimeout(() => {
        document.body.scrollTop = 0
      }, 400)
    },
    '$parent.showFeed' (isVisible) {
      setTimeout(() => {
        this.visible = isVisible
      }, 400)
    },
    featuredPost() {
      if (!this.pagingOffset) {
        Api.dispatch.fetchPostId(5, this.featuredPost.path).then(({ id, featured }) => {
          this.$store.commit('posts/SET_OFFSET', id)
          this.$store.commit('posts/SET_OFFSET_FEATURED', featured)
          this.getPosts()
        }).catch(() => {
          this.$store.commit('posts/SET_OFFSET', '')
          this.getPosts()
        })
      } else {
        this.getPosts()
      }
    }
  },

  methods: {
    getPosts() {
      if (this.firstPage && !this.category) {
        let params = (!this.featured) ? { pageSize: 6 }
          : { pageSize: 6, filter: this.featured }

        Api.dispatch.fetchPostFeed(params).then(({ posts, pages }) => {
          this.posts = posts
          this.pages = parseInt(pages)
        }).catch(() => {
          console.warn('[api] Could not fetch first feed page')
          this.posts = false
          this.pages = 1
        })
      } else {
        let delay = (this.onlyTablet) ? 75 : 125
        let pageSize = (this.onlyTablet) ? 9 : 10
        let params = (this.category) ? { page: this.page, category: this.category }
          : { page: this.page - 1 }

        Api.dispatch.fetchPostFeed({ pageSize, ...params }).then(({ posts, pages }) => {
          this.posts = posts
          this.pages = parseInt(pages)

          setTimeout(() => {
            this.showFeatured = false
          }, delay)
        }).catch(() => {
          this.posts = false
          this.pages = this.page
        })
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/sass/tools', '@/sass/tools/mediaqueries';

.feature {
  &-enter-active,
  &-leave-active {
    transition: opacity 300ms cb(io), transform 250ms cb(io);
  }

  &-enter,
  &-leave-to {
    transform: translate3d(0,-5vh,0);
    opacity: 0;
  }

  &-enter-to,
  &-leave {
    transform: translate3d(0,0,0);
    opacity: 1;
  }
}

@media (--tablet) {
  .feature {
    &-enter-active,
    &-leave-active {
      transition: all 400ms cb(io);
    }

    &-enter,
    &-leave-to {
      transform: translate3d(0,-2.5%,0);
      opacity: 0;
    }

    &-enter-to,
    &-leave {
      transform: translate3d(0,0,0);
      opacity: 1;
    }
  }
}
</style>



// WEBPACK FOOTER //
// BlogFeed.vue?40b01dfe
