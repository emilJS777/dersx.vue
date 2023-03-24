<template>
  <div class="rooms_block o-hidden animation-from-hidden bg-fff">
   <h4 class="m-top-0 m-bottom-0 padding-1 c-6d l-height-0">контакты</h4>

    <div class="list">
      <div v-for="room in this.rooms" :key="room.id" class="user_block h-max-content padding-1 bg-ccc-opacity-hover c-pointer d-flex g-gap-1"
           @click="this.$emit('messager', room.id, room.user)">
        <div>
          <v-user-mini-block :user="room.user" class=""/>
        </div>

        <i class="bg-content f-size-small c-fff w-max-content h-max-content b-radius-50 m-top-05 count d-flex j-content-center a-items-center f-weight-bold"
           v-if="this.new_messages.find(message => message.room_id === room.id)">
          {{this.new_messages.filter(message => message.room_id === room.id).length}}
        </i>
      </div>
    </div>
  </div>

</template>

<script>
import VUserMiniBlock from "@/components/_general/v-user-mini-block";
import {mapState} from "vuex";
import toggleMixin from "@/mixins/toggle-mixin";
export default {
  name: "v-rooms-block",
  components: {VUserMiniBlock},
  mixins: [toggleMixin],
  computed: mapState({
    profile: state => state.auth.profile,
    new_messages: state => state.message.NOT_READ_LIST,
    rooms: state => state.room.ROOMS,
  }),
  data(){
    return{
      rooms_signals: []
    }
  },
  mounted() {
    this.get_rooms()
    if(this.$route.params.userId){
      this.get_room(this.$route.params.userId)
    }
    else if (!this.$route.params.userId && this.new_messages.length && this.rooms.length){
      this.rooms.map(room => {
        if(room.id === this.new_messages[0].room_id) {
          this.$emit('messager', room.id, room.user)
        }
      })
    }
  },
  methods:{
    get_rooms(){
      this.emitter.emit('load', true)
      this.$store.dispatch("room/GET", `?limit=5&offset=0&search=`).then(data => {
        this.$store.commit("room/SET_ROOMS", data.obj)
      }).finally(() => this.emitter.emit('load', false))
    },
    get_room(user_id){
      this.emitter.emit('load', true)
      this.$store.dispatch("room/GET", `?user_id=${user_id}`).then(data => {
        this.$emit('messager', data.obj.id, data.obj.user)
        this.$store.commit("room/SET_ONE", data.obj)
      }).finally(() => this.emitter.emit('load', false))
    }
  }
}
</script>

<style scoped>
.list{
  height: 350px;
}
.user_block{
  grid-template-columns: 5fr 1fr .5fr;
}
.count{
  width: 20px;
  height: 20px;
  line-height: .6;
}
</style>