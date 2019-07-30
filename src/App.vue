<template>
  <div id="app">
    <div v-if="loginPageOn">
      <router-view />
    </div>
    <div v-else>
      <Header v-if="headerOn" />
      <article class="contents">
        <Aside v-if="asideOn" />
        <router-view />
      </article>
      <Footer v-if="footerOn" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
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
    ...mapState('frameSet', ['headerOn', 'asideOn', 'footerOn', 'loginPageOn']),
  },
  created() {
    console.log(typeof this.loginPageOn);
    console.log(this.loginPageOn);
    // this.setLoginPageOn({ loginPageOn: true });
    // console.log('야야야');
    // console.log(typeof this.loginPageOn);
    // console.log(this.loginPageOn);
  },
  methods: {
    ...mapActions('frameSet', ['setLoginPageOn']),
  },
};
</script>
