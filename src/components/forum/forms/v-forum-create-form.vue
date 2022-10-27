<template>
  <div class="modal d-flex j-content-center a-items-center">
    <div class="modal-content animation-from-hidden h-max-content">
      <h2 class="m-top-0">новый форум</h2>

      <v-input-normal label="название"
                      span="минимум 6 и максимум 80 символов"
                      @value="value => form.title = value"/>

      <v-input-normal label="тема"
                      span="минимум 16 и максимум 480 символов"
                      class="m-top-1"
                      @value="value => form.topic = value"/>

      <v-select-normal label="рубрика" span="выберите сферу" class="m-top-1"
                       :items="rubrics"
                       :selected="rubrics[0]"
                       v-if="rubrics.length"
                       @select="item => form.rubric_id = item.id"/>

      <div class="d-flex g-gap-_5 m-top-2 j-content-flex-end">
        <v-button-normal label="создать" class="bg-content" @click="onForum"/>
        <v-button-normal label="отменить" @click="this.$emit('close')"/>
      </div>

    </div>
  </div>
</template>

<script>
import VInputNormal from "@/components/_general/v-input-normal";
import VSelectNormal from "@/components/_general/v-select-normal";
import VButtonNormal from "@/components/_general/v-button-normal";
export default {
  name: "v-forum-create-form",
  components: {VButtonNormal, VSelectNormal, VInputNormal},
  data(){
    return{
      rubrics: [],
      form:{
        title: '',
        topic: '',
        rubric_id: null,
      }
    }
  },
  mounted(){
    this.emitter.emit('load', true)
    this.$store.dispatch("rubric/GET", '').then(data => {
      this.rubrics = data.obj
    }).finally(() => this.emitter.emit('load', false))
  },
  methods:{
    onForum(){
      this.emitter.emit('load', true)
      this.$store.dispatch("forum/CREATE", this.form).then(data => {
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