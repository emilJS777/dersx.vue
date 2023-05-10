<template>
  <div class="d-grid">
    <label for="" class="f-weight-bold">{{ label }}</label>
    <span class="f-size-very-small">{{span}}</span>
    <select name="select" id="select" class="w-max form-standard" v-model="selectedItem" @change="onSelect">
      <option v-for="item in items" :key="item.id" :value="item">
          <span v-if="lang.lang === 'arm'">{{item.title_arm}}</span>
          <span v-if="lang.lang === 'eng'">{{item.title_eng}}</span>
          <span v-if="lang.lang === 'rus'">{{item.title_rus}}</span>
      </option>
    </select>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "v-select-normal",
  props: ['label', 'items', 'span', 'selected'],
  computed: mapState({
    lang: state => state.lang.LANG
  }),
  data(){
    return{
      selectedItem: this.selected || null
    }
  },
  mounted() {
    if(this.selected)
      this.onSelect()
  },
  methods: {
    onSelect(){
      this.$emit('select', this.selectedItem)
    }
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