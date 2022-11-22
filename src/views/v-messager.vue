<template>
  <div class="messager d-grid g-gap-3">

<!--    LEFT BLOCK-->
    <div class="bg-fff h-max-content padding-1 box-shadow-slim">
      <div class="d-flex g-gap-_3 a-items-flex-end">
        <v-input-normal placeholder="поиск..." span="найти по имени пользователя " @value="value => this.search = value"/>
        <v-button-normal icon="fa fa-search c-555" class="" @click="getRooms"/>
      </div>

<!--        CONTACTS-->
      <div class="m-top-2 w-max">
        <h4 class="m-bottom-0 c-555 m-left-05">мои контакты</h4>
        <p class="c-ccc f-size-small m-top-0 m-left-05" v-if="!rooms.length">раздел пуст </p>

        <div class="bg-ccc-opacity-hover w-max padding-05 c-pointer" v-for="room in rooms" :key="room.id" @click="()=>{setModalName('messagerTableBlock', room.id);active_room=room}">
          <v-user-mini-block :user="room.user"/>
        </div>

        <span class=" c-pointer c-content f-size-small bg-content-hover padding-left-1 padding-right-1 b-radius-8">показать еще</span>
      </div>


    </div>

<!--    RIGHT BLOCK-->
    <div class="bg-fff padding-1 h-max-content">
      <v-messager-table :room="active_room" v-if="this.modalName === 'messagerTableBlock'" @refreshModal="this.setModalName('messagerTableBlock')"/>

            <!--      FRIENDS-->
            <div class="w-max d-flex g-gap-1 j-content-center a-items-center c-content-hover" v-else>
              <router-link to="/users" class="t-decoration-underline">найдите себе контакты </router-link>
              <i class="fas fa-search fa-2x"></i>
            </div>
    </div>
  </div>
</template>

<script>
import VInputNormal from "@/components/_general/v-input-normal";
import VButtonNormal from "@/components/_general/v-button-normal";
import VUserMiniBlock from "@/components/_general/v-user-mini-block";
import {mapState} from "vuex";
import VMessagerTable from "@/components/messager/v-messager-table";
import toggleMixin from "@/mixins/toggle-mixin";
export default {
  name: "v-messager",
  components: {VMessagerTable, VUserMiniBlock, VButtonNormal, VInputNormal},
  mixins: [toggleMixin],
  data(){
    return{
      search: '',
      rooms: [],
      active_room: null
    }
  },
  computed: mapState({
    profile: state => state.auth.profile
  }),
  mounted() {
    this.getRooms()
  },
  methods: {
    getRooms(){
      this.emitter.emit('load', true)
      this.$store.dispatch("room/GET", `?limit=${8}&offset=${0}&search=${this.search}`).then(data => {
        this.rooms = data.obj
      }).finally(() => {
        this.emitter.emit('load', false)
        if(this.$route.query.user_id && !this.rooms.find(room => room.user.id === parseInt(this.$route.query.user_id))) {
          this.getRoom(this.$route.query.user_id)
        }
      })
    },
    getRoom(user_id){
      this.emitter.emit('load', true)
      this.$store.dispatch("room/GET", `?user_id=${user_id}`).then(data => {
        this.rooms.push(data.obj)
        return data.obj
      }).finally(() => this.emitter.emit('load', false))
    },
  }
}
</script>

<style scoped>
.messager{
  grid-template-columns: 1fr 2fr;
}
</style>