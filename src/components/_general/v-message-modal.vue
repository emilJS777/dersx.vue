<template>
  <div class="modal d-flex a-items-center j-content-center"  @click="close">
    <div class="modal-content w-max-content h-max-content">
      <i>{{ message }}</i>

      <div class="m-top-1 d-flex j-content-center">
        <v-button-normal label="хорошо"/>
      </div>
    </div>
  </div>
</template>

<script>
import VButtonNormal from "@/components/_general/v-button-normal";
export default {
  name: "v-message-modal",
  props: ['message', 'success'],
  components: {VButtonNormal},
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

</style>