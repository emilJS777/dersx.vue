<template>
    <div class="d-grid">
        <label for="" class="f-weight-bold">{{label}}</label>
        <span class="f-size-very-small">{{span}}</span>


        <div class="d-flex a-items-center">
            <div class="d-flex a-items-center  w-max">
                <textarea v-html="this.value.replace(/<br>/g, '\n')" class="w-max outline-content form-standard" :placeholder="this.placeholder"  @change="changeValue"></textarea>
                <discord-picker style="margin-bottom: -2px;" class="padding-02 d-flex a-items-center" @emoji="addEmoji"></discord-picker>
            </div>
        </div>
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
      this.$emit('value', this.value.replace(/\r?\n/g, '<br>'))
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