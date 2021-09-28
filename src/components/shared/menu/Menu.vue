<template>
  <div class="d-flex flex-column flex-shrink-0 p-3 bg-light">
    <div cldivss="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
      <span class="fs-4">Menu</span>
    </div>
    <hr>
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item" v-for="rota in rotas" :key="rota.path">
        <router-link class="nav-link" :to="rota.path ? rota.path : '/'">{{ rota.titulo }}</router-link>
      </li>
      <li class="nav-item">
        <button class="nav-link" @click="logout()">Sair</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    rotas: {
      type: Array,
      required: true
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
        .then(() => {
          this.$router.push({ name: 'login' }).catch(() => {});
        });
    }
  }
};
</script>

<style scoped>
</style>