<template>
  <div class="d-flex j-content-center box-shadow-slim">
    <div class="bg-fff w-max padding-1 animation-from-hidden">
      <h2 class="m-top-0 d-flex j-content-space-between">{{ lang.vacancies.create.title}}<span class="f-size-small c-pointer c-content-hover t-decoration-underline-hover" @click="$router.go(-1)">&#9664; {{ lang.general.back }}</span></h2>
      <v-input-normal :label="lang.vacancies.create.form.title.title"
                      :span="lang.vacancies.create.form.title.description"
                      @value="value => form.title = value"/>

      <v-input-normal :label="lang.vacancies.create.form.short_description.title"
                      :span="lang.vacancies.create.form.short_description.description"
                      class="m-top-2"
                      @value="value => form.short_description = value"/>

      <v-textarea-normal :label="lang.vacancies.create.form.long_description.title"
                         :span="lang.vacancies.create.form.long_description.description"
                         class="m-top-2"
                         @value="value => form.long_description = value"/>

      <v-select-normal :label="lang.general.rubric" :span="lang.vacancies.create.form.rubric.description" class="m-top-1"
                       :items="rubrics"
                       :selected="rubrics[0]"
                       v-if="rubrics.length"
                       @select="item => {form.rubric_id = item.id; categoriesGet(item.id)}"/>

      <div class="categories d-flex a-items-center g-gap-1 m-top-1">
        <v-checkboxes-normal :label="lang.vacancies.create.form.category.title"
                             :span="lang.vacancies.create.form.category.description"
                             :checkboxes="categories"
                             @select="select_ids => form.category_ids = select_ids"
                             v-if="categories.length"/>
      </div>


      <div class="d-grid m-top-1 g-gap-1 a-items-flex-start w-max-content" v-if="payment_intervals.length">
          <v-radios-normal name="paidInterval"
                           span=""
                           :label="lang.general.payment_interval"
                           :active_id="payment_intervals[0].id"
                           @value="(item) => {form.payment_interval_id = item.id;price_show=item.price;item.price?null:this.form.price=0}"
                           :radios="payment_intervals"/>

        <v-input-normal type="number" class="w-max" :label="lang.vacancies.create.form.price.title" :span="lang.vacancies.create.form.price.description"
                        @value="value => form.price = parseInt(value)" v-if="price_show"/>
      </div>


      <div class="d-flex g-gap-1 m-top-2 j-content-flex-end">
        <v-button-normal :label="lang.general.create" class="bg-content" @click="onVacancy"/>
      </div>
    </div>
  </div>
</template>

<script>
import VTextareaNormal from "@/components/_general/v-textarea-normal";
import VInputNormal from "@/components/_general/v-input-normal";
import VRadiosNormal from "@/components/_general/v-radios-normal";
import VButtonNormal from "@/components/_general/v-button-normal";
import VSelectNormal from "@/components/_general/v-select-normal";
import VCheckboxesNormal from "@/components/_general/v-checkboxes-normal";
import {mapState} from "vuex";
export default {
  name: "v-vacancy-create-form",
  components: {VCheckboxesNormal, VSelectNormal, VButtonNormal, VRadiosNormal, VInputNormal, VTextareaNormal},
  computed: mapState({
    lang: state => state.lang.LANG
  }),
  data(){
    return{
      rubrics: [],
      categories: [],
      payment_intervals: [],
      price_show: false,
      form: {
        title: '',
        short_description: '',
        long_description: '',
        rubric_id: null,
        category_ids: [],
        payment_interval_id: null,
        price: null,
      }
    }
  },
  mounted() {
    // RUBRIC GET
    this.emitter.emit('load', true)
    this.$store.dispatch("rubric/GET", '').then(data => {
      this.rubrics = data.obj
    }).finally(() => this.emitter.emit("load", false))
  //  PAYMENT INTERVALS GET
    this.emitter.emit('load', true)
    this.$store.dispatch("payment_interval/GET", '').then(data => {
      this.payment_intervals = data.obj
    }).finally(() => this.emitter.emit("load", false))
  },
  methods: {
    categoriesGet(rubric_id){
      this.categories = []
      this.form.category_ids = []
      this.$store.dispatch("category/GET", `?rubric_id=${rubric_id}`).then(data => {
        this.categories = data.obj
      })
    },
    onVacancy(){
      this.emitter.emit('load', true)
      this.$store.dispatch("vacancy/CREATE", this.form).then(data => {
        this.emitter.emit('message', data)
      }).finally(() => this.emitter.emit('load', false))
    }
  }
}
</script>

<style scoped>
.modal-content{
  width: 50%;
}
</style>