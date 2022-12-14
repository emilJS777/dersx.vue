<template>
  <div class="rooms_block o-hidden animation-from-hidden bg-fff">
   <h4 class="m-top-0 m-bottom-0 padding-1 l-height-0">сообщения</h4>

    <div class="list">
      <div v-for="room in rooms" :key="room.id" class="user_block h-max-content padding-1 bg-ccc-opacity-hover c-pointer d-grid j-content-space-between">
        <div @click="this.$emit('messager', room.id, room.user)">
          <v-user-mini-block :user="room.user" class=""/>
        </div>

        <i class="bg-content f-size-small c-fff w-max-content h-max-content b-radius-50 m-top-05 count d-flex j-content-center a-items-center f-weight-bold"
           v-if="this.new_messages.find(message => message.room_id === room.id)">
          {{this.new_messages.filter(message => message.room_id === room.id).length}}
        </i>

        <div class="menu_block d-flex g-gap-_5 j-content-flex-end a-items-flex-start">
          <span class="c-ccc c-content-hover f-size-small" title="скрыть" @click="setModalName('roomHiddenAlert', room.id, room.user)">
            <i class="fa fa-eye-slash" aria-hidden="true"></i>
          </span>
          <span class="c-ccc c-content-hover f-size-small" title="удалить" @click="setModalName('roomDeleteAlert', room.id, room.user)">
            <i class="fa fa-trash" aria-hidden="true"></i>
          </span>
        </div>
      </div>
    </div>
  </div>

<!--  ALERT-->
  <v-alert-modal :label="`вы хотите скрыть пользователя ${this.obj.first_name} ${this.obj.last_name} ?`"
                 @close="setModalName(false)"
                 @confirm="hiddenRoom"
                 v-if="modalName === 'roomHiddenAlert'"/>

  <v-alert-modal :label="`вы хотите удалить все сообщения с  ${this.obj.first_name} ${this.obj.last_name} ?`"
                 @close="setModalName(false)"
                 @confirm="deleteRoom"
                 v-if="modalName === 'roomDeleteAlert'"/>
</template>

<script>
import VUserMiniBlock from "@/components/_general/v-user-mini-block";
import {mapState} from "vuex";
import VAlertModal from "@/components/_general/v-alert-modal";
import toggleMixin from "@/mixins/toggle-mixin";
export default {
  name: "v-rooms-block",
  components: {VAlertModal, VUserMiniBlock},
  mixins: [toggleMixin],
  computed: mapState({
    profile: state => state.auth.profile,
    new_messages: state => state.message.NOT_READ_LIST
  }),
  data(){
    return{
      rooms: [],
      rooms_signals: []
    }
  },
  mounted() {
    this.get_rooms()
    this.new_messages.forEach(mess => {
      console.log(mess)
    })
  },
  methods:{
    get_rooms(){
      this.$store.dispatch("room/GET", `?limit=5&offset=0&search=`).then(data => {
        this.rooms = data.obj
      })
    },
    deleteRoom(){
      this.emitter.emit('loader', true)
      this.$store.dispatch("room/DELETE", `?user_id=${this.obj.id}`).then(data => {
        this.emitter.emit('message', data)
      }).finally(() => this.emitter.emit('load', false))
    },
    hiddenRoom(){

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