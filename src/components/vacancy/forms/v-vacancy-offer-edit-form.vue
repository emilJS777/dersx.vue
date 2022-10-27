<template>
  <div  class="modal d-flex a-items-center j-content-center">
    <div class="modal-content w-max-content h-max-content d-grid g-gap-2">

      <div class="d-flex g-gap-3 a-items-flex-end j-content-space-between">
        <v-input-normal label="укажите желаемую цену за услугу "
                        v-if="form.price !== null"
                        :default_value="form.price"
                        @value="value => form.price = parseInt(value)"
                        placeholder="мин 500 и макс 500000 рублей"
                        type="number"
                        class="m-top-2 w-max-content"/>

        <v-radios-normal label="оплата за" name="paidType"
                         v-if="form.payment_interval_id !== null"
                         @value="item => form.payment_interval_id = item.id"
                         :active_id="form.payment_interval_id"
                         :radios="payment_intervals"/>

      </div>

      <v-textarea-normal label="опишите предложение"
                         span="не меньше 50 и не более 2500 символов"
                         v-if="form.description !== null"
                         @value="value => form.description = value"
                         :default_value="form.description"
                         placeholder="опишите свои навыки и умения, посторайтесь описать почему заказчик должен выбрать именно вас..."/>

      <div class="btn_block d-flex j-content-flex-end g-gap-1">
        <v-button-normal label="изменить" class="bg-content" @click="setModalName('vacancyOfferEditAlert')"/>
        <v-button-normal label="отменить" @click="this.$emit('close')"/>
      </div>
    </div>
  </div>

  <v-alert-modal label="вы действительно хотите изменить предложение ?"
                 @confirm="onVacancyOfferEdit"
                 @close="setModalName(false)"
                 v-if="modalName === 'vacancyOfferEditAlert'"/>
</template>

<script>
import VRadiosNormal from "@/components/_general/v-radios-normal";
import VInputNormal from "@/components/_general/v-input-normal";
import VTextareaNormal from "@/components/_general/v-textarea-normal";
import VButtonNormal from "@/components/_general/v-button-normal";
import toggleMixin from "@/mixins/toggle-mixin";
import VAlertModal from "@/components/_general/v-alert-modal";
export default {
  name: "v-vacancy-offer-edit-form",
  components: {VAlertModal, VButtonNormal, VTextareaNormal, VInputNormal, VRadiosNormal},
  props: ['vacancy_offer_id'],
  mixins: [toggleMixin],
  data(){
    return{
      payment_intervals: [],
      form: {
        id: null,
        description: null,
        payment_interval_id: null,
        price: null,
        vacancy_id: null,
      }
    }
  },
  mounted() {
    //PAYMENT INTERVALS
    this.emitter.emit('load', true)
    this.$store.dispatch("payment_interval/GET", '').then(data => {
      this.payment_intervals = data.obj
    }).finally(() => this.emitter.emit('load', false))
    //VACANCY OFFER GET BY ID
    this.emitter.emit('load', true)
    this.$store.dispatch("vacancy_offer/GET", `?id=${this.vacancy_offer_id}`).then(data => {
      this.form.description = data.obj.description
      this.form.payment_interval_id = parseInt(data.obj.payment_interval.id)
      this.form.price = parseInt(data.obj.price)
      this.form.id = data.obj.id
      this.form.vacancy_id = parseInt(data.obj.vacancy_id)
    }).finally(() => this.emitter.emit('load', false))
  },
  methods: {
    onVacancyOfferEdit(){
      this.setModalName(false)
      this.emitter.emit('load', true)
      this.$store.dispatch('vacancy_offer/UPDATE', {id: this.form.id, form: this.form}).then(data => {
        if(data.success)
          this.$emit('vacancy_offer_edit_success')
        else
          this.emitter.emit('message', data)
      }).finally(() => this.emitter.emit('load', false))
    }
  }
}
</script>

<style scoped>

</style>