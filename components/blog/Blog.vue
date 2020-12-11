<template>
  <main class="blog">
    <div class="background">
      <background-vector :alpha="0.15" :scale="background.scale" :viewbox="background.viewbox" :rotate="-40" class="blog__vector"/>
      <h3 class="background__banner blog__banner">{{ store.name }}</h3>
    </div>

    <blog-filters v-if="useCats"/>

    <div class="blog__content" :class="classes" ref="feed">
      <transition name="feed">
        <router-view v-show="showFeed" :featured="content.featured"/>
      </transition>

      <transition name="post">
        <router-view name="post" :use-history="useHistory" @toggle-post="showFeed = !showFeed"/>
      </transition>
    </div>

    <header-nav modifier="blog"/>
    <footer-nav :sidebars="sidebars"/>
  </main>
</template>

<script>
import BlogFilters from "./BlogFilters";
// import metaData from "../../mixins/meta-data";

export default {
  name: 'blog',
  components: { BlogFilters },
  // mixins: [metaData],

  beforeMount() {
    this.useHistory = this.$route.name === 'blog'
  },

  data() {
    return {
      banner: "a banner",
      showFeed: true,
      sidebars: {
        left: { to: '/ecosysteme', modifier: 'primary' }
      }
    }
  },

  computed: {
    useCats() { return this.content.filters },
    content() { return this.$store.state.content.blog },
    classes() { return { 'blog__content--filters': this.content.filters } },
    mobile() { return this.$mq.mobile },
    background() {
      return {
        viewbox: {
          offsetX: (this.mobile) ? 300 : -700,
          offsetY: (this.mobile) ? 75 : -200
        },
        scale: (this.mobile) ? 2 : null
      }
    }
  },

  watch: {
    showFeed(show) {
      if (show) {
        this.updateMeta()
      } else {
        setTimeout(() => {
          document.body.scrollTop = 0
        }, 350)
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/sass/tools';

.feed {
  &-enter-active {
    transition: transform 350ms cb(io) 325ms, opacity 400ms cb(io) 325ms;
  }

  &-leave-active {
    transition: transform 400ms cb(io), opacity 350ms cb(io);
  }

  &-enter {
    transform: translate3d(0,-5vh,0);
    opacity: 0;
  }

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

.post {
  &-enter-active {
    transition: transform 350ms cb(io) 325ms;

    > * {
      transition: opacity 400ms cb(io) 325ms;
    }
  }

  &-leave-active {
    transition: transform 400ms cb(io);

    > * {
      transition: opacity 350ms cb(io);
    }
  }

  &-enter {
    transform: translate3d(0,5vh,0);

    > * {
      opacity: 0;
    }
  }

  &-leave-to {
    transform: translate3d(0,5vh,0);

    > * {
      opacity: 0;
    }
  }

  &-enter-to,
  &-leave {
    transform: translate3d(0,0,0);

    > * {
      opacity: 1;
    }
  }
}
</style>



// WEBPACK FOOTER //
// Blog.vue?4cb2818d
