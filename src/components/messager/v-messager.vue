<template>
  <div class="messager p-fixed d-grid w-max-content bg-fff">
    <div class="padding-03 box-shadow-slim messager_block" v-if="modalName==='roomBlock' || modalName==='messagerBlock'">
      <v-rooms-block class="bg-fff h-max" v-if="modalName==='roomBlock'" @messager="(room_id, partner)=>{setModalName('messagerBlock', room_id, partner)}"/>
      <v-messages-block class="bg-fff h-max" v-if="modalName==='messagerBlock'" :user="profile" :partner="this.obj" :room_id="this.id" @close="setModalName('roomBlock')"/>
    </div>

    <div class="messager_toggle_block w-max-content h-max-content p-absolute" id="messages_block">
      <div class="b-radius-50 padding-1 d-flex j-content-center a-items-center c-pointer bg-content box-shadow-slim animation-from-hidden"
           @click="setModalName('roomBlock')" v-if="!modalName">

        <i class="fa fa-envelope fa-2x" aria-hidden="true"></i>
        <span class="p-absolute f-size-small padding-03 right-0 top-0 d-flex j-content-center a-items-center b-radius-50 bg-red message_indicator" v-if="new_messages.length">
          {{this.new_messages.length}}
        </span>
      </div>

      <div class="c-content-hover b-radius-50 c-pointer box-shadow-slim animation-from-hidden w-max-content d-flex j-content-flex-end"
           @click="setModalName(false)" v-else>
        <i class="fa fa-times-circle fa-2x" aria-hidden="true"></i>
      </div>
    </div>
  </div>
  <audio v-if="sound"  autoplay><source src="@/assets/song/bolb.aac" type="audio/aac" /></audio>
</template>

<script>
import VRoomsBlock from "@/components/messager/v-rooms-block";
import toggleMixin from "@/mixins/toggle-mixin";
import {mapState} from "vuex";
import VMessagesBlock from "@/components/messager/v-messages-block";
export default {
  name: "v-messager",
  components: {VMessagesBlock, VRoomsBlock},
  mixins: [toggleMixin],
  computed: mapState({
    profile: state => state.auth.profile,
    new_messages: state => state.message.NOT_READ_LIST
  }),
  data(){
    return{
      sound: false
    }
  },
  mounted() {
    this.$store.dispatch("message/GET", ``).then(data => {
      this.set_not_read_messages_list(data.obj)
    })

  },
  created() {
    this.sockets.subscribe('message', (data) => {
      this.set_not_read_messages_list([data])
      this.sound = true

      setTimeout(() => {
        this.sound = false
      }, 300)
    });

    this.emitter.on('openMessage', user => {
      this.$store.dispatch("room/GET", `?user_id=${user.id}`).then(data => {
        if(data.success)
          this.setModalName('messagerBlock', data.obj.id, user)
        else
          this.emitter.emit('message', data)
      })
    })
  },
  methods:{
    set_not_read_messages_list(messages){
      this.$store.commit("message/SET_NOT_READ", messages)
    },
  }
}
</script>

<style scoped>
.message_indicator{
  height: 15px;
  width: 15px;
}
.messager_block{
  width: 300px;
  border-radius: 8px;
}

.messager{
  bottom: 35px;
  right: 55px;
  z-index: 2;
}
.messager_toggle_block{
  bottom: -18px;
  right: -18px;
}
</style>