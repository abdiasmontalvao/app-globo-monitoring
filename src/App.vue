<template>
    <router-view></router-view>
</template>

<script>
export default {
};
</script>

<style>
  .centralizado {
    text-align: center;
  }
  .pagina-enter, .pagina-leave-active {
    opacity: 0;
  }
  .pagina-enter-active, .pagina-leave-active {
    transition: opacity .4s;
  }
</style>
