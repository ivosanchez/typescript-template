<template>
  <section v-if="post" class="post">
    <post-list :prevent-nav="!showPost" class="post__list"/>

    <div class="post__scrollbox">

      <transition name="swap">
        <article v-show="showPost" class="post__content" ref="post">
          <h1 class="post__title">{{ title }}</h1>
          <time class="post__published">{{ published }}</time>

          <figure class="post__feature">
            <img v-if="post.image" :src="post.image.url" :alt="post.image.alt" class="post__image"/>

            <Nuxt-link :to="`/blogue/categorie/${post.category}`">
              <icon :id="post.category" class="post__category" :class="`post__category--${post.category}`"/>
            </Nuxt-link>
          </figure>

          <div class="post__body rte">
            <component v-for="item in post.text" :key="item" :is="item.component" :item="item"/>
          </div>

          <footer>
            <div v-if="author" class="post__footer author author--post">
              <img :src="author.photo.url" :alt="author.photo.alt" class="author__photo"/>

              <div>
                <h4 class="author__name">{{ author.name }}</h4>
                <h5>{{ author.title }}</h5>
              </div>
            </div>

            <newsletter-form class="post__footer" :content="{ title: blog.newsletter, submit: blog.submit, placeholder: 'Courriel' }"/>
            <suggested-posts class="post__footer" :post="post" :count="3" :title="blog.suggested"/>
            <div class="disqus">
              <vue-disqus v-if="showComments" shortname="spk-blog" :key="uid" :identifier="uid" :url="`https://www.spk.rocks/blogue/${uid}`"/>
            </div>
          </footer>
        </article>
      </transition>

    </div>

    <button class="post__back" :class="backClass" @click="navBack"></button>
  </section>
</template>

<script>
import {NewsletterForm} from "../generic/NewsletterForm";

import SuggestedPosts from "./SuggestedPosts";
// import VueDisqus from 'vue-disqus/VueDisqus'
import {getDateTime} from "@/utils/time.js";
// import VueDisqus from 'vue-disqus/VueDisqus'
import PostList from "./PostList";
// import Api from "src/api";

export default {
  name: 'blog-post',
  components: { PostList, NewsletterForm, SuggestedPosts,
  // VueDisqus

  },
  props: {
    uid: String,
    useHistory: Boolean
  },

  beforeMount() {
    this.getPost().then(() => {
      this.$emit('toggle-post')
      this.loadComments()

      if (!this.author) {
        this.$store.dispatch('fetchAuthors')
      }
    })
  },

  beforeDestroy() {
    this.$emit('toggle-post')
  },

  data() {
    return {
      moves: 1,
      post: null,
      showPost: true,
      showComments: false
    }
  },

  computed: {
    blog() { return this.$store.state.content.blog },
    author() { return this.$store.state.authors[this.post.author] },
    published() { return getDateTime({ date: this.post.published, template: '$d $M $Y', lang: 'fr' }) },
    backClass() { return { 'post__back--offset': !this.$parent.content.filters } },
    title() {
      if (!this.post) return null
      return (this.post.fulltitle) ? this.post.fulltitle[0].content : this.post.title
    },
    metaData() {
      return {
        title: `${this.$parent.content.metatitle} - ${this.post.metatitle || this.post.title}`,
        description: this.post.metadesc,
        openGraph: {
          image: this.post.image.crops.facebook
        }
      }
    }
  },

  watch: {
    uid() {
      this.showPost = false
      this.showComments = false
      setTimeout(() => {
        this.getPost().then(() => {
          document.body.scrollTop = 0
          this.$refs.post.scrollTop = 0
          setTimeout(() => {
            this.moves++
            this.loadComments()
            this.showPost = true
          }, 100)
        })
      }, 400)
    }
  },

  methods: {
    getPost() {
      return Api.dispatch.fetchPost(this.uid).then(post => {
        this.post = post
        this.updateMeta()

        return Promise.resolve()
      })
      .catch(() => {
        this.$router.replace('/404')
      })
    },
    navBack() {
      if (this.useHistory) {
        this.$router.go(-this.moves)
      } else {
        this.$router.push('/blogue')
      }
    },
    loadComments() {
      setTimeout(() => {
        this.showComments = true
      }, 500)
    },
    updateMeta() {
      this.$meta.tags = this.metaData
    }
  }
}
</script>

<style lang="scss">
@import '@/sass/tools';
//@import "../node_modules/sass-tools/all.scss";

.swap {
  &-enter-active {
    transition: all 450ms cb(io);

    .post__feature {
      transition: transform 500ms cb(io);
    }
  }

  &-leave-active {
    transition: transform 450ms cb(io), opacity 375ms cb(io);

    .post__feature {
      transition: transform 400ms cb(io);
    }
  }

  &-enter,
  &-leave-to {
    transform: translateX(10%);
    opacity: 0;

    .post__feature {
      transform: translateX(0);
    }
  }

  &-enter-to,
  &-leave {
    transform: translateX(0);
  }
}
</style>



// WEBPACK FOOTER //
// BlogPost.vue?2bff42b2
