<template>
  <v-header/>
  <div class="page m-top-2">
    <router-view></router-view>
  </div>

<!--  MESSAGE MODAL-->
  <v-message-modal v-if="message.value"
                   :message="message.value"
                   :success="message.success"/>

<!--  LOADER-->
  <div class="p-fixed top-0 left-0 w-max h-max d-flex a-items-center j-content-center bg-ccc-opacity" v-if="loader">
    <span class="loader"></span>
  </div>

</template>

<script>

import VHeader from "@/components/_general/v-header";
import VMessageModal from "@/components/_general/v-message-modal";
export default {
  name: 'App',
  components: {
    VMessageModal,
    VHeader,
  },
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
        this.message.value = data.obj.msg
        this.message.success = data.success
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
  methods: {
    get_profile(){
      this.$store.dispatch("auth/GET_PROFILE").then(data => {
        console.log(data.obj)
        if(data.success)
          this.$store.commit("auth/SET_PROFILE", data.obj)
      })
    }
  }
}
</script>

<style src="@/assets/main.css">

</style>
