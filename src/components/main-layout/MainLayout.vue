<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col col-sm-12 col-md-3 col-lg-2 g-3">
        <app-menu :rotas="getRoutes" />
      </div>
      <div class="col col-sm-12 col-md-9 col-lg-10 g-3">
        <transition name="pagina">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { routes } from '../../routes';
import Menu from '../shared/menu/Menu.vue';

export default {
  components: {
    'app-menu': Menu
  },
  computed: {
    getRoutes() {
      const routesMap = routes
        .reduce((prev, curr) => {
          if (!curr.children) {
            return [...prev, curr];
          }
          return [...prev, ...curr.children];
        }, [])
        .filter(route => (
          !route.meta ||
          (route.meta && !route.meta.requiresAdmin) ||
          (
            route.meta.requiresAdmin &&
            this.$store.getters.getLoggedUser.roleName === 'administrator'
          )
        ));

      return routesMap;
    }
  },
  data() {
    return {
      routes,
    };
  }
}
</script>

<style>
</style>
