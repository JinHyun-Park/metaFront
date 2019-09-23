<template>
  <div id="app">
    <div
      v-if="modalSet.modalOn"
      class="confirm"
    >
      <comm-alert />
    </div>
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
import { mapState } from 'vuex';
import Header from '@/views/Layout/Header.vue';
import Footer from '@/views/Layout/Footer.vue';
import Aside from '@/views/Layout/Aside.vue';
import RightSide from '@/views/Layout/RightSide.vue';

import CommAlert from '@/components/popup/common/CommAlert.vue';

export default {
  name: 'App',
  components: {
    Header, Footer, Aside, RightSide, CommAlert,
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapState('frameSet', ['headerOn', 'asideOn', 'footerOn', 'loginPageOn', 'modalSet']),
  },
};
</script>
