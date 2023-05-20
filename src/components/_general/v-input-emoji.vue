<template>
    <div class="d-grid">
        <label for="" class="f-weight-bold">{{label}}</label>
        <span class="f-size-very-small" v-html="span"></span>


        <div class="d-flex a-items-center">
            <div class="d-flex a-items-center  w-max">
                <textarea v-model="this.value" class="w-max outline-content form-standard" :placeholder="this.placeholder"  @change="changeValue"></textarea>
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
    mounted() {
      if(this.default_value) {
          this.value = this.value.replace(/<br>/g, '\n')
          this.value = this.value.replace(/<a\b[^>]*>|<\/a>/gi, '');
      }
    },
    methods: {
    addEmoji (emoji) {
      this.value += emoji
      this.changeValue()
    },
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
  height: 3em;
  font-size: 14px;
}
</style>