<template>
  <div id="gitalk-container"></div>
</template>
<script lang="ts" setup>
import "gitalk/dist/gitalk.css";
import Gitalk from "gitalk";
import { onContentUpdated, useRouter } from "vitepress";

// const { route, go } = useRouter();
function deleteChild(element: HTMLDivElement | null) {
  let child = element?.lastElementChild;
  while (child) {
    element?.removeChild(child);
    child = element?.lastElementChild;
  }
}
onContentUpdated(() => {
  // reset gittalk element for update
  const element = document.querySelector("#gitalk-container") as any;
  if (!element) {
    return;
  }
  deleteChild(element);
  const gitalk = new Gitalk({
    clientID: "9791f4201946053bb18c",
    clientSecret: "0d20e3be668f2ccbcc0a65b6c7586bbd603a11e4",
    repo: "blog-v2",
    owner: "crazymryan",
    admin: ["crazymryan"],
    id: location.pathname.substring(0, 50), // Ensure uniqueness and length less than 50
    language: "zh-CN",
    distractionFreeMode: true, // Facebook-like distraction free mode
  });
  gitalk.render("gitalk-container");
});
</script>
<style scoped></style>
