<template>
  <div class="modal d-flex a-items-center j-content-center">
    <div class="modal-content w-max-content h-max-content">
      <i>{{ label }}</i>

      <div class="m-top-1 d-flex j-content-center g-gap-1">
        <v-button-normal label="подтвердить" @click="this.$emit('confirm')" class="bg-content"/>
        <v-button-normal label="отменить"  @click="this.$emit('close')"/>
      </div>
    </div>
  </div>
</template>

<script>
import VButtonNormal from "@/components/_general/v-button-normal";
export default {
  name: "v-alert-modal",
  components: {VButtonNormal},
  props: ['label']
}
</script>

<style scoped>

</style>