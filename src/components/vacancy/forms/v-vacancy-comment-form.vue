<template>
  <div class="vacancy_comment m-top-2">
    <v-textarea-normal
        v-if="profile"
        @value="value => form.text = value"
        label="ваш комментарии "
        span="не более чем 1500 символов"
        placeholder="напишите как вы относитесь к этому проекту "/>

    <div class="btn_block d-flex j-content-flex-end g-gap-1 m-top-1">
      <v-button-normal class="bg-content" label="отправить" @click="onVacancyComment" v-if="profile"/>
      <v-button-normal label="закрыть" @click="this.$emit('close')"/>
    </div>

  </div>
</template>

<script>
import VTextareaNormal from "@/components/_general/v-textarea-normal";
import VButtonNormal from "@/components/_general/v-button-normal";
import {mapState} from "vuex";
export default {
  components: {VButtonNormal, VTextareaNormal},
  props: ['vacancy_id'],
  computed: mapState({
    profile: state => state.auth.profile
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

</style>
