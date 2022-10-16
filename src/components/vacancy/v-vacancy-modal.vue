<template>
  <div class="modal d-flex j-content-center">
    <div class="modal-content animation-from-hidden">
      <h2>Vacancy title</h2>

      <div class="description">
        <p>
          lorem ipsum dolor ametlorem ipsum dolor ametlorem ipsum dolor ametlorem ipsum dolor ametlorem ipsum dolor amet
          lorem ipsum dolor ametlorem ipsum dolor ametlorem ipsum dolor ametlorem ipsum dolor ametlorem ipsum dolor amet
          lorem ipsum dolor ametlorem ipsum dolor ametlorem ipsum dolor ametlorem ipsum dolor ametlorem ipsum dolor
          lorem ipsum dolor ametlorem ipsum dolor amet
          lorem ipsum dolor ametlorem ipsum dolor ametlorem ipsum dolor ametlorem ipsum dolor amet
          lorem ipsum dolor amet
          lorem ipsum dolor ametlorem ipsum dolor amet
        </p>
      </div>

      <div class="d-flex g-gap-1 a-items-flex-end j-content-space-between">
        <v-input-normal label="укажите желаемую цену за услугу " placeholder="мин 500 и макс 500000 рублей" type="number" class="m-top-2 w-max-content"/>
        <v-radios-normal label="оплата за" name="paidType" :radios="[{id: 1, title: 'проект'}, {id: 2, title: 'час'}, {id: 3, title: 'месяц'}]"/>
      </div>
      <v-textarea-normal label="опишите предложение" placeholder="опишите свои навыки и умения, посторайтесь описать почему заказчик должен выбрать именно вас..." class="m-top-2"/>

      <div class="btn_block m-top-1 d-flex g-gap-1 j-content-flex-end">
        <v-button-normal label="подтвердит" class="bg-content"/>
        <v-button-normal label="закрыть" @click="this.$emit('close')"/>
      </div>
    </div>
  </div>
</template>

<script>
import VButtonNormal from "@/components/_general/v-button-normal";
import VTextareaNormal from "@/components/_general/v-textarea-normal";
import VInputNormal from "@/components/_general/v-input-normal";
import VRadiosNormal from "@/components/_general/v-radios-normal";
export default {
  name: "v-vacancy-modal",
  components: {VRadiosNormal, VInputNormal, VTextareaNormal, VButtonNormal}
}
</script>

<style scoped>
  .modal-content{
    width: 50% !important;
  }
</style>