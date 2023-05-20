<template>
  <div class="d-grid w-max">
    <label for="" class="f-weight-bold">{{label}}</label>
    <span :class="`f-size-very-small ${this.invalid_value ? 'err-msg' : ''}`">{{span}}</span>
    <input :type="type" min="0" :placeholder="placeholder" :class="`outline-content form-standard ${this.invalid_value ? 'err-border' : ''}`" v-model="value" @change="checkValidate">
  </div>
</template>

<script>
export default {
  name: "v-input-normal",
  props: ['type', 'label', 'span', 'placeholder', 'default_value', 'input_class', 'validate'],
  data(){
    return{
      value: this.default_value || null,
      invalid_value: false
    }
  },
  methods: {
      checkValidate(){
          if(this.validate){
              if(this.validate.type === 'string') {
                  if (this.value.length < this.validate.minLength || this.value.length > this.validate.maxLength)
                      this.invalid_value = true
                  else
                      this.invalid_value = false
              }
          }
          this.$emit('value', this.value)
          return this.invalid_value
      }
  }
}
</script>

<style scoped>
 input{
   padding-right: 10px;
 }
 .err-border{
     border: 1px solid#a43506;
 }
</style>