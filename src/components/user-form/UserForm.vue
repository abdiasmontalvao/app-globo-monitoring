<template>
  <div v-if="show">
    <h2 class="centralizado">{{ title }}</h2>
    <div class="container">
      <div class="row row-cols-1 row-cols-md-1 row-cols-lg-2 g-3">
        <form @submit.prevent="save()">
          <div class="mb-3">
            <label for="emailInput" class="form-label">Usuário</label>
            <input required type="email" class="form-control" id="emailInput" v-model="userChanged.email">
          </div>
          <div class="mb-3">
            <label for="roleSelect" class="form-label">Nível de acesso</label>
            <select class="form-select" id="roleSelect" v-model="userChanged.role">
              <option value="0">administrator</option>
              <option value="1">employee</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="passwordInput" class="form-label">Senha</label>
            <input required type="password" class="form-control" id="passwordInput" v-model="userChanged.password">
          </div>
          <button :disabled="isSaving" type="submit" class="btn btn-primary">{{ btnTitle }}</button>
        </form>
        <app-toast :messageType="messageType" :message="message" />
      </div>
    </div>
  </div>
</template>

<script>
import Toast from '../shared/toast/Toast.vue';

export default {
  components: {
    'app-toast': Toast
  },
  props: ['show', 'user', 'mode', 'onChange'],
  data() {
    return {
      title: '',
      btnTitle: '',
      userChanged: {
        id: '',
        email: '',
        role: '',
        password: '',
      },
      message: null,
      messageType: null,
      isSaving: false,
    };
  },
  methods: {
    save() {
      this.isSaving = true;

      const onSucess = (type) => {
        this.isSaving = false;
        this.message = `Usuário ${type} com sucesso com sucesso`;
        this.messageType = 'success';
      };
      const onError = () => {
        this.isSaving = false;
        this.message = 'Houve um erro, verique os campos e tente novamente';
        this.messageType = 'danger';
      };

      if (this.mode === 'edit') {
        this.
          $client
          .put('/user', this.userChanged)
          .then(() => onSucess('atualizado'))
          .catch(onError);
      } else {
        this.
          $client
          .post('/user', this.userChanged)
          .then(() => onSucess('criado'))
          .catch(onError);
      }

      if (this.onChange) {
        this.onChange();
      }
    }
  },
  watch: {
    user: {
      immediate: true,
      handler(val) {
        this.userChanged = {
          id: val ? val.id : '',
          email: val ? val.email : '',
          role: val ? val.role : '',
          password: ''
        };
      }
    },
    mode: {
      immediate: true,
      handler(val) {
        this.title = val === 'edit' ? 'Editar usuário' : 'Cadastrar usuário';
        this.btnTitle = val === 'edit' ? 'Salvar' : 'Cadastrar';
      }
    }
  }
}
</script>

<style>
</style>
