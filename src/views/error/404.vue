<template>
  <div class="">
    <div class="center_404">
      <img
        src="@/assets/images/notfound.png"
        width="600"
      >
    </div>
    <div class="contents_text">
      <span>올바르지 않은 접근입니다.</span>
    </div>
  </div>
</template>

<script>

export default {
  components: {
  },
};
</script>

<style scoped>
.contents_404 {
  width: 100%;
}
.center_404 {
  width: 50%;
  position: absolute;
  left: 50%;
  margin-left: -300px;
  top: 20%;
}
.contents_text {
  position: absolute;
  width: 100%;
  text-align: center;
  top: 70%;
  font-size: 30px;
}

</style>