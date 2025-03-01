<template>
  <div class="shareCard">
    <h1 class="title">
      <span>Hi, I'm Jason Yan 👋</span>
    </h1>
    <p class="description">
      Bug制造者，知识杂食家，偶尔在代码里种下荒诞，收获自嘲。
    </p>
  </div>
</template>

<script lang="ts" setup></script>
<style scoped>
.shareCard {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 15px;
  text-align: center;
}
.title {
  display: flex;
  align-items: center;
  font-size: 2.2em;
  font-weight: bold;
}
.description {
  margin: 1em 0;
}
</style>
