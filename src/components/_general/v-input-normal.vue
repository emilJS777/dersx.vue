<template>
  <div class="d-grid w-max">
    <label for="" class="f-weight-bold">{{label}}</label>
    <span class="f-size-very-small">{{span}}</span>
    <input :type="type" :placeholder="placeholder" class="outline-content form-standard" v-model="value" @change="this.$emit('value', this.value)">
  </div>
</template>

<script>
export default {
  name: "v-input-normal",
  props: ['type', 'label', 'span', 'placeholder', 'default_value'],
  data(){
    return{
      value: this.default_value || null
    }
  }
}
</script>

<style scoped>
 input{
   padding-right: 10px;
 }
</style>