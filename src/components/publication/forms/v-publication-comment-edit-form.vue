<template>
  <div class="d-flex g-gap-2 a-items-flex-end m-top-2 padding-left-1 padding-right-1">
    <v-input-normal
                    :default_value="form.text"
                    v-if="form.text !== null"
                    span="редактировать комментарий" @value="value => form.text = value"/>

    <div class="d-flex g-gap-_5">
      <v-button-normal label="обновить"
                       @click="setModalName('publicationCommentUpdateAlert')"/>
      <v-button-normal label="отменить" @click="this.$emit('close')"/>
    </div>
  </div>


  <!-- ALERTS -->
  <v-alert-modal label="ви хотите обновить коментарий ?"
                 v-if="modalName === 'publicationCommentUpdateAlert'"
                 @close="setModalName(false)"
                 @confirm="onEditPublicationComment"/>
</template>

<script>
import VAlertModal from "@/components/_general/v-alert-modal";
import VInputNormal from "@/components/_general/v-input-normal";
import VButtonNormal from "@/components/_general/v-button-normal";
import toggleMixin from "@/mixins/toggle-mixin";

export default {
  name: "v-publication-comment-edit-form",
  components: {VAlertModal, VInputNormal, VButtonNormal},
  props: ['publication_comment'],
  mixins: [toggleMixin],
  data(){
    return{
      form:{
        text: null,
      }
    }
  },
  mounted() {
    this.form.text = this.publication_comment.text
  },
  methods: {
    onEditPublicationComment() {
      this.emitter.emit('load', true)
      this.$store.dispatch("publication_comment/UPDATE", {id: this.publication_comment.id, form: this.form}).then(data => {
        if(data.success)
          this.$emit('refresh')
        else
          this.emitter.emit("message", data)
      }).finally(() => this.emitter.emit('load', false))
    }
  }
}
</script>

<style scoped>

</style>
