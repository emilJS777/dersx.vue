<template>
  <div class="d-flex g-gap-2 a-items-flex-end m-top-2">
    <v-input-normal label="комментировать"
                    span="прокомментируйте данную публикацию " @value="value => form.text = value"/>

    <v-button-normal label="опубликовать "
                     @click="setModalName('publicationCommentCreateAlert')"/>
  </div>

  <v-alert-modal label="опубликовать комментарии ?"
                 v-if="modalName === 'publicationCommentCreateAlert'"
                 @close="setModalName(false)"
                 @confirm="onPublicationComment"/>
</template>

<script>
import VButtonNormal from "@/components/_general/v-button-normal";
import VInputNormal from "@/components/_general/v-input-normal";
import toggleMixin from "@/mixins/toggle-mixin";
import VAlertModal from "@/components/_general/v-alert-modal";
export default {
  name: "v-publication-comment-create-form",
  components: {VAlertModal, VInputNormal, VButtonNormal},
  props: ['publication_id'],
  mixins: [toggleMixin],
  data(){
    return{
      form:{
        text: '',
      }
    }
  },
  methods:{
    onPublicationComment(){
      this.form.publication_id = this.publication_id
      this.emitter.emit('load', true)
      this.$store.dispatch("publication_comment/CREATE", this.form).then(data => {
        if(!data.success) {
          this.setModalName(false)
          this.emitter.emit('message', data)
        }
        else
          this.$emit('refresh_modal')
      }).finally(() => this.emitter.emit('load', false))
    }
  }
}
</script>

<style scoped>

</style>