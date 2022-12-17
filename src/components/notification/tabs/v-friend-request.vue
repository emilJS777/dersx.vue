<template>
  <div class="friend_request_block fa-border padding-1">
    <div class="m-bottom-1">
      <v-user-mini-block :user="user"/>
    </div>
    <div v-if="user.confirmed" class="d-flex g-gap-1 a-items-center j-content-space-evenly">
      <span class=" c-ccc f-weight-bold">теперь вы друзья !</span>
      <span class="t-decoration-underline f-size-small c-pointer f-weight-bold c-content-hover fa-border padding-left-1 padding-right-1" @click="this.onDeleteRequestStore">
        OK
      </span>
    </div>

    <div class="menu d-flex g-gap-_5 m-top-1" v-else>
      <v-button-normal label="принять" class="f-size-very-small c-content-hover" icon="fa fa-check" @click="onUpdateFriendRequest"/>
      <v-button-normal label="отклонить" class="f-size-very-small c-red" icon="fa fa-ban" @click="onDeleteFriendRequest"/>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import VUserMiniBlock from "@/components/_general/v-user-mini-block";
import VButtonNormal from "@/components/_general/v-button-normal";

export default {
  name: "v-friend-request",
  components: {VButtonNormal, VUserMiniBlock},
  props: ['user'],
  computed: mapState({
    profile: state => state.auth.profile
  }),
  methods: {
    onDeleteFriendRequest(){
      this.emitter.emit('load', true)
      this.$store.dispatch("friend/DELETE", `?user_id=${this.user.id}`).then(data => {
        if(data.success)
          this.onDeleteRequestStore()
        else
          this.emitter.emit('message', data)
      }).finally(() => this.emitter.emit('load', false))
    },
    onUpdateFriendRequest(){
      this.emitter.emit('load', true)
      this.$store.dispatch("friend/UPDATE", `?user_id=${this.user.id}`).then(data => {
        if(data.success)
          this.onDeleteRequestStore()
        else
          this.emitter.emit('message', data)
      }).finally(() => this.emitter.emit('load', false))
    },
    onDeleteRequestStore(){
      this.$store.commit("friend/DELETE_REQUESTS", this.user)
    }
  }
}
</script>

<style scoped>

</style>