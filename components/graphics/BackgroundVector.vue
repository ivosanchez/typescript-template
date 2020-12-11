<template>
  <svg @mousemove="setOffset" class="vector" :class="classes" ref="svg" :viewBox="setViewbox()">
    <g fill="#0f2f59" stroke="none" :opacity="alpha ? alpha : 0.5" :transform="transforms">
      <path :opacity="opacity.a" :d="pathA"/>
      <path :opacity="opacity.b" :d="pathB"/>
      <path :opacity="opacity.c" :d="pathC"/>
      <path :opacity="opacity.d" :d="pathD"/>
      <path :opacity="opacity.e" :d="pathE"/>
      <path :opacity="opacity.f" :d="pathF"/>
      <path :opacity="opacity.g" :d="pathG"/>
      <path :opacity="opacity.h" :d="pathH"/>
      <path :opacity="opacity.i" :d="pathI"/>
      <path :opacity="opacity.j" :d="pathJ"/>
      <path :opacity="opacity.k" :d="pathK"/>
      <path :opacity="opacity.l" :d="pathL"/>
    </g>

    <transition name="vector-images">
      <g v-if="!hideImages && !mobileImages">
        <image v-for="image in images" class="vector__image" width="200" height="62" x="-100" y="-31"
          :opacity="opacity.image" :transform="`translate(${points[image.key]})`" :xlink:href="image.url"
          @click="routeImage(image.path)"/>
      </g>
    </transition>
  </svg>
</template>

<script>
import TweenLite from 'gsap/TweenLite'
import Sine from 'gsap/EasePack'

export default {
  name: 'background-vector',
  props: {
    alpha: Number,
    scale: Number,
    rotate: Number,
    viewbox: Object,
    animated: Boolean,
    hideImages: Boolean,
    images: {
      type: Array,
      default: () => []
    }
  },

  mounted() {
    if (!this.animated) this.setPoints()
    else if (this.$store.state.vector.initialized) this.resumeAnimation()
    else setTimeout(this.initAnimation, 450)
  },

  data() {
    return {
      anchor: [500, 950],
      offset: { x: 0, y: 0 },
      opacity: { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0, h: 0, i: 0, j: 0, k: 0, l: 0, image: 0 },
      points: { a: [500, 950], b: [500, 950], c: [500, 950], d: [500, 950], e: [500, 950], f: [500, 950], g: [500, 950], h: [500, 950], i: [500, 950], j: [500, 950], k: [500, 950], l: [500, 950] },
      references: {
        opacity: { a: 0.3, b: 0.2, c: 0.1, d: 0.1, e: 0.2, f: 0.15, g: 0.3, h: 0.2, i: 0.25, j: 0.15, k: 0.1, l: 0.3, image: 1 },
        points: { a: [150, 860], b: [180, 450], c: [390, 480], d: [240, 350], e: [550, 350], f: [400, 270], g: [1180, 600], h: [1030, 810], i: [775, 225], j: [650, 200], k: [1090, 50], l: [1350, 480] },
        viewbox: [-125, -125, 1750, 1250]
      }
    }
  },

  computed: {
    pathA() { return `M${[this.anchor, this.points.a, this.points.b]}z` },
    pathB() { return `M${[this.anchor, this.points.b, this.points.c]}z` },
    pathC() { return `M${[this.points.b, this.points.c, this.points.d]}z` },
    pathD() { return `M${[this.anchor, this.points.c, this.points.e]}z` },
    pathE() { return `M${[this.points.c, this.points.e, this.points.f]}z` },
    pathF() { return `M${[this.anchor, this.points.e, this.points.g]}z` },
    pathG() { return `M${[this.anchor, this.points.g, this.points.h]}z` },
    pathH() { return `M${[this.points.e, this.points.g, this.points.i]}z` },
    pathI() { return `M${[this.points.e, this.points.i, this.points.j]}z` },
    pathJ() { return `M${[this.points.e, this.points.j, this.points.f]}z` },
    pathK() { return `M${[this.points.i, this.points.g, this.points.k]}z` },
    pathL() { return `M${[this.points.g, this.points.k, this.points.l]}z` },
    mobileImages() { return this.$mq.phone },
    rebase() {
      return {
        cX: window.innerWidth * 0.5,
        cY: window.innerHeight * 0.5
      }
    },
    classes() {
      return {
        'vector--static': !this.animated
      }
    },
    transforms() {
      return [
        (this.rotate) ? `rotate(${this.rotate} 750 500)` : '',
        (this.scale) ? `scale(${this.scale})` : ''
      ].join(' ')
    }
  },

  methods: {
    routeImage(path) {
      this.$router.push(`/ecosysteme/${path}`)
    },
    setViewbox() {
      if (!this.viewbox) {
        return this.references.viewbox
      } else {
        let vbox = this.viewbox
        let [offX, offY, sizeX, sizeY] = this.references.viewbox
        return [
          vbox.offsetX || offX,
          vbox.offsetY || offY,
          vbox.sizeX || sizeX,
          vbox.sizeY || sizeY
        ]
      }
    },
    setPoints() {
      this.opacity = this.references.opacity
      this.points = this.references.points
      this.$emit('vector-ready')
    },
    resumeAnimation() {
      this.setPoints()

      Object.keys(this.points).forEach(key => {
        this.setAnimation(key, this.references.points[key])
      })
    },
    initAnimation() {
      let delay = 0
      let keys = Object.keys(this.points)
      this.$store.commit('vector/INITIALIZE')

      while (keys.length) {
        let ref = this.references.points[keys[0]]
        let refs = {}

        keys.forEach(key => {
          refs[key] = ref
        })

        let key = keys.shift()
        TweenLite.to(this.points, 0.8, {
          ease: Sine.easeOut,
          delay: delay * 0.2,
          ...refs
        })

        TweenLite.to(this.opacity, 1, {
          ease: Sine.easeOut,
          delay: delay * 0.2,
          [key]: this.references.opacity[key],
          onComplete: this.setAnimation,
          onCompleteParams: [key, ref]
        })

        delay++
      }

      setTimeout(() => {
        this.$emit('vector-ready')

        TweenLite.to(this.opacity, 0.8, {
          ease: Sine.easeOut,
          delay: 0.5,
          image: 1
        })
      }, delay * 200 + 300)
    },
    setAnimation(key, ref) {
      let {duration, dest} = this.generateRandom(ref)
      this.animatePoint({ key, ref, dest, duration })
    },
    animatePoint({key, ref, duration, dest, delay = 0}) {
      TweenLite.to(this.points, duration, {
        delay,
        [key]: dest,
        ease: Sine.easeOut,
        onComplete: this.setAnimation,
        onCompleteParams: [key, ref]
      })
    },
    generateRandom([x, y]) {
      let [minX, minY] = [x - 25, y - 25]
      return {
        duration: parseFloat((Math.random() + 2).toFixed(2)),
        dest: [
          (Math.random() * (x + 25 - minX + 1) | 0) + minX + this.offset.x,
          (Math.random() * (y + 25 - minY + 1) | 0) + minY + this.offset.y
        ]
      }
    },
    setOffset(e) {
      if (this.animated) {
        let {cX, cY} = this.rebase
        this.offset.x = (e.pageX - cX) / cX * 40 | 0
        this.offset.y = (e.pageY - cY) / cY * 40 | 0
      }
    },
    mapToScreen([refX, refY]) {
      let ref = this.$refs.svg.createSVGPoint()
      ref.x = refX
      ref.y = refY
      let { x, y } = ref.matrixTransform(this.$refs.svg.getScreenCTM())
      return [x | 0, y | 0]
    }
  }
}
</script>

<style lang="scss">
@import '@/sass/tools';

.vector-images {
  &-enter-active {
    transition: opacity 300ms cb() 250ms;
  }

  &-leave-active {
    transition: opacity 350ms cb() 75ms;
  }

  &-enter,
  &-leave-to {
    opacity: 0;
  }

  &-enter-to,
  &-leave {
    opacity: 1;
  }
}
</style>



// WEBPACK FOOTER //
// BackgroundVector.vue?7de2c995
