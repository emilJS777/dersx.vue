<template>
  <div class="padding-1  h-max-content c-555  p-relative">

    <div class="p-relative  c-pointer c-content-hover" @click="modalName === false ? setModalName('notificationBlock') : setModalName(false)">
      <span class="count_indicator p-absolute bg-content f-weight-bold d-flex a-items-center j-content-center f-size-very-small b-radius-50"
            v-if="notification_ids.length">
        {{notification_ids.length}}
      </span>
      <i class="fa fa-bell" aria-hidden="true"></i>
    </div>

    <div class="bg-fff padding-1 box-shadow-slim p-absolute right-0 m-top-05 notification_block d-grid g-gap-1 z-index-max" v-if="modalName === 'notificationBlock'">

      <div class="tabs_block d-flex g-gap-1 f-size-small bg-ccc-opacity padding-05 ">
<!--        <span class="c-pointer c-content-hover t-decoration-underline f-weight-bold c-b0 p-relative h-max-content">-->
<!--          запросы в друзья-->
<!--&lt;!&ndash;          <i class="count_indicator p-absolute bg-content f-weight-bold d-flex a-items-center j-content-center f-size-very-small b-radius-50" v-if="friend_requests_total">&ndash;&gt;-->
<!--&lt;!&ndash;            {{friend_requests_total}}&ndash;&gt;-->
<!--&lt;!&ndash;          </i>&ndash;&gt;-->
<!--        </span>-->
      </div>
      <p class="f-weight-bold c-ccc t-center" v-if="!notification_ids.length">раздел пуст</p>
      <div v-for="notification_id in notification_ids" :key="notification_id">
        <v-notification-list :notification_id="notification_id"/>
      </div>

    </div>
  </div>

</template>

<script>
import {mapState} from "vuex";
import toggleMixin from "@/mixins/toggle-mixin";
import VNotificationList from "@/components/notification/tabs/v-notification-list";
export default {
  name: "v-notification",
  components: {VNotificationList},
  mixins: [toggleMixin],
  computed: mapState({
    notification_ids: state => state.notification.NOTIFICATION_IDS,
    notifications: state => state.notification.NOTIFICATIONS
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
.notification_block{
  min-height: 100px;
  max-height: 500px;
  width: 300px;
  overflow-y: auto;
}
.count_indicator{
  height: 15px;
  width: 15px;
  top: -8px;
  right: -12px;
  color: #fff;
}
</style>