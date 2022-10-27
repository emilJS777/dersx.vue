<template>
  <div class="modal d-flex j-content-center a-items-center" v-if="form.rubric">
    <div class="modal-content animation-from-hidden h-max-content">
      <h2 class="m-top-0">новый форум</h2>

      <v-input-normal label="название"
                      span="минимум 6 и максимум 80 символов"
                      :default_value="form.title"
                      @value="value => form.title = value"/>

      <v-input-normal label="тема"
                      span="минимум 16 и максимум 480 символов"
                      class="m-top-1"
                      :default_value="form.topic"
                      @value="value => form.topic = value"/>

      <v-select-normal label="рубрика" span="выберите сферу" class="m-top-1"
                       :items="rubrics"
                       :selected="form.rubric"
                       v-if="rubrics.length"
                       @select="item => form.rubric_id = item.id"/>

      <div class="d-flex g-gap-_5 m-top-2 j-content-flex-end">
        <v-button-normal label="изменить" class="bg-content" @click="setModalName('editForumAlert')"/>
        <v-button-normal label="отменить" @click="this.$emit('close')"/>
      </div>
    </div>
  </div>

<!--  ALERT-->
  <v-alert-modal label="вы хотите изменить форум ?"
                 v-if="modalName === 'editForumAlert'"
                 @confirm="updateForum"
                 @close="this.$emit('close')"/>
</template>

<script>
import VInputNormal from "@/components/_general/v-input-normal";
import VSelectNormal from "@/components/_general/v-select-normal";
import VButtonNormal from "@/components/_general/v-button-normal";
import VAlertModal from "@/components/_general/v-alert-modal";
import toggleMixin from "@/mixins/toggle-mixin";
export default {
  name: "v-forum-edit-form",
  components: {VAlertModal, VButtonNormal, VSelectNormal, VInputNormal},
  props: ['forum_id'],
  mixins: [toggleMixin],
  data(){
    return{
      rubrics: [],
      form:{
        id: this.forum_id,
        title: '',
        topic: '',
        rubric: null,
        rubric_id: null,
      }
    }
  },
  mounted() {
    // FORUM GET
    this.emitter.emit('load', true)
    this.$store.dispatch("forum/GET", `?id=${this.forum_id}`).then(data => {
      this.form.title = data.obj.title
      this.form.topic = data.obj.topic
      this.form.rubric = data.obj.rubric
      this.form.rubric_id = data.obj.rubric.id
    }).finally(() => this.emitter.emit('load', false))
    // RUBRICS GET
    this.emitter.emit('load', true)
    this.$store.dispatch("rubric/GET", '').then(data => {
      this.rubrics = data.obj
    }).finally(() => this.emitter.emit('load', false))
  },
  methods:{
    updateForum(){
      this.emitter.emit('load', true)
      this.$store.dispatch("forum/UPDATE", {id: this.forum_id, form: this.form}).then(data => {
        this.emitter.emit('message', data)
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