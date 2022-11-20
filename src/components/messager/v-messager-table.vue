<template>
  <div class="messager-table d-grid bg-fff h-max">
    <div class="table">
      <div class="message_block m-top-1 bg-ccc-opacity padding-1" v-for="message in messages" :key="message.id">
        <v-user-mini-block :user="message.creator_id === room.user.id ? room.user : profile"/>
        <p class="padding-left-1 padding-right-1 m-top-1 m-bottom-0">{{message.text}}</p>
        <span class="f-size-very-small padding-left-2 m-left-1">{{message.creation_date}}</span>
      </div>
      <p v-if="!messages.length" class="m-top-0 t-center c-ccc f-weight-bold">сообщений пока нет</p>
    </div>

    <div class="form d-flex g-gap-_5 a-items-center j-content-space-evenly a-items-flex-end padding-1">
      <v-input-normal placeholder="ваше сообщения..." @value="value => form.text = value"/>
      <v-button-normal icon="fa fa-paper-plane" class="bg-content-hover c-555" @click="onMessage"/>
    </div>
  </div>
</template>

<script>
import VInputNormal from "@/components/_general/v-input-normal";
import VButtonNormal from "@/components/_general/v-button-normal";
import {mapState} from "vuex";
import VUserMiniBlock from "@/components/_general/v-user-mini-block";
export default {
  name: "v-messager-table",
  components: {VUserMiniBlock, VButtonNormal, VInputNormal},
  props: ['room'],
  computed: mapState({
    profile: state => state.auth.profile
  }),
  data(){
    return{
      messages: [],
      form:{
        text: '',
        room_id: null
      }
    }
  },
  mounted() {
    this.form.room_id = this.room.id
    console.log(this.room)
    this.get_messages()
  },
  methods: {
    get_messages(){
      this.emitter.emit('load', true)
      this.$store.dispatch("message/GET", `?limit=${8}&offset=${0}&room_id=${this.room.id}`).then(data => {
        this.messages = data.obj.reverse()
      }).finally(() => this.emitter.emit('load', false))
    },
    onMessage(){
      this.emitter.emit('load', true)
      this.$store.dispatch("message/CREATE", this.form).then(data => {
        if(data.success)
          this.$emit('refreshModal')
        else
          this.emitter.emit('message', data)
      }).finally(() => this.emitter.emit('load', false))
    }
  }
}
</script>

<style scoped>
.table{
  max-height: 600px;
  overflow-y: auto;
}
</style>