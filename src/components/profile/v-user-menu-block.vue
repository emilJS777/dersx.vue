<template>
  <div class="user_menu_block g-gap-1 d-grid m-top-1 h-max-content">
    <p class="d-flex a-items-center c-pointer c-555 c-content-hover bg-fff padding-03 b-radius-8 fa-border bg-ccc-opacity" @click="openMessage">
      <i class="fa fa-envelope padding-05" aria-hidden="true"></i> <span>{{ lang.profile.buttons.send_message}}</span>
    </p>

    <p class="d-flex a-items-center c-pointer c-555 c-content-hover bg-fff padding-03 b-radius-8 fa-border bg-ccc-opacity"
       v-if="!friend"
       @click="setModalName('friendCreateAlert')">
      <i class="fa fa-user-plus padding-05 " aria-hidden="true"></i> <span>{{ lang.profile.buttons.add_friend}}</span>
    </p>

    <p class="d-flex a-items-center c-pointer c-555 c-red-hover bg-fff padding-03 b-radius-8 fa-border bg-ccc-opacity"
       @click="setModalName('removeFromFriendsAlert')"
       v-else-if="friend && friend.confirmed">
      <i class="fa fa-ban padding-05" aria-hidden="true"></i> <span>{{ lang.profile.buttons.remove_from_friends}}</span>
    </p>

    <p class="d-flex a-items-center c-pointer c-555 c-red-hover bg-fff padding-03 b-radius-8 fa-border bg-ccc-opacity"
       @click="setModalName('cancelFriendRequestAlert')"
       v-else-if="friend && !friend.confirmed && friend.creator_id === profile.id">
      <i class="fa fa-user-times padding-05" aria-hidden="true"></i> <span>{{ lang.profile.buttons.cancel_friend_request}}</span>
    </p>

    <p class="d-flex a-items-center c-pointer c-555 c-content-hover bg-fff padding-03 b-radius-8 fa-border bg-ccc-opacity"
       @click="setModalName('acceptFriendAlert')"
       v-if="friend && !friend.confirmed && friend.creator_id !== profile.id">
      <i class="fa fa-user-plus padding-05" aria-hidden="true"></i> <span>{{ lang.profile.buttons.accept_friendship}}</span>
    </p>

    <p class="d-flex a-items-center c-pointer c-555 c-red-hover bg-fff padding-03 b-radius-8 fa-border bg-ccc-opacity"
       @click="setModalName('declineFriendRequestAlert')"
       v-if="friend && !friend.confirmed && friend.creator_id !== profile.id">
      <i class="fa fa-user-times padding-05" aria-hidden="true"></i> <span>{{ lang.profile.buttons.decline_friend_request}}</span>
    </p>


  </div>

<!--  ALERT-->
  <v-alert-modal :label="`${lang.profile.friend_request.confirm_create} ${this.user.first_name} ${this.user.last_name} ?`"
                 @confirm="onFriend"
                 @close="setModalName(false)"
                 v-if="modalName === 'friendCreateAlert'"/>

  <v-alert-modal :label="`${lang.profile.friend_request.confirm_delete} ${this.user.first_name} ${this.user.last_name} ?`"
                 @confirm="onDeleteFriend"
                 @close="setModalName(false)"
                 v-if="modalName === 'removeFromFriendsAlert'"/>

  <v-alert-modal :label="`${lang.profile.friend_request.confirm_cancel} ${this.user.first_name} ${this.user.last_name} ?`"
                 @confirm="onDeleteFriend"
                 @close="setModalName(false)"
                 v-if="modalName === 'cancelFriendRequestAlert'"/>

  <v-alert-modal :label="`${lang.profile.buttons.accept_friendship} ${this.user.first_name} ${this.user.last_name} ?`"
                 @confirm="onUpdateFriend"
                 @close="setModalName(false)"
                 v-if="modalName === 'acceptFriendAlert'"/>

  <v-alert-modal :label="`${lang.profile.buttons.decline_friend_request} ${this.user.first_name} ${this.user.last_name} ?`"
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
    profile: state => state.auth.profile,
    lang: state => state.lang.LANG
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
      this.$router.push({name: 'messages', params: {userId: this.user.id}})
      // this.emitter.emit('openMessage', this.user)
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