<template>
  <div id="app">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from '@/views/Layout/Header.vue';
import Footer from '@/views/Layout/Footer.vue';

export default {
  name: 'App',
  components: {
    Header, Footer,
  },
};
</script>
