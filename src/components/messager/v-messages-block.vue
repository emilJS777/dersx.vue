<template>
  <div class="messages_block padding-03 animation-from-hidden">
    <div class="d-flex j-content-space-between a-items-center padding-1 p-absolute left-0 top-0 right-0">
      <span class="c-pointer padding-03 c-content-hover" @click="this.$emit('close')">
        <i class="fa fa-long-arrow-left" aria-hidden="true"></i>
      </span>
      <h4 class="m-top-0 c-6d m-bottom-0 padding-03 d-grid">
        {{partner.first_name}} {{partner.last_name}}
      </h4>

<!--      SETTING MENU-->
      <div class="c-pointer p-relative">
        <div @click="setModalName(modalName === 'inputText' ? 'messageSettings' : 'inputText')">
          <i class="fa fa-cog" aria-hidden="true"></i>
        </div>

        <ul class="p-absolute right-0 bg-fff padding-05 box-shadow-slim w-max-content z-index-max" v-if="modalName === 'messageSettings'">
          <li class="d-flex g-gap-1 a-items-center c-red bg-ccc-opacity-hover" @click="setModalName('messagesDeleteAlert', this.room_id, this.partner)">
            <i class="fa fa-ban" aria-hidden="true"></i>
            <span>{{ lang.message.delete_messages }}</span>
          </li>
        </ul>
      </div>
    </div>

    <div :class="`${mobile ? 'messages-block-mobile' : 'messages-block'} m-top-3`" id="messages_block">
      <p class="m-top-0 m-top-1 m-bottom-0 t-center f-size-small c-content c-pointer t-decoration-underline-hover" v-if="show_more" @click="()=>{setOffset();this.getMessages()}">{{ lang.message.show_more }}</p>
      <v-message-block  v-for="(message, index) in messages" :key="message.id" :index="index" :message="message" :partner="partner" :room_id="this.room_id" :user="user" @editMessage="body => {this.editForm = body; this.editForm.old_text = body.text}"/>
    </div>


    <div class="padding-1 padding-top-2 d-grid a-items-flex-end g-gap-_3 a-items-center  input_form p-relative" v-if="modalName === 'inputText'">
      <span class="c-content c-pointer d-flex a-items-center padding-03 p-absolute t-decoration-underline-hover m-left-2 top-0 f-size-small w-max-content h-max-content" @click="close_edit" v-if="modalName === 'inputText' && this.editForm"><i class="fa fa-close m-right-05"></i> {{ lang.general.cancel }}</span>
      <v-input-emoji  placeholder="редактировать сообщния..." :default_value="editForm.text" @value="value => editForm.text = value" v-if="modalName === 'inputText' && this.editForm"/>
      <v-button-normal class="bg-content-hover" icon="fa fa-paper-plane" @click="updateMessage" v-if="modalName === 'inputText' && this.editForm"/>
      <!--      <v-input-normal placeholder="ваше сообщния..." @value="value => form.text = value" v-if="modalName === 'inputText'"/>-->
      <v-input-emoji  :placeholder="lang.message.placeholder" @value="value => form.text = value" v-if="modalName === 'inputText' && !this.editForm"/>
      <v-button-normal class="bg-content-hover" icon="fa fa-paper-plane" @click="onMessage" v-if="modalName === 'inputText' && !this.editForm"/>
    </div>
  </div>


<!--  ALERT-->
  <v-alert-modal v-if="modalName === 'messagesDeleteAlert'"
                 @close="setModalName('inputText')"
                 @confirm="deleteRoom"
                 :label="lang.message.confirm_delete"/>
</template>

<script>
import VButtonNormal from "@/components/_general/v-button-normal";
// import VInputNormal from "@/components/_general/v-input-normal";
import toggleMixin from "@/mixins/toggle-mixin";
import VMessageBlock from "@/components/messager/v-message-block";
import offsetMixin from "@/mixins/offset-mixin";
import VAlertModal from "@/components/_general/v-alert-modal";
import VInputEmoji from "@/components/_general/v-input-emoji.vue";
import {mapState} from "vuex";
import validateMixin from "@/mixins/validate-mixin";
import validator from "@/validations/message.json"
import deviceMixin from "@/mixins/device-mixin";
export default {
  name: "v-messages-block",
  components: {VInputEmoji, VAlertModal, VMessageBlock, VButtonNormal},
  props: ['user', 'partner', 'room_id'],
  mixins: [toggleMixin, offsetMixin, validateMixin, deviceMixin],
  computed: mapState({
     lang: state => state.lang.LANG
  }),
  data(){
    return{
      messages: [],
      show_more: false,
      form:{
        text: '',
        room_id: this.room_id,
        user_id: parseInt(this.partner.id),
      },
      editForm: null
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
    close_edit(){
        this.messages[this.editForm.index].text = this.editForm.old_text
        this.editForm = null
    },
    updateMessage(){
      if(this.checkValid(this.form, validator, false)){
          this.emitter.emit('load', true)
          this.$store.dispatch("message/UPDATE", {id: this.editForm.id, form: this.editForm}).then(data => {
              if(data.success) {
                  this.editForm.edited = true
                  this.messages[this.editForm.index] = this.editForm
                  this.editForm = null
                  this.setModalName('inputText')
              }
              else
                  this.emitter.emit('message', data)
          }).finally(() => this.emitter.emit('load', false))
      }
    },
    onMessage(){
        if(this.checkValid(this.form, validator, false)){
            this.$store.dispatch("message/CREATE", this.form).then(data=>{
                this.form.text = ''
                if(data.success) {
                    this.$store.commit("room/SET_FIRS", {id: this.room_id})
                    this.messages.push(data.obj)
                }
            }).finally(() => {
                this.setModalName('inputText')
                this.onBottomScroll()
            })
        }
    },
    deleteRoom(){
      this.emitter.emit('loader', true)
      this.$store.dispatch("room/DELETE", `?user_id=${this.obj.id}`).then(data => {
        this.emitter.emit('message', data)
      }).finally(() => this.emitter.emit('load', false))
    },
    getMessages(on_bottom){
      this.emitter.emit('load', true)
      this.$store.dispatch("message/GET", `?limit=${this.limit}&offset=${this.offset}&room_id=${this.room_id}`).then(data => {
        data.obj.map(message => {
          this.messages.unshift(message)
        })
        if(this.messages.length < this.limit)
          this.show_more = false
        else
          this.show_more = true

      }).finally(() => {
        this.emitter.emit('load', false)
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
.messages-block{
  height: 550px;
  overflow-y: scroll;
}
.messages-block-mobile{
    height: 350px;
    overflow-y: scroll;
}
.input_form{
  grid-template-columns: 2fr .1fr;
}
.file_block img{
    max-width: 100px;
    max-height: 100px;
}
</style>