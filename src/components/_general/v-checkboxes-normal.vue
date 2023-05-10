<template>

  <div class="d-grid">
    <label for="" class="f-weight-bold">{{ label }}</label>
    <span class="f-size-very-small">{{span}}</span>
    <div class="m-top-05 checkboxes d-grid l-height-1">
      <div v-for="checkbox in checkboxes" :key="checkbox.id">
        <label class="container d-flex">
            <span v-if="lang.lang === 'arm'">{{checkbox.title_arm}}</span>
            <span v-if="lang.lang === 'eng'">{{checkbox.title_eng}}</span>
            <span v-if="lang.lang === 'rus'">{{checkbox.title_rus}}</span>
          <input type="checkbox" :checked="selected_item_ids_from_props !== null ? selected_item_ids_from_props.find(id => checkbox.id === id) : selected_ids.find(id => checkbox.id === id)" @change="onChange(checkbox)">
          <span class="checkmark outline-content"></span>
        </label>
      </div>
    </div>

  </div>

</template>

<script>
import {mapState} from "vuex";

export default {
  name: "v-checkboxes-normal",
  props: ['checkboxes', 'label', 'span', 'checked', 'selected_item_ids'],
  computed: mapState({
    lang: state => state.lang.LANG
  }),
  data(){
    return{
      selected_ids: [],
      selected_item_ids_from_props: null
    }
  },
  mounted() {
    this.checkboxes.forEach(checkbox => {
      this.selected_ids.push(checkbox.id)
    })
    this.sendEmit()
  },
  methods: {
    onChange(item){
      if(this.selected_ids.find(select_id => select_id === item.id))
        this.selected_ids.splice(this.selected_ids.indexOf(item.id), 1);

      else
        this.selected_ids.push(item.id)
      this.sendEmit()
    },
    sendEmit(){
      this.$emit('select', this.selected_ids)
    }
  }
}
</script>

<style scoped>
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

/* Hide the browser's default checkbox */
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 18px;
  width: 18px;
  background-color: #eee;
}

/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.container input:checked ~ .checkmark {
  background-color: #ba6f0b;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.container .checkmark:after {
  left: 6px;
  top: 3px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>