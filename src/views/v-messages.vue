<template>
  <div :class="`${mobile ? 'messages_mobile' : 'messages'} d-grid g-gap-3`">
    <v-rooms-block class="box-shadow-slim h-max-content" @messager="(room_id, partner)=>setModalName('messagerBlock', room_id, partner)"/>
    <div class="p-relative bg-fff box-shadow-slim">
      <v-messages-block class="bg-fff h-max" v-if="modalName==='messagerBlock'" :user="profile" :partner="this.obj" :room_id="this.id" @close="setModalName('roomBlock')"/>
      <div v-else class="padding-1">
        <i class="c-6d">{{ lang.message.description }}  <router-link to="/users" class="c-content t-decoration-underline">{{ lang.general.users }}</router-link></i>
      </div>
    </div>
  </div>
</template>

<script>
import VRoomsBlock from "@/components/messager/v-rooms-block";
import toggleMixin from "@/mixins/toggle-mixin";
import {mapState} from "vuex";
import VMessagesBlock from "@/components/messager/v-messages-block";
import deviceMixin from "@/mixins/device-mixin";
export default {
  name: "v-messages",
  components: {VMessagesBlock, VRoomsBlock},
  mixins: [toggleMixin, deviceMixin],
  computed: mapState({
    profile: state => state.auth.profile,
    lang: state => state.lang.LANG
  }),
}
</script>

<style scoped>
.messages{
  grid-template-columns: 1fr 2fr;
}
.messages_mobile{
    grid-template-columns: 1fr;
}
.messages_mobile > div:nth-child(2){
    order: 1;
}
.messages_mobile > div:nth-child(1){
    order: 2;
}
</style>