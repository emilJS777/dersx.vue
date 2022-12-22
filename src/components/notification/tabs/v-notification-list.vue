<template>
  <div class="friend_request_block fa-border padding-1" v-for="notification in this.notifications" :key="notification.id">
<!--    FRIEND-->
    <div v-if="notification.friend">
      <div class="m-bottom-1">
        <v-user-mini-block :user="notification.creator"/>
      </div>
      <div v-if="notification.friend.confirmed" class="d-flex g-gap-1 a-items-center j-content-space-evenly">
        <span class=" c-ccc f-weight-bold">теперь вы друзья !</span>
        <span class="t-decoration-underline f-size-small c-pointer f-weight-bold c-content-hover fa-border padding-left-1 padding-right-1" @click="notificationDelete(notification.id)">
          OK
        </span>
      </div>

      <div class="menu d-flex g-gap-_5 m-top-1" v-else>
        <v-button-normal label="принять" class="f-size-very-small c-content-hover" icon="fa fa-check" @click="onUpdateFriendRequest(notification.id, notification.friend.id)"/>
        <v-button-normal label="отклонить" class="f-size-very-small c-red" icon="fa fa-ban" @click="onDeleteFriendRequest(notification.id, notification.friend.id)"/>
      </div>
    </div>

<!--    VACANCY OFFER-->
    <div v-if="notification.vacancy_offer">
      <div class="m-bottom-1">
        <v-user-mini-block :user="notification.creator"/>
      </div>
      <div>
        <h4 class="f-size-small m-bottom-0 m-top-0">отклик на вакансию</h4>
        <p class="o-hidden f-size-small cut-text">{{notification.vacancy_offer.description}}</p>
        <a :href="`/vacancy?id=${notification.vacancy_offer.vacancy_id}`" @click="notificationDelete(notification.id)" class="f-size-small c-content">посмотреть</a>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import VUserMiniBlock from "@/components/_general/v-user-mini-block";
import VButtonNormal from "@/components/_general/v-button-normal";

export default {
  name: "v-notification-list",
  components: {VButtonNormal, VUserMiniBlock},
  props: ['notification_id'],
  computed: mapState({
    profile: state => state.auth.profile,
  }),
  data(){
    return {
      notifications: []
    }
  },
  mounted() {
    this.$store.dispatch("notification/GET", `?id=${this.notification_id}`).then(data => {
      this.notifications.push(data.obj)
    })
  },
  methods: {
    notification_clear_local(id){
      this.$store.commit("notification/DELETE_NOTIFICATION_id", id)
      this.notifications.map((notification, index) => notification.id === id ? this.notifications.splice(index, 1) : false)
    },
    notificationDelete(id){
      this.$store.dispatch("notification/DELETE", `?id=${id}`)
      this.notification_clear_local(id)
    },
    onDeleteFriendRequest(notification_id, friend_id){
      this.$store.dispatch("friend/DELETE", `?id=${friend_id}`)
      this.notification_clear_local(notification_id)
    },
    onUpdateFriendRequest(notification_id, friend_id){
      this.$store.dispatch("friend/UPDATE", `?id=${friend_id}`)
      this.notification_clear_local(notification_id)
    }
  }
}
</script>

<style scoped>
p{}
</style>