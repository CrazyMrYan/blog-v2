<template>
  <footer>
    Powered by
    <a href="https://github.com/CrazyMrYan/" target="_blank" title="作者"
      >Jason Yan</a
    >
    | Copyright © 2019-{{ date }} | MIT License
    <a
      href="https://beian.miit.gov.cn/"
      target="_blank"
      title="湘ICP备2022013329号-1"
      data-v-3af3d229
    >
      湘ICP备2022013329号-1
    </a>
  </footer>
</template>
<script lang="ts" setup>
const date = new Date().getFullYear();
</script>
<style scoped>
footer {
  text-align: center;
  position: absolute;
  width: 100%;
  bottom: 20px;
  padding: 0 20px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text);
}
a {
  color: var(--vp-c-brand);
  font-weight: bold;
}
a:hover {
  text-decoration: none;
  color: var(--vp-c-hover);
}
</style>
