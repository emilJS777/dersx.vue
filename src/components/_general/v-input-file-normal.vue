<template>
  <div v-bind:class="fileForm.msg ? 'd-block' : ''">
    <label for="" class="d-grid f-weight-bold">{{label}}</label>
    <label for="file" class="c-pointer d-flex j-content-center a-items-center g-gap-_5">

      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-paperclip" viewBox="0 0 16 16">
        <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z"/>
      </svg>

      <div class="d-grid f-size-small">
        <span>
          {{sublabel}}
        </span>
        <span class="err f-size-very-small">{{this.fileForm.msg}}</span>
      </div>

      <input type="file" id="file" @change="changeFile" style="display: none" aria-label="Upload file">
    </label>
  </div>
</template>

<script>
export default {
  name: "v-input-file-normal",
  props: ['label', 'sublabel', 'allowedTypes'],
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
      this.allowedTypes.forEach(typeName => {
        if(files[0].type === typeName){
          let form_data = new FormData()
          form_data.append('image', files[0])
          this.$emit("file", form_data)
          this.fileForm.file = files[0]
        }
      })
      if(!this.fileForm.file){
        this.fileForm.msg = "не верный формат файла"
      }
    },
  }
}
</script>

<style scoped>
.err{
  color: darkred;
}

</style>