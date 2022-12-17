<template>
  <div class="padding-1  h-max-content c-555  p-relative">

    <div class="p-relative  c-pointer c-content-hover" @click="modalName === false ? setModalName('notificationBlock') : setModalName(false)">
      <span class="count_indicator p-absolute bg-content f-weight-bold d-flex a-items-center j-content-center f-size-very-small b-radius-50"
            v-if="friend_requests_total">
        {{friend_requests_total}}
      </span>
      <i class="fa fa-bell" aria-hidden="true"></i>
    </div>

    <div class="bg-fff padding-1 box-shadow-slim p-absolute right-0 m-top-05 notification_block d-grid g-gap-1 z-index-max" v-if="modalName === 'notificationBlock'">

      <div class="tabs_block d-flex g-gap-1 f-size-small bg-ccc-opacity padding-05 ">
        <span class="c-pointer c-content-hover t-decoration-underline f-weight-bold c-b0 p-relative h-max-content">
          запросы в друзья
          <i class="count_indicator p-absolute bg-content f-weight-bold d-flex a-items-center j-content-center f-size-very-small b-radius-50" v-if="friend_requests_total">
            {{friend_requests_total}}
          </i>
        </span>
      </div>
      <p class="f-weight-bold c-ccc t-center" v-if="!friend_requests_total">раздел пуст</p>

      <v-friend-request v-for="user in friend_request_users" :key="user.id" :user="user"/>

    </div>
  </div>

</template>

<script>
import VFriendRequest from "@/components/notification/tabs/v-friend-request";
import {mapState} from "vuex";
import toggleMixin from "@/mixins/toggle-mixin";
export default {
  name: "v-notification",
  components: {VFriendRequest},
  mixins: [toggleMixin],
  computed: mapState({
    friend_request_users: state => state.friend.USERS,
    friend_requests_total: state => state.friend.TOTAL_REQUEST
  }),
  created() {
    this.sockets.subscribe('friend_request', (data) => {
      this.$store.commit("friend/SET_REQUESTS", data)
    });
  },
  mounted() {
    this.$store.dispatch("friend/GET", `?page=1&per_page=6`).then(data => {
      this.$store.commit("friend/SET_REQUESTS", {total: data.obj.total, items: data.obj.items})
    })
  }
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