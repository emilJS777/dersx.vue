<template>
  <div v-if="profile && profile.id !== vacancy.creator_id">
    <div class="d-flex g-gap-1 a-items-flex-end j-content-space-between">
      <v-input-normal label="укажите желаемую цену за услугу "
                      :default_value="vacancy.price"
                      @value="value => form.price = parseInt(value)"
                      placeholder="мин 500 и макс 500000 рублей"
                      type="number"
                      class="m-top-2 w-max-content"/>

      <v-radios-normal label="оплата за" name="paidType"
                       @value="item => form.payment_interval_id = item.id"
                       :active_id="vacancy.payment_interval_id"
                       :radios="this.payment_intervals"/>
    </div>

    <v-textarea-normal label="опишите предложение"
                       span="не меньше 50 и не более 2500 символов"
                       @value="value => form.description = value"
                       placeholder="опишите свои навыки и умения, посторайтесь описать почему заказчик должен выбрать именно вас..."
                       class="m-top-2"/>
  </div>

  <div class="btn_block m-top-1 d-flex g-gap-1 j-content-flex-end">
    <v-button-normal label="предложить" class="bg-content"
                     @click="setModalName('vacancyOfferCreateAlert')"
                     v-if="profile && profile.id !== vacancy.creator_id"/>
  </div>

<!--  ALERTS-->
  <v-alert-modal label="вы хотите опубликовать предложение ?"
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
    profile: state => state.auth.profile
  }),
  data(){
    return{
      payment_intervals: [],
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