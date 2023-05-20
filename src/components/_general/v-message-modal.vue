<template>
  <div class="modal d-flex a-items-center j-content-center"  @click="close">
    <div class="modal-content w-max-content h-max-content">
      <i v-html="message" class=""></i>

      <div class="m-top-1 d-flex j-content-center">
        <v-button-normal :label="lang.general.ok"/>
      </div>
    </div>
  </div>
</template>

<script>
import VButtonNormal from "@/components/_general/v-button-normal";
import {mapState} from "vuex";
export default {
  name: "v-message-modal",
  props: ['message', 'success'],
  components: {VButtonNormal},
  computed: mapState({
    lang: state => state.lang.LANG
  }),
  methods: {
    close(){
      if(this.success)
        location.reload()
      else
        this.emitter.emit("message", false);
    }
  }
}
</script>

<style scoped>
.modal{
  z-index: 999;
}
</style>