<template>
  <div class="modal d-flex a-items-center j-content-center">
    <div class="modal-content w-max-content h-max-content">
      <i>{{ label }}</i>

      <div class="m-top-1 d-flex j-content-center g-gap-1">
        <v-button-normal :label="lang.general.confirm" @click="this.$emit('confirm')" class="bg-content"/>
        <v-button-normal :label="lang.general.cancel"  @click="this.$emit('close')"/>
      </div>
    </div>
  </div>
</template>

<script>
import VButtonNormal from "@/components/_general/v-button-normal";
import {mapState} from "vuex";
export default {
  name: "v-alert-modal",
  components: {VButtonNormal},
  props: ['label'],
    computed: mapState({
        lang: state => state.lang.LANG
    }),
}
</script>

<style scoped>

</style>