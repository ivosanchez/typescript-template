<template>
  <section v-if="posts" class="grid" :class="classes">
    <template v-if="renderColumns">
      <div
      v-for="(column, index) in columns" 
      v-bind:key="column"
      class="grid__column" :style="getDelay(index)">
        <post-preview v-for="post in column" :key="post" :post="post" :params="params" class="grid__item"/>

        <!-- <button-link v-if="!~(index - columns.length) && link" :to="link.to" type="border" class="grid__link">
          {{ link.label }}
        </button-link> -->
      </div>
    </template>

    <template v-else>
      <post-preview v-for="(post, index) in posts" :key="post" :post="post" :params="params" class="grid__item" :style="getDelay(index)"/>
    </template>
  </section>
</template>

<script>
import PostPreview from "@/components/blog/PostPreview";

export default {
  name: 'post-grid',
  components: { PostPreview },
  props: {
    modifier: String,
    visible: Boolean,
    posts: [Array, Boolean],
    link: Object,
    forceColumns: Boolean,
    columnCount: {
      type: Number,
      default: 2
    }
  },

  mounted() {
    if (this.posts) {
      this.updatePosts(this.columnCount - 1)
    }
  },

  data() {
    return {
      columns: [],
      updating: false
    }
  },

  computed: {
    params() {
      return {
        paging: this.$parent.paging,
        category: this.$parent.category
      }
    },
    classes() {
      return {
        [`grid--${this.modifier}`]: this.modifier,
        'loading': this.updating,
        'grid--forced': this.forceColumns
      }
    },
    renderColumns() {
      return this.$mq.tablet || this.forceColumns
    }
  },

  watch: {
    posts(newPosts, oldPosts) {
      if (this.posts) {
        // take into account previous posts count for delay
        this.updatePosts(Math.ceil(oldPosts.length / 2 - 1))
      }
    }
  },

  methods: {
    updatePosts(delay) {
      this.updating = true
      if (this.visible) setTimeout(this.setColumns, delay * 100 + 400)
      else this.setColumns()
    },
    setColumns() {
      let next = 0

      if (this.posts) {
        this.columns = [...Array(this.columnCount).keys()].map(() => Array(0))

        this.posts.forEach(post => {
          this.columns[next].push(post)
          next = ~(next - this.columnCount) ? next + 1 : 0
        })

        this.$emit('posts-loaded')

        setTimeout(() => {
          this.updating = false
        }, 100)
      }
    },
    getDelay(index) {
      return `transition-delay: ${index * 100}ms;`
    }
  }
}
</script>

<style lang="scss">
@import '@/sass/tools';

// @import "../node_modules/sass-tools/all.scss";


.grid {
  &__column {
    transition: transform 400ms cb(io);
    transform: translate3d(0,0,0);

    .preview {
      transition: opacity 350ms cb(io);
      transition-delay: inherit;
      opacity: 1;
    }

    .loading & {
      transform: translate3d(0,2.5%,0);

      .preview {
        opacity: 0;
      }

      &:nth-of-type(even) {
        transform: translate3d(0,-2.5%,0);
      }
    }
  }
}
</style>



// WEBPACK FOOTER //
// PostGrid.vue?4c30cdc5
