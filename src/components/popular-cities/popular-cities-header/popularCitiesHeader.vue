<script setup lang="ts">

</script>

<template>
  <div class="popular-header">
    <div class="title">Погода в популярных городах</div>
    <div class="question">?</div>
  </div>
</template>

<style lang="scss" scoped>
.popular-header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  margin-bottom: 32px;

  .title {
    @include typo.font-h4;
  }

  .question {
    @include typo.font-p3-med;
    width: 38px;
    height: 38px;
    align-items: center;
    justify-content: center;
    display: flex;
    border-radius: 50%;
    background-color: colors.$base-white-10;
    cursor: pointer;
    user-select: none;

    &:hover {
      background: colors.$base-white-20;
    }
  }
}
</style>