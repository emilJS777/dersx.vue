<template>
  <div v-bind:class="fileForm.msg ? 'd-block' : ''">
    <label for="file-form" class="c-pointer d-grid a-items-center">
      <label for="" class="d-grid f-weight-bold">{{label}}</label>
      <span class="f-size-very-small">{{span}}</span>

      <div class="d-flex g-gap-_5 c-content-hover">

        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-card-image c-555 c-content-hover" viewBox="0 0 16 16">
          <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
          <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z"/>
        </svg>


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

      <input type="file" id="file-form" @change="changeFile" style="display: none" aria-label="Upload file">
    </label>
  </div>
</template>

<script>
export default {
  name: "v-input-file-form",
  props: ['label', 'sublabel', 'allowedTypes', 'span'],
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
            this.fileForm.msg = "не верный формат файла"
          }
      }
      else{
        this.fileForm.msg = 'размер файла не должно превышать 1мб'
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