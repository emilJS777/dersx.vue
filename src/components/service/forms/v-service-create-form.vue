<template>
  <div class="modal d-flex a-items-center j-content-center">
    <div class="modal-content w-max-content padding-1">
      <h3 class="m-top-0">создать услугу</h3>

      <v-input-file-form label="изображение"
                         class="d-flex m-top-1 h-max-content"
                         span="загрузите изображение вашей услуги"
                         :allowedTypes="['image/jpg', 'image/jpeg', 'image/png']"
                         @file="file => form.image = file"
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

      <div class="btn_block d-flex g-gap-_5 j-content-flex-end m-top-2">
        <v-button-normal label="создать" class="bg-content" @click="onService"/>
        <v-button-normal label="отменить" @click="this.$emit('close')"/>
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
export default {
  name: "v-service-create-form",
  components: {VInputFileForm, VButtonNormal, VCheckboxesNormal, VSelectNormal, VTextareaNormal, VInputNormal},
  data(){
    return{
      rubrics: [],
      categories: [],
      form:{
        title: '',
        short_description: '',
        long_description: '',
        rubric_id: null,
        category_ids: [],
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
      this.$store.dispatch("service_image/CREATE", {query: `?service_id=${service_id}`, form: this.form.image}).then(data => {
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