<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="card col-sm-12 col-md-6 col-lg-4 g-3">
        <div class="card-header">
          Entre para continuar
        </div>
        <div class="card-body">
          <form @submit.prevent="login()">
            <div class="mb-3">
              <label for="emailInput" class="form-label">Usuário</label>
              <input required type="email" class="form-control" id="emailInput" v-model="user.email">
            </div>
            <div class="mb-3">
              <label for="passwordInput" class="form-label">Senha</label>
              <input required type="password" class="form-control" id="passwordInput" v-model="user.password">
            </div>
            <button type="submit" class="btn btn-primary">Entrar</button>
          </form>
        </div>
      </div>
      <app-toast :message="errorMessage" messageType="danger" />
    </div>
  </div>
</template>

<script>
import Toast from '../shared/toast/Toast.vue';

export default {
  components: {
    'app-toast': Toast
  },
  data() {
    return {
      user: {
        email: '',
        password: ''
      },
      errorMessage: null
    };
  },
  methods: {
    login() {
      this.$store.dispatch('login', this.user)
        .then(() => {
          this.errorMessage = null;
          this.$router.push({ name: 'main' });
        })
        .catch(() => {
          this.errorMessage = 'Usuário/senha inccoreto(s)';
        });
    },
    dismissAlert() {
      this.errorMessage = null;
    }
  }
}
</script>

<style>
  .lista-fotos {
    list-style: none;
  }
  .lista-fotos .lista-fotos-item {
    display: inline-block;
  }
  .filtro {
    width: 100%;
  }
</style>
