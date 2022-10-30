<template>
  <div class="d-flex j-content-center">
    <div class="bg-fff w-max padding-1 animation-from-hidden">
      <h2 class="m-top-0 d-flex j-content-space-between">редактировать вакансию <span class="f-size-small c-pointer c-content-hover t-decoration-underline-hover" @click="$router.go(-1)">&#9664; назад</span></h2>
      <v-input-normal label="название"
                      span="в данном поле нужно описать название вакансии, это может быть просто название специализации. от 5 до 50 символов"
                      :default_value="form.title"
                      v-if="form.title"
                      @value="value => form.title = value"/>

      <v-input-normal label="краткое описание"
                      span="данное поле предназначена для описание вакансии который будет виден в поисковом странице. от 50 до 600 символов "
                      class="m-top-2"
                      v-if="form.short_description"
                      :default_value="form.short_description"
                      @value="value => form.short_description = value"/>

      <v-textarea-normal label="длинное описание"
                         span="в данном поле находится полное описание вакансии. постарайтесь описать с какими
                          трудностями возможно прийдется столкнуться исполнителю (если есть такие). от 50 до 4000 символов"
                         class="m-top-2"
                         v-if="form.long_description"
                         :default_value="form.long_description"
                         @value="value => form.long_description = value"/>

      <v-select-normal label="рубрика" span="выберите сферу деятельности" class="m-top-1"
                       v-if="rubrics.length && form.rubric"
                       :items="rubrics"
                       :selected="form.rubric"
                       @select="item => {form.rubric_id = item.id; categoriesGet(item.id)}"/>

      <div class="categories d-flex a-items-center g-gap-1 m-top-1">
        <v-checkboxes-normal label="выберите категорию "
                             span="выбирать не обязательно но желательно"
                             :checkboxes="categories"
                             @select="select_ids => form.category_ids = select_ids"
                             v-if="categories.length"/>
      </div>


      <div class="d-flex g-gap-3 a-items-flex-end ">
        <v-input-normal type="number" class="m-top-2" label="цена" span="цена которое вы готовы заплатить исполнителю от 500 до 500000"
                        :default_value="form.price"
                        v-if="form.price"
                        @value="value => form.price = parseInt(value)"/>

        <v-radios-normal name="paidInterval"
                         span="за какой промежуток времени вы готовы платить"
                         label="оплата за"
                         v-if="form.payment_interval_id"
                         @value="item => form.payment_interval_id = item.id"
                         :active_id="form.payment_interval_id"
                         :radios="payment_intervals"/>
      </div>


      <div class="d-flex g-gap-1 m-top-2 j-content-flex-end">
        <v-button-normal label="подтвердить" class="bg-content" @click="vacancyEdit"/>
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
export default {
  name: "v-vacancy-edit-form",
  components: {VButtonNormal, VRadiosNormal, VCheckboxesNormal, VSelectNormal, VTextareaNormal, VInputNormal},
  props: ['vacancy_id'],
  data(){
    return{
      payment_intervals: [],
      rubrics: [],
      categories: [],
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