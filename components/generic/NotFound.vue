<template>
  <main class="not-found">
    <div>
      <h2 class="not-found__title">404</h2>
      <p>La page que vous cherchez n'existe pas.</p>
      <router-link class="not-found__link" to="/">Page d'accueil</router-link>
    </div>

    <header-nav/>
    <footer-nav/>
  </main>
</template>

<script>
export default {
  name: 'not-found'
}
</script>



// WEBPACK FOOTER //
// NotFound.vue?21832b6d