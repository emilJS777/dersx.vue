<template>
  <div class="friend_request_block fa-border padding-1 d-grid g-gap-2" v-for="notification in this.notifications" :key="notification.id">
<!--    FRIEND-->
    <div v-if="notification.friend" class="d-flex j-content-space-between">
      <div class="m-bottom-1">
        <v-user-mini-block :user="notification.creator"/>
      </div>

      <div class="d-flex g-gap-1 a-items-center j-content-space-evenly c-ccc f-weight-bold">
        <span v-if="notification.friend.confirmed" class="">{{ lang.notifications.friend.accepted }}</span>
        <span v-else>{{ lang.notifications.friend.friend_request }}</span>
      </div>

      <div class="f-size-small menu d-flex g-gap-_5 m-top-1 f-weight-bold c-content-hover padding-left-1 padding-right-1">
        <v-button-normal v-if="notification.friend.confirmed" label="OK" @click="notificationDelete(notification.id)"/>

        <div class="menu d-flex g-gap-_5 m-top-1" v-else>
          <v-button-normal :label="lang.general.accept" class=" c-content-hover" icon="fa fa-check" @click="onUpdateFriendRequest(notification.id, notification.friend.id)"/>
          <v-button-normal :label="lang.general.reject" class=" c-red" icon="fa fa-ban" @click="onDeleteFriendRequest(notification.id, notification.friend.id)"/>
        </div>
      </div>
    </div>

<!--    VACANCY OFFER-->
    <div v-if="notification.vacancy_offer" class="d-flex j-content-space-between a-items-center">
      <div class="m-bottom-1">
        <v-user-mini-block :user="notification.creator"/>
      </div>
      <div>
        <h4 class="d-flex g-gap-1 a-items-center j-content-space-evenly c-ccc f-weight-bold m-bottom-0 m-top-0">{{ lang.notifications.job_posting}}</h4>
        <p class="o-hidden f-size-small cut-text">{{notification.vacancy_offer.description}}</p>
      </div>
      <div class="f-size-small">
        <v-button-normal :label="lang.general.look" icon="fa fa-eye" @click="notificationDelete(notification.id);this.$router.push({name: 'vacancy', query: {id: notification.vacancy_offer.vacancy_id}})"/>
      </div>
    </div>

<!--&lt;!&ndash;    GROUP INVITE&ndash;&gt;-->
<!--    <div v-if="notification.group_invite">-->
<!--      <div class="m-bottom-1">-->
<!--        <v-user-mini-block :user="notification.creator"/>-->
<!--      </div>-->
<!--      <div>-->
<!--        <h4 class="f-size-small m-bottom-0 m-top-0">приглашает в группу {{notification.group_invite.group.title}}</h4>-->
<!--        <div class="d-flex g-gap-_5 m-top-1">-->
<!--          <v-button-normal label="принять" class="f-size-very-small c-content-hover" icon="fa fa-check" @click="onUpdateGroupInvite(notification.group_invite.id, notification.id)"/>-->
<!--          <v-button-normal label="отклонить" class="f-size-very-small c-red" icon="fa fa-ban" @click="onDeleteGroupInvite(notification.group_invite.group.id, notification.id)"/>-->
<!--        </div>-->
<!--&lt;!&ndash;        <a :href="`/vacancy?id=${notification.vacancy_offer.vacancy_id}`" @click="notificationDelete(notification.id)" class="f-size-small c-content">посмотреть</a>&ndash;&gt;-->
<!--      </div>-->
<!--    </div>-->
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
    lang: state => state.lang.LANG
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
    },
    onUpdateGroupInvite(group_invite_id, notification_id){
      this.$store.dispatch("group_invite/UPDATE", group_invite_id)
      this.notificationDelete(notification_id)
    },
    onDeleteGroupInvite(group_id, notification_id){
      this.notification_clear_local(notification_id)
      this.$store.dispatch("group_invite/DELETE", `?group_id=${group_id}&user_id=${this.profile.id}`).then(data => console.log(data))
    }
  }
}
</script>

<style scoped>

</style>