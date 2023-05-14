<template>
  <div v-bind:class="fileForm.msg ? 'd-block' : ''">
    <label for="file-form" class="c-pointer d-grid a-items-center">
      <label for="" class="d-grid f-weight-bold">{{label}}</label>
      <span class="f-size-very-small">{{span}}</span>

      <div class="d-flex g-gap-_5 c-content-hover a-items-flex-end">

        <i :class="`${icon}`" aria-hidden="true"></i>


        <div class="d-grid f-size-small a-items-center">
          <span v-if="!fileForm.file">
            {{sublabel}}
          </span>
          <span v-else>
            {{fileForm.file.name}}
          </span>
          <span class="err f-size-very-small">{{this.fileForm.msg}}</span>
        </div>
      </div>

      <input type="file" id="file-form" :accept="this.accept ? this.accept : null" @change="changeFile" style="display: none" aria-label="Upload file">
    </label>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "v-input-file-form",
  props: ['label', 'sublabel', 'allowedTypes', 'span', 'icon', 'accept'],
  computed: mapState({
      lang: state => state.lang.LANG
  }),
  data(){
    return{
      fileForm:{
        msg: null,
        file: null
      },
    }
  },
  methods:{
    changeFile(e){
      this.fileForm.msg = null
      this.fileForm.file = null
      let files = e.target.files || e.dataTransfer.files;
      if(files[0].size <= 1000000){
          if (this.allowedTypes.find(typeName =>files[0].type === typeName)) {
            let form_data = new FormData()
            form_data.append('image', files[0])
            this.$emit("file_form", form_data)
            this.fileForm.file = files[0]
          }
          else{
            this.fileForm.msg = this.lang.general.file.format_validate
          }
      }
      else{
        this.fileForm.msg = this.lang.general.file.size_validate
      }
    }
  }
}
</script>

<style scoped>
.err{
  color: darkred;
}

</style>