<template>
  <main class="home" :data-toggle="toggle">

    <div class="background">
      <background-vector :alpha="0.25" :scale="backgroundScale" :viewbox="{ offsetX, offsetY }" class="home__vector"/>
      <h3 class="background__banner home__banner toggle-content">{{ name }}</h3>
    </div>

    <section class="home__content home__desc toggle-content">
      <h1 class="home__title">Un écosystème</h1>
      <h2 class="home__subtitle">C’est l’histoire de valeurs d’entreprise qui deviennent plus grandes que l’entreprise elle-même</h2>

      <div class="rte">
        D’entrepreneuriat qui s’impose comme style de vie. De startups prometteuses qui ont un impact sur le monde. D’innovation qui émerge grâce aux meilleures pratiques du numérique. De l’envie de miser sur la croissance durable et la passion humaine. De changement et d’adaptabilité comme moteur de créativité. D’un besoin de se rassembler pour aller plus loin.

        SPK, c’est un écosystème bouillonnant d’organisations et d’initiatives qui redéfinissent le concept de profitabilité. Découvrez les spécimens qui le composent.
      </div>

          <!-- v-for="{url, image} in images"
          v-bind:key="image" -->

      <div class="home__logos">
            <!-- :url="url" -->
        <safe-link
          class="home__link">
            <div v-html="rawNuxtLogo" />
          <!--
            <img class="home__link--logo" :src="image.url" :alt="image.alt"/> -->
        </safe-link>
      </div>

      <!-- <button-link
      type="fill" :to="path" class="home__cta">label</button-link> -->
    </section>

    <h3
    v-if="$mq.mobile"
    class="home__banner--mobile toggle-content"> a banner </h3>

    <post-grid
      v-if="ready"
      :posts="posts"
      :forceColumns="!$mq.mobile"
      :link="{ to: '/blog', label: bloglabel }"
      class="home__content grid--home toggle-content"/>

    <div
      v-else class="home__content toggle-content"></div>

    <button-link
      v-if="$mq.phone" to="/blog"
      type="border"
      class="grid__link 
      toggle-content">bloglabel</button-link> 






    <transition name="up">
      <router-view class="home__panel"/>
    </transition>

    <header-nav/>

    <footer-nav :sidebars="sidebars"
      class="toggle-content"/>

    <button v-if="!$mq.mobile"
      class="home__back"
      @click="navBack"> anterior <icon :id="'return'"/>
    </button>

  </main>
</template>

<script>
import { PostGrid } from '@/components/blog/PostGrid'
import rawNuxtLogo from "~/assets/sprite/svg/acast.svg";

// import metaData from '../../mixins/meta-data'
// import Api from 'src/api'

export default {
  name: 'home-view',
  components: { PostGrid, rawNuxtLogo },
  // mixins: [metaData],

  // beforeMount() {
  //   if (this.toggleContent) this.toggle = true

  //   Api.dispatch.fetchPostCollection(this.content.featured.map(({ post }) => post))
  //     .then(({ posts }) => {
  //       this.posts = posts
  //       this.ready = true
  //     })
  // },

  data() {
    return {
      moves: 1,
      posts: [],
      ready: false,
      toggle: false,
      sidebars: {
        right: { to: '/ecosystem', modifier: 'primary' }
      }
    }
  },

  computed: {
    toggleContent() { return this.$route.name !== 'home' },
    content() { return this.$store.state.content.home },
    offsetX() { return (this.$mq.mobile) ? null : -650 },
    offsetY() { return (this.$mq.mobile) ? 200 : null },
    backgroundScale() { return (this.$mq.mobile) ? 2 : null }
  },

  watch: {
    '$route' (to, from) {
      if (to.name !== 'home' && from.name !== 'home') {
        this.moves++
      } else {
        this.moves = 1
      }
    },
    toggleContent(to) {
      if (to) {
        this.toggle = true
        document.body.scrollTop = 0
      } else {
        setTimeout(() => {
          this.toggle = false
          document.body.scrollTop = 0
        }, 400)
      }
    }
  },

  methods: {
    navBack() {
      if (this.$store.state.moves) {
        this.$router.go(-this.moves)
      } else {
        this.$router.push('/')
      }
    }
  }
}
</script>

<style lang="scss" scoped >
@import '@/sass/tools', '@/sass/tools/mediaqueries';
*{
  outline: 2px dashed red;
}
[data-toggle='true'] {
  @media (--desktop) {
    height: 100vh;
  }
}

.toggle-content {
  transition: transform 400ms cb(io) 200ms, opacity 400ms cb(io) 200ms;
  transform: translateY(0);

  [data-toggle='true'] & {
    transition: transform 400ms cb(io), opacity 400ms cb(io);
    transform: translateY(-2.5vh);
    opacity: 0;
    pointer-events: none;

    @media (--mobile) {
      transition: none;
      height: 0;
      margin: 0;
    }
  }
}

.up {
  &-enter-active {
    transition: all 500ms cb(io) 350ms;
  }

  &-leave-active {
    transition: all 450ms cb(io);
  }

  &-enter,
  &-leave-to {
    transform: translateY(20%);
    opacity: 0;
  }

  &-enter-to,
  &-leave {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>

