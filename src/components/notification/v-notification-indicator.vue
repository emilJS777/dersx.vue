<template>
 <span class="c-fff f-size-small f-weight-bold padding-1  top-0 d-flex j-content-center a-items-center b-radius-50 bg-red" v-if="notification_ids.length">
    {{this.notification_ids.length}}
  </span>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "v-notification-indicator",
  computed: mapState({
    notification_ids: state => state.notification.NOTIFICATION_IDS,
  }),
  mounted() {
    this.$store.dispatch("notification/GET", ``).then(() => {})
    this.sockets.subscribe('notification_ids', (data) => {
      this.$store.commit("notification/SET_NOTIFICATION_IDS", data.notification_ids)
    });
  },
}
</script>

<style scoped>

</style>