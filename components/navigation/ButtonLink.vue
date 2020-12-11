<template>
  <Nuxt-link :to="to" :class="`button button--${type}`">
		<svg v-if="type === 'border'" class="button__border"><use xlink:href="#button-border"/></svg>

    <span v-else class="button__bg">
      <svg class="button__fold button__fold--c">
        <use xlink:href="#button-fold-c"/>
      </svg>
  		<svg class="button__fold button__fold--b">
        <use xlink:href="#button-fold-b"/>
      </svg>
  		<svg class="button__fold button__fold--a">
        <use xlink:href="#button-fold-a"/>
      </svg>
    </span>

    <span class="button__label"><slot/></span>
	</Nuxt-link>
</template>

<script>
export default {
  name: 'button-link',
  props: {
    to: String,
    type: String
  }
}
</script>
