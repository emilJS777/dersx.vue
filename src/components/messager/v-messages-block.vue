<template>
  <div class="messages_block bg-initial animation-from-hidden">
    <div class="d-flex j-content-space-between a-items-center padding-05 p-absolute left-0 top-0 right-0 z-index-max">
      <span class="c-pointer padding-03 c-content-hover" @click="this.$emit('close')">
        <i class="fa fa-long-arrow-left" aria-hidden="true"></i>
      </span>
      <h5 class="m-top-0 m-bottom-0 padding-03 d-grid">
        {{partner.first_name}} {{partner.last_name}}
      </h5>

<!--      SETTING MENU-->
      <div class="c-pointer p-relative">
        <div @click="setModalName(modalName === 'inputText' ? 'messageSettings' : 'inputText')">
          <i class="fa fa-cog" aria-hidden="true"></i>
        </div>

        <ul class="p-absolute right-0 bg-fff padding-05 box-shadow-slim w-max-content" v-if="modalName === 'messageSettings'">
          <li class="d-flex g-gap-1 a-items-center c-red bg-ccc-opacity-hover" @click="setModalName('messagesDeleteAlert', this.room_id, this.partner)">
            <i class="fa fa-ban" aria-hidden="true"></i>
            <span>удалить сообщения</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="m-top-3" id="messages_block">
      <p class="m-top-0 m-bottom-0 t-center f-size-small c-content c-pointer t-decoration-underline-hover" v-if="show_more" @click="()=>{setOffset();this.getMessages()}">показать еще</p>
      <v-message-block  v-for="message in messages" :key="message.id" :message="message" :partner="partner" :user="user"/>
    </div>

    <div class="padding-1 d-flex g-gap-_3">
      <v-input-normal placeholder="ваше сообщния..." @value="value => form.text = value" v-if="modalName === 'inputText'"/>
      <v-button-normal class="bg-content-hover" icon="fa fa-paper-plane" @click="onMessage" v-if="modalName === 'inputText'"/>
    </div>
  </div>


<!--  ALERT-->
  <v-alert-modal v-if="modalName === 'messagesDeleteAlert'"
                 @close="setModalName('inputText')"
                 @confirm="deleteRoom"
                 :label="`вы хотите удалить все сообщения с ${this.obj.first_name} ${this.obj.last_name} ?`"/>
</template>

<script>
import VButtonNormal from "@/components/_general/v-button-normal";
import VInputNormal from "@/components/_general/v-input-normal";
import toggleMixin from "@/mixins/toggle-mixin";
import VMessageBlock from "@/components/messager/v-message-block";
import offsetMixin from "@/mixins/offset-mixin";
import VAlertModal from "@/components/_general/v-alert-modal";
export default {
  name: "v-messages-block",
  components: {VAlertModal, VMessageBlock, VInputNormal, VButtonNormal},
  props: ['user', 'partner', 'room_id'],
  mixins: [toggleMixin, offsetMixin],
  data(){
    return{
      messages: [],
      show_more: false,
      form:{
        text: '',
        room_id: this.room_id,
        user_id: parseInt(this.partner.id)
      }
    }
  },
  created() {
    this.sockets.subscribe('message', (message) => {
      if(message.room_id === this.room_id) {
        this.messages.push(message)
        setTimeout(() => this.onBottomScroll(), 50)
      }
    })
  },
  mounted() {
    this.setModalName('inputText')
    this.getMessages(true)
  },
  methods:{
    onMessage(){
      this.$store.dispatch("message/CREATE", this.form).then(data=>{
        if(data.success)
          this.messages.push(data.obj)
      }).finally(() => {
        this.setModalName('inputText')
        this.onBottomScroll()
      })
    },
    deleteRoom(){
      this.emitter.emit('loader', true)
      this.$store.dispatch("room/DELETE", `?user_id=${this.obj.id}`).then(data => {
        this.emitter.emit('message', data)
      }).finally(() => this.emitter.emit('load', false))
    },
    getMessages(on_bottom){
      this.$store.dispatch("message/GET", `?limit=${this.limit}&offset=${this.offset}&room_id=${this.room_id}`).then(data => {
        data.obj.map(message => {
          this.messages.unshift(message)
        })
        if(this.messages.length < this.limit)
          this.show_more = false
        else
          this.show_more = true

      }).finally(() => {
        if(on_bottom)
          this.onBottomScroll()
      })
    },
    onBottomScroll(){
      let messages_block = document.getElementById('messages_block')
      messages_block.scrollTo(0, document.getElementById('messages_block').scrollHeight);
    }
  }
}
</script>

<style scoped>
#messages_block{
  height: 550px;
  overflow-y: scroll;
}

</style>