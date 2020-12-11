<template>
<main id="app">
	<svg viewBox="0 0 200 50" style="display: none;">
		<symbol id="snake">
			<path fill="#d33fff" 
			stroke="rgba(255, 255, 255, 0.4)" stroke-width="1" stroke-dasharray="500 0" d="m2 2h196v46h-196z"/>
			<path class="button__snake" fill="none" stroke="#ddd444" stroke-width="2" d="m2 2h196v46h-196z"/>
		</symbol>
	</svg>

	<svg class="background" viewBox="0 0 1500 1000">
		<path fill="#bb3234" stroke="#aa3360" stroke-width="1" :d="anchorLineA"/>
		<path fill="#aa4544" stroke="#1ff360" stroke-width="1" :d="anchorLineB"/>
		<path fill="#aa3344" stroke="#8ff360" stroke-width="1" :d="anchorLineC"/>
		<path fill="#11aaff" stroke="#999360" stroke-width="1" :d="anchorLineD"/>
		<path fill="#aa11dd" stroke="#179990" stroke-width="1" :d="floatPoints"/>
		<path class="background__path" fill="#1aa756" stroke="#173360" stroke-width="2" :d="floatPoints"/>
	</svg>


	<a href="#" class="button button--blue">
		<svg class="button__border"><use xlink:href="#snake"></use></svg>
		<span class="button__label">find out more</span>
	</a>
</main>
</template>
<script>
import { TweenLite } from 'gsap'
export default ({

	data() {
		return {
			anchors: {},
			points: {},
			references: {
				anchors: {
					c: [750, 500],
					t: [750, 200],
					r: [1200, 600],
					b: [975, 850],
					l: [300, 500]
				},
				points: {
					a: [100, 400],
					b: [275, 300],
					c: [475, 425],
					d: [250, 50],
					e: [525, 200],
					f: [725, 50],
					g: [950, 150],
					h: [975, 375],
					i: [1025, 175],
					j: [1125, 125],
					k: [1050, 350],
					l: [1150, 400],
					m: [1350, 375],
					n: [1325, 650],
					o: [1450, 625],
					p: [1250, 725],
					q: [900, 775],
					r: [650, 600],
					s: [750, 750],
					t: [525, 925],
					u: [500, 750],
					v: [125, 550],
					w: [50, 625],
					x: [75, 700],
					y: [475, 800]
				}
			}
		};
	},
	computed: {
		anchorLineA() {
			return `M${[this.anchors.c, this.anchors.l]}`;
		},
		anchorLineB() {
			return `M${[this.anchors.c, this.anchors.t]}`;
		},
		anchorLineC() {
			return `M${[this.anchors.c, this.anchors.r, this.points.h]}`;
		},
		anchorLineD() {
			return `M${[this.anchors.c, this.points.q, this.anchors.b]}`;
		},
		floatPoints() {
			return `M${[
				this.anchors.l,
				this.points.a,
				this.points.b,
				this.points.c,
				this.anchors.l,
				this.points.b,
				this.points.d,
				this.points.e,
				this.points.f,
				this.points.g,
				this.anchors.t,
				this.points.e,
				this.points.c,
				this.anchors.t,
				this.points.h,
				this.points.i,
				this.points.g,
				this.points.j,
				this.points.i,
				this.points.k,
				this.points.h,
				this.points.l,
				this.points.k,
				this.points.m,
				this.points.l,
				this.anchors.r,
				this.points.m,
				this.points.n,
				this.points.o,
				this.points.p,
				this.points.n,
				this.anchors.r,
				this.points.p,
				this.anchors.b,
				this.anchors.r,
				this.points.q,
				this.points.r,
				this.points.s,
				this.points.q,
				this.points.t,
				this.points.u,
				this.points.r,
				this.anchors.l,
				this.points.v,
				this.points.w,
				this.anchors.l,
				this.points.u,
				this.points.w,
				this.points.x,
				this.points.u,
				this.points.y,
				this.points.t,
				this.points.r
			]}`;
		}
	},
	beforeMount() {
		this.initPoints();
		setTimeout(() => {
			Object.keys(this.references.anchors).forEach((key, index) => {
				this.initAnimation(key, this.references.anchors[key], index, true);
			});

			Object.keys(this.references.points).forEach((key, index) => {
				this.initAnimation(key, this.references.points[key], index);
			});
		}, 500);
	},
	methods: {
		randomInt(min, max) {
			return ((Math.random() * (max - min + 1)) | 0) + min;
		},
		randomFloat(min, max) {
			return parseFloat((Math.random() * (max - min) + min).toFixed(2));
		},
		initPoints() {
			let anchors = {};
			let points = {};
			Object.keys(this.references.anchors).forEach(
				(anchor) => (anchors[anchor] = this.references.anchors.c)
			);
			Object.keys(this.references.points).forEach(
				(point) => (points[point] = this.references.anchors.c)
			);
			this.anchors = anchors;
			this.points = points;
		},
		initAnimation(key, ref, index, anchor) {
			let duration = this.randomFloat(2, 3);
			let delay = anchor ? index * 0.45 : index * 0.06;
			if (!anchor) {
				this.animatePoint({
					key,
					ref,
					delay,
					duration,
					dest: [ref[0], ref[1]]
				});
			} else {
				TweenLite.to(this.anchors, duration, {
					delay,
					[key]: [ref[0], ref[1]],
					ease: Sine.easeOut
				});
			}
		},
		setAnimation(key, ref) {
			let [x, y] = ref;
			let duration = this.randomFloat(2, 3);
			let xOffset = this.randomInt(x - 25, x + 25);
			let yOffset = this.randomInt(y - 25, y + 25);
			this.animatePoint({
				key,
				ref,
				duration,
				dest: [xOffset, yOffset]
			});
		},
		animatePoint({ key, ref, duration, dest, delay = 0 }) {
			TweenLite.to(this.points, duration, {
				delay,
				[key]: dest,
				ease: Sine.easeInOut,
				onComplete: this.setAnimation,
				onCompleteParams: [key, ref]
			});
		},
		setPoints() {
			this.anchors = this.references.anchors;
			this.points = this.references.points;
		}
	}
});

</script>
<style>
.background {
  width: 80%;
  min-width: 900px;
  height: auto;
  max-height: 95%;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
}

.background__path {
  stroke-dasharray: 20 780;
  stroke:#f05508e1;
  -webkit-animation-name: nodes;
          animation-name: nodes;
  -webkit-animation-duration: 180s;
          animation-duration: 180s;
  animation-easing-function: linear;
  -webkit-animation-iteration-count: infinite;
          animation-iteration-count: infinite;
}

.button {
  position: absolute;
  top: 50%;
  left: 50%;

  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
  display: inline-block;

  width: 200px;
  line-height: 50px;
  vertical-align: middle;
  text-align: center;
  text-transform: uppercase;
  font-weight: 600;
  font-size: .75rem;
  letter-spacing: 1px;
  color: rgba(247, 222, 222, 0.85);
  -webkit-animation-name: snake;
          animation-name: snake;
  -webkit-animation-duration: 45s;
          animation-duration: 45s;
  -webkit-animation-timing-function: linear;
          animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
          animation-iteration-count: infinite;
  -webkit-transition: all 200ms cubic-bezier(0.5, 0.15, 0.25, 0.9);
  transition: all 200ms cubic-bezier(0.5, 0.15, 0.25, 0.9);
  stroke-dasharray: 120 120 48 196;
}
.button--blue {
  background-color: #05830bef;
}
.button__border {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.button__label {
  position: relative;
}
.button:hover {
  color: rgba(245, 141, 4, 0.87);
  stroke-dasharray: 244 0 240 0;
}

@-webkit-keyframes snake {
  0% {
    stroke-dashoffset: -220;
  }
  100% {
    stroke-dashoffset: -704;
  }
}

@keyframes snake {
  0% {
    stroke-dashoffset: -220;
  }
  100% {
    stroke-dashoffset: -704;
  }
}
@-webkit-keyframes nodes {
  0% {
    stroke-dashoffset: 6000;
  }
  100% {
    stroke-dashoffset: -6000;
  }
}
@keyframes nodes {
  0% {
    stroke-dashoffset: 6000;
  }
  100% {
    stroke-dashoffset: -6000;
  }
}

</style>