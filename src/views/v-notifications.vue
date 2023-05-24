<template>
  <div :class="`${mobile ? 'notifications_mobile' : 'notifications'} d-grid g-gap-3`">
    <div></div>
    <div class="bg-fff padding-1 min-height-500 w-max box-shadow-slim h-max-content">
      <i class="f-weight-bold c-ccc t-center d-block" v-if="!notification_ids.length"> {{ lang.notifications.no_notifications }}</i>
      <div v-for="notification_id in notification_ids" class="h-max-content m-bottom-1" :key="notification_id" v-else>
        <v-notification-list :notification_id="notification_id"/>
      </div>
    </div>
  </div>
</template>

<script>
import VNotificationList from "@/components/notification/tabs/v-notification-list";
import {mapState} from "vuex";
import deviceMixin from "@/mixins/device-mixin";
export default {
  name: "v-notifications",
  components: {VNotificationList},
  mixins: [deviceMixin],
  computed: mapState({
    notification_ids: state => state.notification.NOTIFICATION_IDS,
    notifications: state => state.notification.NOTIFICATIONS,
    lang: state => state.lang.LANG
  }),
}
</script>

<style scoped>
.notifications{
  grid-template-columns: 1fr 2fr;
}
.notifications_mobile{
    grid-template-columns: 1fr;
}
</style>