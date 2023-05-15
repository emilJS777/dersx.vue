<template>
  <div class="d-grid">
    <label for="" class="f-weight-bold">{{label}}</label>
    <span class="f-size-very-small">{{span}}</span>
    <textarea class="w-max outline-content form-standard" :placeholder="placeholder" v-html="this.value.replace(/<br>/g, '\n')" @change="this.$emit('value', this.value.replace(/\r?\n/g, '<br>'))"></textarea>
  </div>
</template>

<script>
export default {
  name: "v-textarea-normal",
  props: ['label', 'span', 'placeholder', 'default_value'],
  data(){
    return{
      value: this.default_value || null
    }
  }
}
</script>

<style scoped>
textarea{
  resize: none;
  height: 100px;
  padding: 5px;
}
</style>