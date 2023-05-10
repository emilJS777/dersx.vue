<template>
  <div class="radios_normal">
    <label for="" class="f-weight-bold">{{ label }}</label>

    <div class="d-flex g-gap-1 radios">

      <div v-for="radio in radios" :key="radio.id">
        <label class="container d-flex l-height-1" @click="this.$emit('value', radio)">
          <span v-if="lang.lang === 'eng'">{{radio.title_eng}}</span>
          <span v-if="lang.lang === 'arm'">{{radio.title_arm}}</span>
          <span v-if="lang.lang === 'rus'">{{radio.title_rus}}</span>
<!--          <span v-else>{{radio.title}}</span>-->
          <input type="radio" :checked="radio.id === active_id" :name="name">
          <span class="checkmark outline-content"></span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "v-radios-normal",
  props: ['label', 'radios', 'span', 'name', 'active_id'],
    computed: mapState({
       lang: state => state.lang.LANG
    }),
    mounted() {
      if(this.active_id && this.radios.length > 0){
          this.radios.forEach(radio => {
              if(radio.id === this.active_id){
                  this.$emit('value', radio)
              }
          })
      }
    }
}
</script>

<style scoped>
/* Customize the label (the container) */
.container {
  display: block;
  position: relative;
  padding-left: 26px;
  margin-bottom: 12px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default radio button */
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom radio button */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 18px;
  width: 18px;
  background-color: #eee;
  border-radius: 50%;
}

/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the radio button is checked, add a blue background */
.container input:checked ~ .checkmark {
  background-color: #ea7745;
}

/* Create the indicator (the dot/circle - hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the indicator (dot/circle) when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the indicator (dot/circle) */
.container .checkmark:after {
  top: 5px;
  left: 5px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: white;
}
</style>