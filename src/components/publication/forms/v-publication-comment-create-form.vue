<template>
  <div :class="`${mobile ? 'd-grid g-gap-_5' : 'd-flex g-gap-2'}  w-max a-items-flex-end m-top-2`">
<!--    <v-input-normal label="комментировать"-->
<!--                    span="прокомментируйте данную публикацию " @value="value => form.text = value"/>-->
    <v-input-emoji :label="lang.general.commentate"
                   class="w-max"
                   :span="lang.general.comment_on_this_post" @value="value => form.text = value"/>

    <v-button-normal :label="lang.general.send"
                     @click="onPublicationComment"/>
  </div>

<!--  <v-alert-modal :label="lang.general.comment_confirm"-->
<!--                 v-if="modalName === 'publicationCommentCreateAlert'"-->
<!--                 @close="setModalName(false)"-->
<!--                 @confirm="onPublicationComment"/>-->
</template>

<script>
import VButtonNormal from "@/components/_general/v-button-normal";
import toggleMixin from "@/mixins/toggle-mixin";
// import VAlertModal from "@/components/_general/v-alert-modal";
import VInputEmoji from "@/components/_general/v-input-emoji.vue";
import {mapState} from "vuex";
import validateMixin from "@/mixins/validate-mixin";
import validator from "@/validations/comment.json"
import deviceMixin from "@/mixins/device-mixin";

export default {
  name: "v-publication-comment-create-form",
  components: {VInputEmoji, VButtonNormal},
  props: ['publication_id'],
  mixins: [toggleMixin, validateMixin, deviceMixin],
  data(){
    return{
      form:{
        text: '',
      }
    }
  },
  computed: mapState({
    lang: state => state.lang.LANG
  }),
  methods:{
    onPublicationComment(){
      this.form.publication_id = this.publication_id
      if(this.checkValid(this.form, validator, false)){
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
}
</script>

<style scoped>

</style>