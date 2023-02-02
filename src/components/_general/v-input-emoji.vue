<template>
  <div class="d-flex a-items-flex-end">
    <div class="d-grid w-max">
      <label for="" class="f-weight-bold">{{label}}</label>
      <span class="f-size-very-small">{{span}}</span>
      <textarea v-model="value" class="w-max outline-content form-standard" :placeholder="this.placeholder"  @change="changeValue"></textarea>
    </div>
    <discord-picker class="padding-02" @emoji="addEmoji"></discord-picker>
  </div>
</template>

<script>
import DiscordPicker from 'vue3-discordpicker'

export default {
  name: "v-input-emoji",
  components: {DiscordPicker},
  props: ['label', 'span', 'placeholder', 'default_value'],
  data(){
    return{
      value: this.default_value || ''
    }
  },
  methods: {
    addEmoji (emoji) {
      this.value += emoji
      this.changeValue()
    },
    changeValue(){
      this.$emit('value', this.value)
    }
  }
}
</script>

<style scoped>
textarea{
  resize: none;
  height: 3em;
  font-size: 14px;
}
</style>