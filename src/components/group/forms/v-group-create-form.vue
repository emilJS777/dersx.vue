<template>
  <div class="d-flex a-items-center j-content-center box-shadow-slim">
    <div class="bg-fff padding-1 w-max padding-1">
      <h3 class="m-top-0 d-flex j-content-space-between">создать группу <span class="f-size-small c-pointer c-content-hover t-decoration-underline-hover" @click="$router.go(-1)">&#9664; назад</span></h3>

      <div>
        <v-input-file-form label="изображение"
                           class="d-flex m-top-1 h-max-content"
                           span="загрузите изображение вашей группы"
                           :allowedTypes="['image/jpg', 'image/jpeg', 'image/png']"
                           @file_form="file => form.image = file"
                           sublabel="не загружено"/>
      </div>

      <v-input-normal label="название группы"
                      class="m-top-1"
                      @value="value => form.title = value"
                      span="не менее 2 и не больше 60 символов"/>

      <v-textarea-normal label="описание"
                         class="m-top-1"
                         @value="value => form.description = value"
                         span="опишите что ваша группа из себя представляет."/>

      <div class="btn_block d-flex g-gap-_5 j-content-flex-end m-top-2">
        <v-button-normal label="создать" class="bg-content" @click="onGroup"/>
      </div>
    </div>
  </div>
</template>

<script>
import VInputFileForm from "@/components/_general/v-input-file-form";
import VInputNormal from "@/components/_general/v-input-normal";
import VTextareaNormal from "@/components/_general/v-textarea-normal";
import VButtonNormal from "@/components/_general/v-button-normal";
export default {
  name: "v-group-create-form",
  components: {VButtonNormal, VTextareaNormal, VInputNormal, VInputFileForm},
  data(){
    return{
      form:{
        title: '',
        description: '',
        image: null
      }
    }
  },
  methods:{
    onGroup(){
      this.emitter.emit('load', true)
      this.$store.dispatch("group/CREATE", this.form).then(data => {
        if(data.success && this.form.image)
          this.onGroupImage(data.obj.id)
        else
          this.emitter.emit('message', data)
      }).finally(() => this.emitter.emit('load', false))
    },
    onGroupImage(group_id){
      this.emitter.emit('load', true)
      this.$store.dispatch("image/CREATE", {query: `?group_id=${group_id}`, form: this.form.image}).then(data => {
        this.emitter.emit('message', data)
      }).finally(() => this.emitter.emit('load', false))
    },
  }
}
</script>

<style scoped>

</style>