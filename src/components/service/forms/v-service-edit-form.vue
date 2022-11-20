<template>
  <div class="d-flex a-items-center j-content-center">
    <div class="bg-fff padding-1 w-max padding-1">
      <h3 class="m-top-0 d-flex j-content-space-between">обновить услугу <span class="f-size-small c-pointer c-content-hover t-decoration-underline-hover" @click="$router.go(-1)">&#9664; назад</span></h3>

      <div class="d-flex j-content-space-between a-items-flex-end">
        <v-input-file-form label="изображение"
                           class="d-flex m-top-1 h-max-content"
                           span="обновить изображение вашей услуги"
                           :allowedTypes="['image/jpg', 'image/jpeg', 'image/png']"
                           @file_form="file => new_image = file"
                           :sublabel="image ? `загружено ${image.filename}` : 'не загружено'"/>

        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash err-msg c-pointer animation-from-hidden" viewBox="0 0 16 16"
             @click="setModalName('deleteServiceImageModal')"
             v-if="image">
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
          <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
        </svg>
      </div>

      <v-input-normal label="название услуги"
                      class="m-top-1"
                      :default_value="form.title"
                      @value="value => form.title = value"
                      v-if="form.title"
                      span="не менее 4 и не больше 40 символов"/>

      <v-input-normal label="краткое описание "
                      :default_value="form.short_description"
                      class="m-top-1"
                      @value="value => form.short_description = value"
                      v-if="form.short_description"
                      span="не менее 20 и не больше 400 символов"/>

      <v-textarea-normal label="полное описание"
                         class="m-top-1"
                         :default_value="form.long_description"
                         @value="value => form.long_description = value"
                         v-if="form.long_description"
                         span="опишите что ваша услуга из себя представляет, какие задачи решает и тп."/>

      <v-select-normal :items="rubrics"
                       :selected="form.rubric"
                       label="рубрика"
                       span="к какой рубрике относится ваша услуга "
                       class="m-top-1"
                       @select="item =>{getCategories(item.id); form.rubric_id = item.id}"
                       v-if="rubrics.length && form.rubric"/>

      <v-checkboxes-normal :checkboxes="categories"
                           v-if="categories.length"
                           class="m-top-1"
                           label="категории"
                           @select="selected_ids => form.category_ids = selected_ids"
                           span="к каким категориям относится ваша услуга"/>

      <div class="d-flex g-gap-3 a-items-flex-end ">
        <v-input-normal type="number" class="m-top-2" label="цена" span="цена которое вы готовы заплатить исполнителю от 500 до 500000"
                        :default_value="form.price"
                        v-if="form.price"
                        @value="value => form.price = parseInt(value)"/>

        <v-radios-normal name="paidInterval"
                         span="за какой промежуток времени вы готовы платить"
                         label="оплата за"
                         :active_id="parseInt(form.payment_interval_id)"
                         @value="item => form.payment_interval_id = item.id"
                         :radios="payment_intervals"
                         v-if="form.payment_interval_id && payment_intervals.length"/>
      </div>

      <div class="btn_block d-flex g-gap-_5 j-content-flex-end m-top-2">
        <v-button-normal label="обновить" class="bg-content" @click="serviceUpdate"/>
      </div>
    </div>
  </div>

<!--  ALERTS-->
  <v-alert-modal v-if="modalName === 'deleteServiceImageModal'"
                 label="вы дествительно хотите удалить изображение услуги ?"
                 @confirm="serviceImageDelete"
                 @close="setModalName(false)"/>
</template>

<script>
import VInputNormal from "@/components/_general/v-input-normal";
import VRadiosNormal from "@/components/_general/v-radios-normal";
import VTextareaNormal from "@/components/_general/v-textarea-normal";
import VCheckboxesNormal from "@/components/_general/v-checkboxes-normal";
import VButtonNormal from "@/components/_general/v-button-normal";
import VInputFileForm from "@/components/_general/v-input-file-form";
import VSelectNormal from "@/components/_general/v-select-normal";
import toggleMixin from "@/mixins/toggle-mixin";
import VAlertModal from "@/components/_general/v-alert-modal";
export default {
  name: "v-service-edit-form",
  components: {
    VAlertModal,
    VSelectNormal,
    VInputFileForm, VButtonNormal, VCheckboxesNormal, VTextareaNormal, VRadiosNormal, VInputNormal},
  props: ['service_id'],
  mixins: [toggleMixin],
  data(){
    return{
      rubrics: [],
      categories: [],
      payment_intervals: [],

      image: null,
      new_image: null,
      form:{
        title: '',
        short_description: '',
        long_description: '',
        rubric_id: null,
        rubric: null,
        category_ids: [],
        price: null,
        payment_interval_id: null
      }
    }
  },
  mounted() {
    // SERVICE GET
    this.emitter.emit('load', true)
    this.$store.dispatch("service/GET", `?id=${this.service_id}`).then(data => {
      this.form.title = data.obj.title
      this.form.short_description = data.obj.short_description
      this.form.long_description = data.obj.long_description
      this.form.rubric_id = parseInt(data.obj.rubric.id)
      this.form.rubric = data.obj.rubric
      this.form.category_ids = Array.from(data.obj.categories, category => category.id)
      this.form.price = parseInt(data.obj.price)
      this.form.payment_interval_id = parseInt(data.obj.payment_interval.id)
      this.image = data.obj.image
    }).finally(() => this.emitter.emit('load', false))
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
    serviceUpdate(){
      this.emitter.emit('load', true)
      this.$store.dispatch("service/UPDATE", {id: this.service_id, form: this.form}).then(data => {
        if(data.success && this.new_image && this.image){
          this.serviceImageDelete()
          this.serviceImageUpload()
        }
        else if(data.success && this.new_image){
          this.serviceImageUpload()
        }
        else
          this.emitter.emit('message', data)
      }).finally(() => this.emitter.emit('load', false))
    },
    serviceImageUpload(){
      this.emitter.emit('load', true)
      this.$store.dispatch("image/CREATE", {query: `?service_id=${this.service_id}`, form: this.new_image}).then(data => {
        this.emitter.emit('message', data)
      }).finally(() => this.emitter.emit('load', false))
    },
    serviceImageDelete(){
      this.emitter.emit('load', true)
      console.log(this.image.filename)
      this.$store.dispatch("image/DELETE", this.image.filename).then(data => {
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