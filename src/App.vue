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
        <RightSide v-if="asideOn" />
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
import RightSide from '@/views/Layout/RightSide.vue';

export default {
  name: 'App',
  components: {
    Header, Footer, Aside, RightSide,
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapState('frameSet', ['headerOn', 'asideOn', 'footerOn', 'loginPageOn']),
  },
  mounted() {
    // console.log(typeof this.loginPageOn);
    // console.log(this.loginPageOn);
    // this.setLoginPageOn({ loginPageOn: false });
    // console.log('야야야');
    // console.log(typeof this.loginPageOn);
    // console.log(this.loginPageOn);
  },
  methods: {
    ...mapActions('frameSet', ['setLoginPageOn']),
  },
};
</script>
