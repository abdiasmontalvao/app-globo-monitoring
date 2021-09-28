import Login from "./components/login/Login.vue";
import Main from "./components/main/Main.vue";
import MainLayout from "./components/main-layout/MainLayout.vue";
import Users from "./components/users/Users.vue";

export const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
    titulo: "Login"
  },
  {
    path: "",
    component: MainLayout,
    titulo: "Principal",
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: "",
        name: "main",
        component: Main,
        titulo: "Principal"
      },
      {
        path: "/users",
        name: "users",
        component: Users,
        titulo: "Usuários",
        meta: {
          requiresAdmin: true
        }
      }
    ]
  }
];
