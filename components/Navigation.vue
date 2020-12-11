<template>
  <nav>
      <ul>
      <li><h2>{{ $mq }}</h2></li>

        <li
          v-for="page in ['contact', 'letters', 'noticias', 'talleres', 'gallery', 'ecosystem' ]"
          :key="page"
        >
          <nuxt-link :to="`/${page.toLowerCase().split(' ').join('-')}`">
           {{ page }}
          </nuxt-link>
        </li>
      </ul>

      <!-- <li class="dyn"
        v-for="page in item.pages"
        >
        <Nuxt-link :to="item.path">{{ item.name }}</Nuxt-link>
      </li> -->
  
  </nav>
</template>

<script>
// import conf from '../conf';

export default {
  // data() {
  //   return {content: null};
  // },
  // async fetch() {
  //   this.content = await this.$content(conf.CONTENT).fetch();
  // },
}
</script>
<style scoped>

  h2 {
    background: blue ;
    font-size: 22pt;
  }

  nav, ul {
    display:flex;
    flex-direction: row ;
    flex-wrap:wrap;
    background:rgba(136, 1, 68, 0.301);
    padding:0;
    margin: 0;
    z-index:100;
    list-style-image: none;
    font-size: 1rem;
    font-weight:500;
    margin-right: 1rem;
    color: rgba(15, 3, 82, 0.87);
    position:absolute;
    top:0;right:0;
  }
  .dyn {
    outline: 2px solid green;
    background:rgba(250, 6, 230, 0.932);
  }
  </style>
