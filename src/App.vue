<template>
  <div id="app">
    <Header />
    <article class="contents">
      <Aside />
      <router-view />
    </article>
    <Footer />
  </div>
</template>

<script>
import Header from '@/views/Layout/Header.vue';
import Footer from '@/views/Layout/Footer.vue';
import Aside from '@/views/Layout/Aside.vue';

export default {
  name: 'App',
  components: {
    Header, Footer, Aside,
  },
};
</script>
