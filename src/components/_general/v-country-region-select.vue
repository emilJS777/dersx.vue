<template>
  <div class="d-grid">
    <label for="" class="f-weight-bold">{{ label }}</label>
    <span class="f-size-very-small">{{span}}</span>
    <div class="d-grid g-gap-1">
      <country-select :countryName="true"  :placeholder="`${placeholder ? placeholder.split(' ')[0] : 'Выберите страну' }` " v-model="country" @change="onRegion" :country="country" topCountry="US" class="w-max form-standard" />
      <region-select :regionName="true" :countryName="true" :placeholder="`${placeholder ? placeholder.split(' ')[1] : 'Выберите регион'}`" v-model="region" @change="onRegion" :country="country" :region="region" class="w-max form-standard" />
    </div>
  </div>
</template>

<script>

export default {
  name: "v-country-region-select",
  props: ['label', 'span', 'country_placeholder', 'placeholder'],
  data: () => ({
    country: '',
    region: ''
  }),
  methods: {
    onRegion(){
      this.$emit('value', `${this.country && this.region ? this.country+' '+this.region : ''}`)
    },
  }
}
</script>

<style scoped>
select {

  /* reset */

  margin: 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;

  background-image:
      linear-gradient(45deg, transparent 50%, #ffffff 50%),
      linear-gradient(135deg, #fafafa 50%, transparent 50%),
      linear-gradient(to right, #ba6f0b, #ea7745);
  background-position:
      calc(100% - 20px) calc(1em + 2px),
      calc(100% - 15px) calc(1em + 2px),
      100% 0;
  background-size:
      5px 5px,
      5px 5px,
      2.9em 2.5em;
  background-repeat: no-repeat;
}

select:focus {
  background-image:
      linear-gradient(45deg, white 50%, transparent 50%),
      linear-gradient(135deg, transparent 50%, white 50%),
      linear-gradient(to right, #ea7745, #ba6f0b);
  background-position:
      calc(100% - 15px) 1em,
      calc(100% - 20px) 1em,
      100% 0;
  background-size:
      5px 5px,
      5px 5px,
      2.9em 2.5em;
  background-repeat: no-repeat;
  border-color: #ba6f0b;
  outline: 0;
}
</style>