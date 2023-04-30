<template>
  <div v-if="profile && profile.id !== vacancy.creator_id">
    <div class="d-grid g-gap-1 a-items-flex-start j-content-space-between" v-if="this.payment_intervals">
        <v-radios-normal :label="lang.general.payment_interval" name="paidType"
                         @value="(item) => {form.payment_interval_id = item.id;price_show=item.price;item.price?null:this.form.price=0}"
                         :active_id="vacancy.payment_interval_id"
                         :radios="this.payment_intervals"
                         v-if="form.payment_interval_id && this.payment_intervals.length > 0"/>

      <v-input-normal :label="lang.vacancies.offer.price.title"
                      :default_value="vacancy.price"
                      @value="value => form.price = parseInt(value)"
                      :placeholder="lang.vacancies.offer.price.placeholder"
                      type="number"
                      class="w-max"
                      v-if="price_show"/>
    </div>

    <v-textarea-normal :label="lang.vacancies.offer.description.title"
                       :span="lang.vacancies.offer.description.description"
                       @value="value => form.description = value"
                       :placeholder="lang.vacancies.offer.description.placeholder"
                       class="m-top-2"/>
  </div>

  <div class="btn_block m-top-1 d-flex g-gap-1 j-content-flex-end">
    <v-button-normal :label="lang.vacancies.offer.send_offer" class="bg-content"
                     @click="setModalName('vacancyOfferCreateAlert')"
                     v-if="profile && profile.id !== vacancy.creator_id"/>
  </div>

<!--  ALERTS-->
  <v-alert-modal :label="lang.vacancies.offer.confirm_create"
                 v-if="modalName === 'vacancyOfferCreateAlert'"
                 @confirm="onVacancyOffer"
                 @close="setModalName(false)"/>
</template>

<script>
import VRadiosNormal from "@/components/_general/v-radios-normal";
import VInputNormal from "@/components/_general/v-input-normal";
import VTextareaNormal from "@/components/_general/v-textarea-normal";
import VButtonNormal from "@/components/_general/v-button-normal";
import {mapState} from "vuex";
import VAlertModal from "@/components/_general/v-alert-modal";
import toggleMixin from "@/mixins/toggle-mixin";
export default {
  name: "v-vacancy-offer-form",
  components: {VAlertModal, VButtonNormal, VTextareaNormal, VInputNormal, VRadiosNormal},
  props: ['vacancy'],
  mixins: [toggleMixin],
  computed: mapState({
    profile: state => state.auth.profile,
    lang: state => state.lang.LANG
  }),
  data(){
    return{
      payment_intervals: [],
      price_show: false,
      form: {
        description: '',
        payment_interval_id: this.vacancy.payment_interval_id,
        price: parseInt(this.vacancy.price),
        vacancy_id: this.vacancy.id,
      }
    }
  },
  mounted() {
    this.emitter.emit("load", true)
    this.$store.dispatch("payment_interval/GET", "").then(data => {
      this.payment_intervals = data.obj
    }).finally(() => this.emitter.emit("load", false))
  },
  methods: {
    onVacancyOffer(){
      this.emitter.emit("load", true)
      this.$store.dispatch("vacancy_offer/CREATE", this.form).then(data => {
        if(data.success)
          this.$emit('vacancy_offer_success')
        else{
          this.emitter.emit("message", data)
          this.setModalName(false)
        }
      }).finally(() => this.emitter.emit("load", false))
    }
  }
}
</script>

<style scoped>

</style>