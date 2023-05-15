<template>
  <div class="padding-03 bg-ccc-opacity margin-05 p-relative" v-if="this.message_body">
    <div v-bind:class="!read && this.message_body.creator_id !== user.id ? 'not_read padding-1' : 'padding-03'">
      <div>
        <v-user-mini-block :user="this.message_body.creator_id === this.partner.id ? this.partner : this.user"/>
      </div>
      <p class="margin-1"><span v-html="this.message_body.text"></span> <i class="f-size-small c-ccc" v-if="this.message_body.edited">{{ lang.message.edited }}</i></p>

      <div class="c-ccc f-size-small d-flex j-content-space-between padding-left-1 padding-right-1">
        <span v-if="this.date_time">{{this.date_time}}</span>

        <div v-if="this.message_body.creator_id === user.id">
          <span v-if="read">{{ lang.message.read }}</span>
          <span v-else>{{ lang.message.unread }}</span>
        </div>
      </div>

      <v-menu-normal v-if="this.message_body.creator_id === profile.id" class="m-right-05 c-555 m-top-05" :opening="true" :menu_list="
      [{title: lang.general.redactor, icon_class: 'fa fa-edit', emit_name: 'editMessage'},
      {title: lang.general.delete, icon_class: 'fa fa-remove', class: 'c-red', emit_name: 'deleteMessage'}]"
      @editMessage="this.$emit('editMessage', this.message)" @deleteMessage="this.deleteMessage"/>

    </div>
  </div>
</template>

<script>
import VUserMiniBlock from "@/components/_general/v-user-mini-block";
import VMenuNormal from "@/components/_general/v-menu-normal";
import {mapState} from "vuex";
import toggleMixin from "@/mixins/toggle-mixin";
import localTimeMixin from "@/mixins/local-time-mixin";
export default {
  name: "v-message-block",
  components: {VMenuNormal, VUserMiniBlock},
  props: ['message', 'partner', 'user', 'room_id', 'index'],
  mixins: [toggleMixin, localTimeMixin],
  computed: mapState({
    profile: state => state.auth.profile,
    lang: state => state.lang.LANG
  }),
  data(){
    return{
      read: false,
      message_body: null
    }
  },
  mounted() {
    this.message_body = this.message
    this.message_body.index = this.index
    this.read = this.message.read

    this.getLocalTime(this.message_body.creation_date)

    if(this.message.creator_id !== this.user.id && !this.read)
      this.onReadMessage()

    this.emitter.on("message_read", (data) => {
      if(data.message_id === this.message.id)
        this.read = true
    })

    this.sockets.subscribe('message_update', (new_message) => {
      if(parseInt(new_message.room_id) === parseInt(this.message.room_id) && this.message.id === new_message.id) {
        this.message_body = new_message
      }
    })

    this.sockets.subscribe('message_delete', (deleted_message) => {
      if(parseInt(deleted_message.room_id) === parseInt(this.message.room_id) && this.message.id === deleted_message.id) {
        this.message_body = false
      }
    })
  },
  methods:{
    onReadMessage(){
      this.$store.dispatch("message/PATCH", this.message.id)
      this.$store.commit("message/DELETE_NOT_READ", this.message)
    },
    deleteMessage(){
      this.emitter.emit('load', true)
      this.$store.dispatch('message/DELETE', this.message.id).then(data => {
        if(data.success)
          this.message_body = null
        else
          this.emitter.emit('message', data)
      }).finally(() => this.emitter.emit('load', false))
    }
  }
}
</script>

<style scoped>
.not_read{
  border: 1px solid rgba(255, 168, 69, 0.35);
}
</style>