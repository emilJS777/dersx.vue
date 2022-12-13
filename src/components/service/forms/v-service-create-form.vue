<template>
  <div class="d-flex a-items-center j-content-center box-shadow-slim">
    <div class="bg-fff padding-1 w-max padding-1">
      <h3 class="m-top-0 d-flex j-content-space-between">создать услугу <span class="f-size-small c-pointer c-content-hover t-decoration-underline-hover" @click="$router.go(-1)">&#9664; назад</span></h3>

      <v-input-file-form label="изображение"
                         class="d-flex m-top-1 h-max-content"
                         span="загрузите изображение вашей услуги"
                         :allowedTypes="['image/jpg', 'image/jpeg', 'image/png']"
                         @file_form="file => form.image = file"
                         sublabel="не загружено"/>

      <v-input-normal label="название услуги"
                      class="m-top-1"
                      @value="value => form.title = value"
                      span="не менее 4 и не больше 40 символов"/>

      <v-input-normal label="краткое описание "
                      class="m-top-1"
                      @value="value => form.short_description = value"
                      span="не менее 20 и не больше 400 символов"/>

      <v-textarea-normal label="полное описание"
                         class="m-top-1"
                         @value="value => form.long_description = value"
                         span="опишите что ваша услуга из себя представляет, какие задачи решает и тп."/>

      <v-select-normal :items="rubrics"
                       :selected="rubrics[0]"
                       label="рубрика"
                       span="к какой рубрике относится ваша услуга "
                       class="m-top-1"
                       @select="item =>{getCategories(item.id); form.rubric_id = item.id}"
                        v-if="rubrics.length"/>

      <v-checkboxes-normal :checkboxes="categories"
                           v-if="categories.length"
                           class="m-top-1"
                           label="категории"
                           @select="selected_ids => form.category_ids = selected_ids"
                           span="к каким категориям относится ваша услуга"/>

      <div class="d-flex g-gap-3 a-items-flex-end ">
        <v-input-normal type="number" class="m-top-2" label="цена" span="цена которое вы готовы заплатить исполнителю от 500 до 500000"
                        @value="value => form.price = parseInt(value)"/>
        <v-radios-normal name="paidInterval"
                         span="за какой промежуток времени вы готовы платить"
                         label="оплата за"
                         @value="item => form.payment_interval_id = item.id"
                         :radios="payment_intervals"/>
      </div>

      <div class="btn_block d-flex g-gap-_5 j-content-flex-end m-top-2">
        <v-button-normal label="создать" class="bg-content" @click="onService"/>
      </div>
    </div>
  </div>
</template>

<script>
import VInputNormal from "@/components/_general/v-input-normal";
import VTextareaNormal from "@/components/_general/v-textarea-normal";
import VSelectNormal from "@/components/_general/v-select-normal";
import VCheckboxesNormal from "@/components/_general/v-checkboxes-normal";
import VButtonNormal from "@/components/_general/v-button-normal";
import VInputFileForm from "@/components/_general/v-input-file-form";
import VRadiosNormal from "@/components/_general/v-radios-normal";
export default {
  name: "v-service-create-form",
  components: {
    VRadiosNormal,
    VInputFileForm, VButtonNormal, VCheckboxesNormal, VSelectNormal, VTextareaNormal, VInputNormal},
  data(){
    return{
      rubrics: [],
      categories: [],
      payment_intervals: [],
      form:{
        title: '',
        short_description: '',
        long_description: '',
        rubric_id: null,
        category_ids: [],
        price: null,
        payment_interval_id: null,
        image: null
      }
    }
  },
  mounted() {
  //  RUBRICS GET
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
  methods:{
    onService(){
      this.emitter.emit('load', true)
      this.$store.dispatch("service/CREATE", this.form).then(data => {
        if(data.success && this.form.image)
          this.osServiceImage(data.obj.id)
        else
          this.emitter.emit('message', data)
      }).finally(() => this.emitter.emit('load', false))
    },
    osServiceImage(service_id){
      this.emitter.emit('load', true)
      this.$store.dispatch("image/CREATE", {query: `?service_id=${service_id}`, form: this.form.image}).then(data => {
        this.emitter.emit('message', data)
      }).finally(() => this.emitter.emit('load', false))
    },
    getCategories(rubric_id){
      this.categories = []
      this.form.category_ids = []
      this.emitter.emit('load', true)
      this.$store.dispatch("category/GET", `?rubric_id=${rubric_id}`).then(data => {
        this.categories = data.obj
      }).finally(() => this.emitter.emit('load', false))
    },
  }
}
</script>

<style scoped>
.modal-content{
  width: 40%;
  overflow-y: auto;
  max-height: 100%;
}
</style>