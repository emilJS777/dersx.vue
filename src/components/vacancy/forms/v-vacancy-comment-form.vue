<template>
  <div class="vacancy_comment m-top-2 d-grid a-items-flex-end">

    <v-input-emoji
        @value="value => form.text = value"
        :label="lang.vacancies.your_comment.title"
        :span="lang.vacancies.your_comment.description"
        :placeholder="lang.vacancies.your_comment.placeholder"/>

    <div class="btn_block d-flex j-content-flex-end g-gap-1 m-top-1">
      <v-button-normal class="bg-content" :label="lang.general.send" @click="onVacancyComment" v-if="profile"/>
    </div>

  </div>
</template>

<script>
import VButtonNormal from "@/components/_general/v-button-normal";
import {mapState} from "vuex";
import VInputEmoji from "@/components/_general/v-input-emoji.vue";
export default {
  components: {VInputEmoji, VButtonNormal},
  props: ['vacancy_id'],
  computed: mapState({
    profile: state => state.auth.profile,
    lang: state => state.lang.LANG
  }),
  data(){
    return{
      form: {
        text: '',
        vacancy_id: this.vacancy_id
      },
    }
  },
  methods: {
    onVacancyComment(){
      this.emitter.emit("load", true)
      this.$store.dispatch("vacancy_comment/CREATE", this.form).then(data => {
        if(!data.success)
          this.emitter.emit('message', data)
        else{
          this.$emit('on_comment_success')
        }
      }).finally(() => this.emitter.emit("load", false))
    }
  }
}
</script>

<style scoped>
.vacancy_comment{
  grid-template-columns: 4fr 1fr;
}
</style>
