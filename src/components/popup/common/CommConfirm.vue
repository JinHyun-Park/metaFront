<template>
  <div class="contents popup">
    <i class="dim" />
    <article class="layer_popup Ssmall">
      <!--
                <section class="title style-2">
                    <h2><i class="ico-bar"></i>Confirm Popup</h2>
                </section>
-->
      <section class="confirm_area">
        <i class="ico-cancel" />
        <label class="">정말 삭제 하시겠습니까?</label>
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
  name: 'CommConfirm',
};
</script>
