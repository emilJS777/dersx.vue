<template>
  <div class="d-flex j-content-center box-shadow-slim" v-if="loaded">
    <div class="bg-fff w-max padding-1 animation-from-hidden">
      <h2 class="m-top-0 d-flex j-content-space-between">{{ lang.vacancies.edit.title }}
        <span class="f-size-small c-pointer c-content-hover d-flex g-gap-_5 a-items-center" @click="$router.go(-1)">
          <i class="fa fa-chevron-left" aria-hidden="true"></i>
          {{ lang.general.back }}
        </span>
      </h2>
      <v-input-normal :label="lang.vacancies.create.form.title.title"
                      :span="lang.vacancies.create.form.title.description"
                      :default_value="form.title"
                      @value="value => form.title = value"/>

      <v-input-normal :label="lang.vacancies.create.form.short_description.title"
                      :span="lang.vacancies.create.form.short_description.description"
                      class="m-top-2"
                      :default_value="form.short_description"
                      @value="value => form.short_description = value"/>

      <v-textarea-normal :label="lang.vacancies.create.form.long_description.title"
                         :span="lang.vacancies.create.form.long_description.description"
                         class="m-top-2"
                         :default_value="form.long_description"
                         @value="value => form.long_description = value"/>

      <v-select-normal :label="lang.general.rubric" :span="lang.vacancies.create.form.rubric.description" class="m-top-1"
                       :items="rubrics"
                       :selected="form.rubric"
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
                         v-if="form.payment_interval_id"
                         :active_id="form.payment_interval_id"
                         @value="(item) => {form.payment_interval_id = item.id;price_show=item.price;item.price?null:this.form.price=0}"
                         :radios="payment_intervals"/>

          <v-input-normal type="number" class="w-max" :label="lang.vacancies.create.form.price.title" :span="lang.vacancies.create.form.price.description"
                          :default_value="form.price"
                          v-if="this.price_show"
                          @value="value => form.price = parseInt(value)" />
      </div>


      <div class="d-flex g-gap-1 m-top-2 j-content-flex-end">
        <v-button-normal :label="lang.general.update" class="bg-content" @click="vacancyEdit"/>
      </div>
    </div>
  </div>
</template>

<script>
import VInputNormal from "@/components/_general/v-input-normal";
import VTextareaNormal from "@/components/_general/v-textarea-normal";
import VSelectNormal from "@/components/_general/v-select-normal";
import VCheckboxesNormal from "@/components/_general/v-checkboxes-normal";
import VRadiosNormal from "@/components/_general/v-radios-normal";
import VButtonNormal from "@/components/_general/v-button-normal";
import {mapState} from "vuex";
export default {
  name: "v-vacancy-edit-form",
  components: {VButtonNormal, VRadiosNormal, VCheckboxesNormal, VSelectNormal, VTextareaNormal, VInputNormal},
  props: ['vacancy_id'],
    computed: mapState({
        lang: state => state.lang.LANG
    }),
  data(){
    return{
      payment_intervals: [],
      rubrics: [],
      categories: [],
      price_show: false,
      loaded: false,
      form: {
        title: '',
        short_description: '',
        long_description: '',
        category_ids: [],
        rubric: null,
        rubric_id: null,
        payment_interval_id: null,
        price: null
      }
    }
  },
  mounted() {
    // RUBRIC GET
    this.emitter.emit('load', true)
    this.$store.dispatch("rubric/GET", '').then(data => {
      this.rubrics = data.obj
    }).finally(() => this.emitter.emit('load', false))
    //  PAYMENT INTERVALS GET
    this.emitter.emit('load', true)
    this.$store.dispatch("payment_interval/GET", '').then(data => {
      this.payment_intervals = data.obj
    }).finally(() => this.emitter.emit('load', false))

    this.emitter.emit('load', true)
    this.$store.dispatch("vacancy/GET", `?id=${this.vacancy_id}`).then(data => {
      this.form.title = data.obj.title
      this.form.short_description = data.obj.short_description
      this.form.long_description = data.obj.long_description
      this.form.rubric_id = data.obj.rubric.id
      this.form.rubric = data.obj.rubric
      this.form.payment_interval_id = data.obj.payment_interval_id
      this.form.price = parseInt(data.obj.price)
      this.form.category_ids = Array.from(data.obj.categories, category => category.id)
    }).finally(() => this.emitter.emit('load', false))
  },
  methods:{
    categoriesGet(rubric_id){
      this.categories = []
      this.form.category_ids = []
      this.$store.dispatch("category/GET", `?rubric_id=${rubric_id}`).then(data => {
        this.categories = data.obj
      })
    },
    vacancyEdit(){
        console.log(this.form.price)

      this.emitter.emit('load', true)
      this.$store.dispatch("vacancy/UPDATE", {id: this.vacancy_id, form: this.form}).then(data => {
        this.emitter.emit('message', data)
      }).finally(() => this.emitter.emit('load', false))
    }
  }
}
</script>

<style scoped>

</style>