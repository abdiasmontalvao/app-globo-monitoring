<template>
  <div class="toast align-items-center text-white border-0 show g-3" :class="'bg-'+messageType" role="alert" aria-live="assertive" aria-atomic="true" v-if="!!message">
    <div class="d-flex">
      <div class="toast-body">
        {{ message }}
      </div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" @click.prevent="dismissAlert()"></button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['message', 'messageType'],
  methods: {
    dismissAlert() {
      this.message = null;
      this.messageType = null;
    }
  }
};
</script>

<style scoped>
</style>