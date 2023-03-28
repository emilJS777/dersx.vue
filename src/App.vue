<template>
  <v-header/>
  
  <div class="page m-top-2">
    <router-view></router-view>
    <v-messager v-if="profile"/>
  </div>
<!--  MESSAGE MODAL-->
  <v-message-modal v-if="message.value"
                   class="z-index-max"
                   :message="message.value"
                   :success="message.success"/>

<!--  LOADER-->
  <div class="p-fixed top-0 left-0 w-max h-max d-flex a-items-center j-content-center bg-ccc-opacity z-index-max" v-if="loader">
    <span class="loader"></span>
  </div>
</template>

<script>

import VHeader from "@/components/_general/v-header";
import VMessageModal from "@/components/_general/v-message-modal";
import {mapState} from "vuex";
import VMessager from "@/components/messager/v-messager";
export default {
  name: 'App',
  components: {
    VMessager,
    VMessageModal,
    VHeader,
  },
  computed: mapState({
    profile: state => state.auth.profile
  }),
  data(){
    return{
      message: {
        value: null,
        success: true,
      },
      loader: false
    }
  },
  mounted(){
    // MESSAGE MODAL
    this.emitter.on("message", (data) => {
      if(data){
        this.message.value = data.obj ? data.obj.msg : null
        this.message.success = data.success ? data.success : null
        this.message.data = data
      }
      else{
        this.message.value = null
        this.message.success = null
      }
    });

    // PAGE LOADER
    this.emitter.on('load', bool => {
      this.loader = bool
    })

    this.get_profile()
  },
  created() {
    // WEBSOCKET EMIT
    this.sockets.subscribe('message_read', (data) => {
      this.emitter.emit('message_read', data)
    })
  },
  methods: {
    get_profile(){
      this.$store.dispatch("auth/GET_PROFILE").then(data => {
        if(data.success)
          this.$store.commit("auth/SET_PROFILE", data.obj)
      })
    }
  }
}
</script>

<style src="@/assets/main.css">

</style>
