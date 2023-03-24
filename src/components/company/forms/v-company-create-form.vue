<template>
  <div class="d-flex a-items-center j-content-center box-shadow-slim">
    <div class="bg-fff padding-1 w-max padding-1">
      <h3 class="m-top-0 d-flex j-content-space-between">создать компанию <span class="f-size-small c-pointer c-content-hover t-decoration-underline-hover" @click="$router.go(-1)">&#9664; назад</span></h3>

      <div>
        <v-input-file-form label="логотип"
                           class="d-flex m-top-1 h-max-content"
                           span="загрузите логотип вашей компании"
                           :allowedTypes="['image/jpg', 'image/jpeg', 'image/png']"
                           @file_form="file => form.image = file"
                           sublabel="не загружено"/>
      </div>

      <v-input-normal label="название компании"
                      class="m-top-1"
                      @value="value => form.title = value"
                      span="не менее 2 и не больше 40 символов"/>

      <v-input-normal label="краткое описание "
                      class="m-top-1"
                      @value="value => form.short_description = value"
                      span="не менее 15 и не больше 300 символов"/>

      <v-textarea-normal label="полное описание"
                         class="m-top-1"
                         @value="value => form.long_description = value"
                         span="опишите что ваша компания из себя представляет, какие задачи решает и тп."/>

      <v-checkboxes-normal :checkboxes="rubrics"
                           v-if="rubrics.length"
                           class="m-top-1"
                           label="рубрики"
                           @select="selected_ids => form.rubric_ids = selected_ids"
                           span="к каким рубрикам относится ваша компания"/>

      <div class="btn_block d-flex g-gap-_5 j-content-flex-end m-top-2">
        <v-button-normal label="создать" class="bg-content" @click="onCompany"/>
      </div>
    </div>
  </div>
</template>

<script>
import VInputNormal from "@/components/_general/v-input-normal";
import VTextareaNormal from "@/components/_general/v-textarea-normal";
import VCheckboxesNormal from "@/components/_general/v-checkboxes-normal";
import VButtonNormal from "@/components/_general/v-button-normal";
import VInputFileForm from "@/components/_general/v-input-file-form";
export default {
  name: "v-company-create-form",
  components: {VInputFileForm, VButtonNormal, VCheckboxesNormal, VTextareaNormal, VInputNormal},
  data(){
    return{
      rubrics: [],
      form:{
        title: '',
        short_description: '',
        long_description: '',
        rubric_ids: [],
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
    onCompany(){
      this.emitter.emit('load', true)
      this.$store.dispatch("company/CREATE", this.form).then(data => {
        if(data.success && this.form.image)
          this.onCompanyImage(data.obj.id)
        else
          this.emitter.emit('message', data)
      }).finally(() => this.emitter.emit('load', false))
    },
    onCompanyImage(company_id){
      this.emitter.emit('load', true)
      this.$store.dispatch("image/CREATE", {query: `?company_id=${company_id}`, form: this.form.image}).then(data => {
        this.emitter.emit('message', data)
      }).finally(() => this.emitter.emit('load', false))
    },
  }
}
</script>

<style scoped>

</style>