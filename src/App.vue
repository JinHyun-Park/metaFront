<template>
  <div id="app">
    <Header v-if="headerOn" />
    <article class="contents">
      <Aside v-if="asideOn" />
      <router-view />
    </article>
    <Footer v-if="footerOn" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Header from '@/views/Layout/Header.vue';
import Footer from '@/views/Layout/Footer.vue';
import Aside from '@/views/Layout/Aside.vue';

export default {
  name: 'App',
  components: {
    Header, Footer, Aside,
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapState('frameSet', ['headerOn', 'asideOn', 'footerOn']),
  },
};
</script>
