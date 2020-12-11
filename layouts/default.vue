/* eslint-disable no-tabs */
<template>
  <div>
    <navigation />
    <div id="app" class="viewport">
      <svg-symbols name="apple" />
      <svg-symbols name="facebook" />

      <transition :name="transition">
        <!-- v-if="ready" -->
        <div
          :key="viewIndex"
          style="outline: 2.5px dashed purple"
          class="view"
        >
          <router-view class="view__content slide--inner" />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { SvgSymbols } from '@/components/graphics/SvgSymbols'

export default {

  components: { SvgSymbols },

  data () {
    return {
      transition: 'slide--right',
      viewIndex: 0
    }
  },

  beforeMount () {
    this.$store.dispatch('onLoad')
    this.viewIndex = this.$route.meta.index
  },

  computed: mapState({
    ready: state => state.content.ready,
    title: state => state.content.title
  }),

  watch: {
    ready () {
      const {
        ogimage,
        ogtitle: title,
        ogsitename: siteName,
        ogdescription: description
      } = this.$store.state.content.meta
      this.$meta.defaults = {
        title, siteName, description, image: ogimage.crops.facebook
      }
    },

    '$route' (to, from) {
      const toIndex = to.meta.index
      const fromIndex = from.meta.index

      if (toIndex !== fromIndex) {
        this.transition = toIndex > fromIndex ? 'slide--left' : 'slide--right'
        this.viewIndex = toIndex
      }

      if (from) {
        this.$store.commit('moves/INCREMENT')
      }
    },

    title () {
      document.title = this.title
    }
  }
}
</script>

<style lang="scss">
	@import '@/sass/app';

	.slide {

		&--left-enter-active,
		&--right-enter-active,
		&--left-leave-active,
		&--right-leave-active {

			.slide--inner,
			.header,
			.footer,
			& {
				transition: transform 525ms cb(io);
			}
		}

		&--left-enter {
			transform: translateX(100%);

			.slide--inner {
				transform: translateX(-90%);
			}

			.header,
			.footer {
				transform: translateX(-10%);
			}
		}

		&--right-enter {
			transform: translateX(-100%);

			.slide--inner {
				transform: translateX(90%);
			}

			.header,
			.footer {
				transform: translateX(10%);
			}
		}

		&--left-enter-to,
		&--right-enter-to,
		&--left-leave,
		&--right-leave {

			.slide--inner,
			.header,
			.footer,
			& {
				transform: translateX(0);
			}
		}

		&--left-leave-to {
			transform: translateX(-10%);

			.header,
			.footer {
				transform: translateX(10%);
			}
		}

		&--right-leave-to {
			transform: translateX(10%);

			.header,
			.footer {
				transform: translateX(-10%);
			}
		}
	}
</style>
