<template>
  <header>
    <div class="gnb">
      <h1
        class="inH1"
        @click="gotoHome()"
      >
        META PORTAL
        <!-- <img
          class="bi"
          src="@/assets/images/logo.png"
          alt="SK C&C 로고"
          @click="gotoHome()"
        > -->
      </h1>
      <nav>
        <ul class="menu">
          <li>
            I/F
            <i class="menu_bar" />
          </li>
          <li>
            EAI
            <i class="menu_bar" />
          </li>
          <li class="on">
            EiGW
            <i class="menu_bar" />
            <ul class="sub_menu">
              <li>
                I/F
              </li>
              <li @click="gotoEaiReg()">
                EAI
              </li>
              <li
                class="ov"
                @click="gotoEigw()"
              >
                EiGW
              </li>
              <li @click="gotoMcg()">
                MCG
              </li>
            </ul>
          </li>
          <li>
            MCG
            <i class="menu_bar" />
          </li>
          <li>
            EiGW
            <i class="menu_bar" />
          </li>
          <li>
            BOARD
            <i class="menu_bar" />
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      navItems: [
        { title: 'I/F', path: '' },
        { title: 'EAI', path: '' },
        { title: 'EiGW', path: '' },
        { title: 'MCG', path: '' },
        { title: 'BOARD', path: '' },
      ],
    };
  },
  methods: {
    gotoHome() {
      this.$router.push({ name: 'home' });
    },
    gotoEaiReg() {
      this.$router.push({ name: 'eaiReg' });
    },
    gotoEigw() {
      this.$router.push({ name: 'onlineList' });
    },
    gotoMcg() {
      this.$router.push({ name: 'mcgDtlList' });
    },
  },
};
</script>

<style>
.inH1 {cursor: pointer; color: white;}
</style>
