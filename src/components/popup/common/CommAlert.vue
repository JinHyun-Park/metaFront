<template>
  <div class="contents popup">
    <i class="dim" />
    <article class="layer_popup ssmall">
      <section class="confirm_area">
        <label class="">정말 저장 하시겠습니까?</label>
      </section>

      <section class="btm_button_area confirm_btn">
        <button
          type="button"
          class="default_button"
        >
          취소
        </button>
        <button
          type="button"
          class="default_button on"
        >
          확인
        </button>
      </section>
    </article>
  </div>
</template>

<script>
export default {
  name: 'CommAlert',
};
</script>
