<template>
  <div class="padding-03 bg-ccc-opacity margin-05">
    <div v-bind:class="!read && message.creator_id !== user.id ? 'not_read padding-1' : 'padding-03'">
      <div>
        <v-user-mini-block :user="message.creator_id === this.partner.id ? this.partner : this.user"/>
      </div>
      <p class="f-size-small margin-1">{{message.text}}</p>

      <div class="c-ccc f-size-small d-flex j-content-flex-end" v-if="message.creator_id === user.id">
        <span v-if="read">прочитано</span>
        <span v-else>не прочитано</span>
      </div>
    </div>
  </div>
</template>

<script>
import VUserMiniBlock from "@/components/_general/v-user-mini-block";
export default {
  name: "v-message-block",
  components: {VUserMiniBlock},
  props: ['message', 'partner', 'user'],
  data(){
    return{
      read: false
    }
  },
  mounted() {
    this.read = this.message.read
    if(this.message.creator_id !== this.user.id && !this.read)
      this.onReadMessage()

    this.emitter.on("message_read", (data) => {
      if(data.message_id === this.message.id)
        this.read = true
    })
  },
  methods:{
    onReadMessage(){
      this.$store.dispatch("message/PATCH", this.message.id)
      this.$store.commit("message/DELETE_NOT_READ", this.message)
    }
  }
}
</script>

<style scoped>
.not_read{
  border: 1px solid rgba(255, 168, 69, 0.35);
}
</style>