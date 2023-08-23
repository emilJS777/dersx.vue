<template>
    <div class="d-grid">
        <label for="" class="f-weight-bold">{{label}}</label>
        <span class="f-size-very-small" v-html="span"></span>


        <div class="d-flex a-items-center">
            <div class="d-flex a-items-center p-relative  w-max">
                <textarea v-model="this.value" class="w-max outline-content form-standard" :placeholder="this.placeholder"  @change="changeValue"></textarea>
                <div class="emoji_block f-size-22 padding-02 m-top-1_5 m-left-05">
                  <div class="emoji_block c-pointer l-height-0">
                    <span class="emoji_block" v-if="!emojiShow" @click="this.emojiShow=true;">{{ this.emojis[0] }}</span>
                    <span v-else class="bg-ccc-opacity padding-02 f-size-22"  @click="this.emojiShow=false;">✕</span>
                  </div>
                  <div class="emoji_block p-absolute z-index-1 d-flex right-0 g-gap-_3 bg-ccc padding-02 b-radius-8 animation-from-hidden m-top-05" v-if="emojiShow">
                    <span v-for="(emoji, index) in emojis" :key="index" class="c-pointer" @click="this.value+=emoji;changeValue();this.emojiShow=false;">{{emoji}}</span>
                  </div>
                </div>
<!--                <discord-picker style="margin-bottom: -2px;" class="padding-02 d-flex a-items-center" @emoji="addEmoji"></discord-picker>-->
            </div>
        </div>
    </div>
</template>

<script>
// import DiscordPicker from 'vue3-discordpicker'

export default {
  name: "v-input-emoji",
  // components: {DiscordPicker},
  props: ['label', 'span', 'placeholder', 'default_value'],
  data(){
    return{
      value: this.default_value || '',
      emojis: [
          '😀',
          '🙃',
          '😉',
          '😍',
          '😘',
          '🧐',
          '🤣',
          '😎',
          '🤩',
          '🥳',
          '😡',
          '🥺',
          '😢',
          '😤',
          '🤮',
          '🥶',
          '🤑'
      ],
      emojiShow: false
    }
  },
    mounted() {
      if(this.default_value) {
          this.value = this.value.replace(/<br>/g, '\n')
          this.value = this.value.replace(/<a\b[^>]*>|<\/a>/gi, '');
      }

      document.addEventListener('click', (event) => {
        if(!event.target.classList.contains('emoji_block') && this.emojiShow === true){
          this.emojiShow = false;
        }
      });
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