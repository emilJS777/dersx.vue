<template>
  <div  class=" a-items-center j-content-center">
    <div class="padding-1 h-max-content d-grid g-gap-2">

      <div class="d-grid g-gap-1 a-items-flex-start j-content-space-between">
<!--          <v-radios-normal :label="lang.general.payment_interval" name="paidType"-->
<!--                           v-if="form.payment_interval_id !== null && this.payment_intervals.length > 0"-->
<!--                           @value="(item) => {form.payment_interval_id = item.id;this.price_show=item.price;item.price?null:this.form.price=0}"-->
<!--                           :active_id="form.payment_interval_id"-->
<!--                           :radios="payment_intervals"/>-->

<!--        <v-input-normal :label="lang.vacancies.offer.price.title"-->
<!--                        v-if="form.price !== null && this.price_show"-->
<!--                        :default_value="form.price"-->
<!--                        @value="value => form.price = parseInt(value)"-->
<!--                        :placeholder="lang.vacancies.offer.price.placeholder"-->
<!--                        type="number"-->
<!--                        class="w-max"/>-->
      </div>

      <v-textarea-normal :label="lang.vacancies.offer.description.title"
                         :span="lang.vacancies.offer.description.description"
                         v-if="form.description !== null"
                         @value="value => form.description = value"
                         :default_value="form.description"
                         :placeholder="lang.vacancies.offer.description.placeholder"/>

      <div class="btn_block d-flex j-content-flex-end g-gap-1">
        <v-button-normal :label="lang.general.update" class="bg-content" @click="setModalName('vacancyOfferEditAlert')"/>
        <v-button-normal :label="lang.general.cancel" @click="this.$emit('close')"/>
      </div>
    </div>
  </div>

  <v-alert-modal :label="lang.vacancies.offer.confirm_update"
                 @confirm="onVacancyOfferEdit"
                 @close="setModalName(false)"
                 v-if="modalName === 'vacancyOfferEditAlert'"/>
</template>

<script>
import VTextareaNormal from "@/components/_general/v-textarea-normal";
import VButtonNormal from "@/components/_general/v-button-normal";
import toggleMixin from "@/mixins/toggle-mixin";
import VAlertModal from "@/components/_general/v-alert-modal";
import {mapState} from "vuex";
export default {
  name: "v-vacancy-offer-edit-form",
  components: {VAlertModal, VButtonNormal, VTextareaNormal},
  props: ['vacancy_offer_id'],
  mixins: [toggleMixin],
  computed: mapState({
    lang: state => state.lang.LANG
  }),
  data(){
    return{
      payment_intervals: [],
      price_show: false,
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