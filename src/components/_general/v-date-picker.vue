<template>
  <div class="datepicker d-grid">
    <label for="" class="f-weight-bold">{{label}}</label>
    <span class="f-size-very-small">{{span}}</span>
    <Datepicker v-model="date" :enableTimePicker="false" utc @update:modelValue="handleDate"/>
  </div>
</template>

<script>
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
export default {
  name: "v-date-picker",
  components: {Datepicker},
  props: ['label', 'span', 'value'],
  data(){
    return{
      date: this.value || null
    }
  },
  methods: {
    handleDate(date){
      this.$emit('value', date)
      this.date = date
    }
  }
}
</script>

<style scoped>

</style>