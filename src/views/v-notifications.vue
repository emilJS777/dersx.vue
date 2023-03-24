<template>
  <div class="notifications d-grid g-gap-3">
    <div></div>
    <div class="bg-fff padding-1 d-grid g-gap-1">
      <p class="f-weight-bold c-ccc t-center" v-if="!notification_ids.length">раздел пуст</p>
      <div v-for="notification_id in notification_ids" :key="notification_id">
        <v-notification-list :notification_id="notification_id"/>
      </div>
    </div>
  </div>
</template>

<script>
import VNotificationList from "@/components/notification/tabs/v-notification-list";
import {mapState} from "vuex";
export default {
  name: "v-notifications",
  components: {VNotificationList},
  computed: mapState({
    notification_ids: state => state.notification.NOTIFICATION_IDS,
    notifications: state => state.notification.NOTIFICATIONS
  }),
}
</script>

<style scoped>
.notifications{
  grid-template-columns: 1fr 2fr;
}
</style>