<template>
  <div class="d-grid">
    <label for="" class="f-weight-bold">{{label}}</label>
    <span class="f-size-very-small">{{span}}</span>
    <textarea class="w-max outline-content form-standard" :placeholder="placeholder" v-model="this.value" @change="this.changeValue"></textarea>
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
  },
  mounted() {
      if(this.default_value) {
          this.value = this.value.replace(/<br>/g, '\n')
          this.value = this.value.replace(/<a\b[^>]*>|<\/a>/gi, '');
      }
  },

  methods: {
      changeValue(){
          const linkRegex = /(\b[^\s]+\.[^\s]+\b)/g;
          const linkedValue = this.value.replace(linkRegex, '<a href="//$1" class="c-content-hover c-6d">$1</a>'); // replace links with anchor tags
          this.$emit('value', linkedValue.replace(/(\r?\n){1,}/g, '<br>'))
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