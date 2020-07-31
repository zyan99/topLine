<template>
  <div id="app">
    <!-- 配置 程序唯一的出口 -->
    <router-view />
  </div>
</template>

<style>
/* 样式初始化
  加上 scoped 样式只会在本组件生效
 */
html,
body,
div,
section,
p,
span,
h1,
h2,
h3,
h4,
h5,
h6,
textarea,
input {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>
