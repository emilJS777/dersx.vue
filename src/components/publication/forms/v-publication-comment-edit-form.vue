<template>
  <div :class="`${mobile ? 'd-grid g-gap-_5' : 'd-flex g-gap-2'}  a-items-flex-end m-top-2 padding-left-1 padding-right-1`">
    <v-input-emoji :default_value="form.text"
                   v-if="form.text !== null"
                   class="w-max"
                   :span="lang.general.comment_edit.title" @value="value => form.text = value"/>

    <div class="d-flex g-gap-_5">
      <v-button-normal :label="lang.general.update"
                       class="bg-content"
                       @click="onEditPublicationComment"/>
      <v-button-normal :label="lang.general.cancel" @click="this.$emit('close')"/>
    </div>
  </div>


  <!-- ALERTS -->
<!--  <v-alert-modal :label="lang.general.comment_edit.confirm"-->
<!--                 v-if="modalName === 'publicationCommentUpdateAlert'"-->
<!--                 @close="setModalName(false)"-->
<!--                 @confirm="onEditPublicationComment"/>-->
</template>

<script>
// import VAlertModal from "@/components/_general/v-alert-modal";
import VButtonNormal from "@/components/_general/v-button-normal";
import toggleMixin from "@/mixins/toggle-mixin";
import VInputEmoji from "@/components/_general/v-input-emoji.vue";
import {mapState} from "vuex";
import validateMixin from "@/mixins/validate-mixin";
import validator from "@/validations/comment.json"
import deviceMixin from "@/mixins/device-mixin";

export default {
  name: "v-publication-comment-edit-form",
  components: {VInputEmoji, VButtonNormal},
  props: ['publication_comment'],
  mixins: [toggleMixin, validateMixin, deviceMixin],
  data(){
    return{
      form:{
        text: null,
      }
    }
  },
    computed: mapState({
        lang: state => state.lang.LANG
    }),
  mounted() {
    this.form.text = this.publication_comment.text
  },
  methods: {
    onEditPublicationComment() {
      if(this.checkValid(this.form, validator, false)){
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
}
</script>

<style scoped>

</style>
