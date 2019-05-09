<template>
  <div id="app">
    <transition mode="in-out">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>


export default {
  name: 'app',
  components: {

  }
}
</script>
<style>
html,body{
  padding: 0;
  margin: 0;
  overflow: hidden;
}
</style>
