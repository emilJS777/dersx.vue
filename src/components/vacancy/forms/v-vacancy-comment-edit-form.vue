<template>
  <div  class="padding-1">
    <div class="h-max-content d-grid edit_block a-items-flex-end g-gap-1">
      <v-input-emoji @value="value => form.text = value"
                     :default_value="form.text"
                     v-if="typeof form.text === 'string'"
                     :label="lang.vacancies.your_comment.title"
                     :span="lang.vacancies.your_comment.description"
                     :placeholder="lang.vacancies.your_comment.placeholder"/>

      <div>
        <div class="btn_block d-flex j-content-flex-end g-gap-1 m-top-1">
          <v-button-normal class="bg-content" :label="lang.general.confirm" @click="setModalName('vacancyCommentEditAlert')"/>
          <v-button-normal :label="lang.general.cancel" @click="this.$emit('close')"/>
        </div>
      </div>
    </div>
  </div>

<!--  ALERT-->
  <v-alert-modal :label="lang.general.comment_edit.confirm"
                 v-if="modalName === 'vacancyCommentEditAlert'"
                 @close="setModalName(false)"
                 @confirm="onEditVacancyComment"/>
</template>

<script>
import VButtonNormal from "@/components/_general/v-button-normal";
import VAlertModal from "@/components/_general/v-alert-modal";
import toggleMixin from "@/mixins/toggle-mixin";
import VInputEmoji from "@/components/_general/v-input-emoji.vue";
import {mapState} from "vuex";
export default {
  name: "v-vacancy-comment-edit-form",
  components: {VInputEmoji, VAlertModal, VButtonNormal},
  props: ['vacancy_comment_id'],
  mixins: [toggleMixin],
  computed: mapState({
    lang: state => state.lang.LANG
  }),
  data(){
    return{
      form: {
        text: null
      }
    }
  },
  mounted() {
    this.emitter.emit("load", true)
    this.$store.dispatch("vacancy_comment/GET", `?id=${this.vacancy_comment_id}`).then(data => {
      this.form.text = data.obj.text
    }).finally(() => this.emitter.emit("load", false))
  },
  methods: {
    onEditVacancyComment(){
      this.emitter.emit("load", true)
      this.$store.dispatch("vacancy_comment/UPDATE", {id: this.vacancy_comment_id, form: this.form}).then(data => {
        if(data.success)
          this.$emit('success_edit')
        else{
          this.setModalName(false)
          this.emitter.emit("message", data)
        }
      }).finally(() => this.emitter.emit("load", false))
    }
  }
}
</script>

<style scoped>
.edit_block{
  grid-template-columns: 4fr 1fr;
}
</style>