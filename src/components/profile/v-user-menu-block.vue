<template>
  <div class="user_menu_block g-gap-1 d-grid m-top-1 h-max-content">
    <p class="d-flex a-items-center c-pointer c-555 c-content-hover bg-fff padding-03 b-radius-8 fa-border bg-ccc-opacity" @click="openMessage">
      <i class="fa fa-envelope padding-05" aria-hidden="true"></i> <span>отправить сообщение </span>
    </p>

    <p class="d-flex a-items-center c-pointer c-555 c-content-hover bg-fff padding-03 b-radius-8 fa-border bg-ccc-opacity"
       v-if="!friend"
       @click="setModalName('friendCreateAlert')">
      <i class="fa fa-user-plus padding-05 " aria-hidden="true"></i> <span>добавить в друзья </span>
    </p>

    <p class="d-flex a-items-center c-pointer c-555 c-red-hover bg-fff padding-03 b-radius-8 fa-border bg-ccc-opacity"
       @click="setModalName('removeFromFriendsAlert')"
       v-else-if="friend && friend.confirmed">
      <i class="fa fa-ban padding-05" aria-hidden="true"></i> <span>удалить из друзей</span>
    </p>

    <p class="d-flex a-items-center c-pointer c-555 c-red-hover bg-fff padding-03 b-radius-8 fa-border bg-ccc-opacity"
       @click="setModalName('cancelFriendRequestAlert')"
       v-else-if="friend && !friend.confirmed && friend.creator_id === profile.id">
      <i class="fa fa-user-times padding-05" aria-hidden="true"></i> <span>отменить запрос дружбы</span>
    </p>

    <p class="d-flex a-items-center c-pointer c-555 c-content-hover bg-fff padding-03 b-radius-8 fa-border bg-ccc-opacity"
       @click="setModalName('acceptFriendAlert')"
       v-if="friend && !friend.confirmed && friend.creator_id !== profile.id">
      <i class="fa fa-user-plus padding-05" aria-hidden="true"></i> <span>принять дружбу</span>
    </p>

    <p class="d-flex a-items-center c-pointer c-555 c-red-hover bg-fff padding-03 b-radius-8 fa-border bg-ccc-opacity"
       @click="setModalName('declineFriendRequestAlert')"
       v-if="friend && !friend.confirmed && friend.creator_id !== profile.id">
      <i class="fa fa-user-times padding-05" aria-hidden="true"></i> <span>отклонить запрос дружбы</span>
    </p>


  </div>

<!--  ALERT-->
  <v-alert-modal :label="`отправить запрос на дружбу ${this.user.first_name} ${this.user.last_name} ?`"
                 @confirm="onFriend"
                 @close="setModalName(false)"
                 v-if="modalName === 'friendCreateAlert'"/>

  <v-alert-modal :label="`удалить из друзей пользователя ${this.user.first_name} ${this.user.last_name} ?`"
                 @confirm="onDeleteFriend"
                 @close="setModalName(false)"
                 v-if="modalName === 'removeFromFriendsAlert'"/>

  <v-alert-modal :label="`отменить запрос на дружбу ${this.user.first_name} ${this.user.last_name} ?`"
                 @confirm="onDeleteFriend"
                 @close="setModalName(false)"
                 v-if="modalName === 'cancelFriendRequestAlert'"/>

  <v-alert-modal :label="`принять дружбу от ${this.user.first_name} ${this.user.last_name} ?`"
                 @confirm="onUpdateFriend"
                 @close="setModalName(false)"
                 v-if="modalName === 'acceptFriendAlert'"/>

  <v-alert-modal :label="`отклонить запрос дружбы от ${this.user.first_name} ${this.user.last_name} ?`"
                 @confirm="onDeleteFriend"
                 @close="setModalName(false)"
                 v-if="modalName === 'declineFriendRequestAlert'"/>
</template>

<script>
import VAlertModal from "@/components/_general/v-alert-modal";
import toggleMixin from "@/mixins/toggle-mixin";
import {mapState} from "vuex";
export default {
  name: "v-user-menu-block",
  components: {VAlertModal},
  props: ['user'],
  mixins: [toggleMixin],
  computed: mapState({
    profile: state => state.auth.profile
  }),
  data(){
    return {
      friend: null,
    }
  },
  mounted() {
    this.getFriend()
  },
  methods:{
    openMessage(){
      this.emitter.emit('openMessage', this.user)
    },
    onFriend(){
      this.emitter.emit('load', true)
      this.$store.dispatch("friend/CREATE", {user_id: this.user.id}).then(data => {
        this.emitter.emit('message', data)
      }).finally(() => this.emitter.emit('load', false))
    },
    onDeleteFriend(){
      this.emitter.emit('load', true)
      this.$store.dispatch("friend/DELETE", `?id=${this.friend.id}`).then(data => {
        this.emitter.emit('message', data)
      }).finally(() => this.emitter.emit('load', false))
    },
    onUpdateFriend(){
      this.emitter.emit('load', true)
      this.$store.dispatch("friend/UPDATE", `?id=${this.friend.id}`).then(data => {
        this.emitter.emit('message', data)
      }).finally(() => this.emitter.emit('load', false))
    },
    getFriend(){
      this.emitter.emit('load', true)
      this.$store.dispatch("friend/GET", `?user_id=${this.$route.query.id}`).then(data => {
        if(data.success)
          this.friend = data.obj

      }).finally(() => this.emitter.emit('load', false))
    }
  }
}
</script>

<style scoped>
</style>