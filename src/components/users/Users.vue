<template>
  <div>
    <h1 class="centralizado">Usuários</h1>
    <div class="container">
      <div class="row">
        <div class="col g-3">
          <button class="btn btn-primary float-end" @click.prevent="openUserForm(null, 'create')">+</button>
        </div>
      </div>
      <div class="row row-cols-1 row-cols-md-1 row-cols-lg-2 g-3">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Usuário</th>
              <th scope="col">Nível de acesso</th>
              <th />
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.email }}</td>
              <td>{{ user.roleName }}</td>
              <td>
                <button class="btn btn-default" @click.prevent="openUserForm(user, 'edit')">✏️</button>
                <button class="btn btn-default" @click.prevent="removeUser(user)">🗑️</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <app-toast :message="message" :messageType="messageType" />
    <hr>
    <user-form :show="showForm" :user="selectedUser" :mode="formMode" :onChange="() => fetchUsers()"/>
  </div>
</template>

<script>
import Toast from '../shared/toast/Toast.vue';
import LineChart from '../shared/line-chart/LineChart';
import UserForm from '../user-form/UserForm.vue';

export default {
  components: {
    LineChart,
    UserForm,
    UserForm,
    'app-toast': Toast
  },
  data() {
    return {
      users: [],
      selectedUser: null,
      formMode: null,
      showForm: false,
      message: null,
      messageType: null
    };
  },
  methods: {
    fetchUsers() {
      this.$client.get('/user').then(({ data }) => this.users = data);
    },
    openUserForm(user, mode) {
      this.selectedUser = user;
      this.formMode = mode;
      this.showForm = true;
    },
    removeUser(user) {
      this.users = this.users.filter(u => u.id !== user.id);
      this.message = 'Usuário removido';
      this.messageType = 'success';
    }
  },
  mounted() {
    this.fetchUsers();
  }
}
</script>

<style>
</style>
