<template>
  <div class="home">
    <img
      alt="Vue logo"
      src="../assets/logo.png"
    >
    <HelloWorld msg="Welcome to META WORLD!!" />
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions } from 'vuex';
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld,
  },
  created() {
    this.setHeaderOn({ headerOn: true });
    this.setAsideOn({ asideOn: false });
    this.setFooterOn({ footerOn: true });
  },
  methods: {
    ...mapActions('frameSet', ['setHeaderOn', 'setAsideOn', 'setFooterOn']),
  },
};
</script>
