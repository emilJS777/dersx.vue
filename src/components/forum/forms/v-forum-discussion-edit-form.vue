<template>
  <div class="modal d-flex j-content-center a-items-center">
    <div class="modal-content animation-from-hidden h-max-content">
      <div class="d-flex a-items-flex-end g-gap-1">
        <v-input-normal label="редактировать свой ответ"
                        span="не более 4000 символов"
                        v-if="form.description !== null"
                        :default_value="form.description"
                        @value="value => form.description = value"/>
      </div>
      <div class="btns m-top-1 d-flex g-gap-_3 j-content-flex-end">
        <v-button-normal label="обновить"
                         @click="setModalName('forumDiscussionEditAlert')"
                         class="bg-content"/>

        <v-button-normal label="отменить"
                         @click="this.$emit('close')"/>
      </div>
    </div>
  </div>

  <v-alert-modal label="вы дествительно хотите обновить ваш ответ ?"
                 v-if="modalName === 'forumDiscussionEditAlert'"
                 @confirm="updateForumDiscussion"
                 @close="this.$emit('close')"/>
</template>

<script>
import VInputNormal from "@/components/_general/v-input-normal";
import VButtonNormal from "@/components/_general/v-button-normal";
import toggleMixin from "@/mixins/toggle-mixin";
import VAlertModal from "@/components/_general/v-alert-modal";
export default {
  name: "v-forum-discussion-edit-form",
  components: {VAlertModal, VButtonNormal, VInputNormal},
  props: ['forum_discussion_id'],
  mixins: [toggleMixin],
  data(){
    return{
      form:{
        description: null,
        forum_id: null
      }
    }
  },
  mounted() {
    this.emitter.emit('load', true)
    this.$store.dispatch("forum_discussion/GET", `?id=${this.forum_discussion_id}`).then(data => {
      this.form.description = data.obj.description
      this.form.forum_id = data.obj.forum_id
    }).finally(() => this.emitter.emit('load', false))
  },
  methods: {
    updateForumDiscussion(){
      this.emitter.emit('load', true)
      this.$store.dispatch("forum_discussion/UPDATE", {id: this.forum_discussion_id, form: this.form}).then(data => {
        if(data.success)
          this.$emit('refresh_modal')
        else {
          this.emitter.emit('message', data)
          this.setModalName(false)
        }
      }).finally(() => this.emitter.emit('load', false))
    }
  }
}
</script>

<style scoped>
.modal-content{
  width: 40%;
}
</style>