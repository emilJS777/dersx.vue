<template>
  <div class="bg-fff m-top-1 padding-1 d-grid g-gap-2">
    <div class="d-flex a-items-flex-end g-gap-1">
      <v-input-normal label="напешите свой ответ"
                      span="не более 4000 символов"
                      @value="value => form.description = value"/>
      <v-button-normal label="отправить" @click="onForumDiscussion"/>
    </div>
  </div>
</template>

<script>
import VButtonNormal from "@/components/_general/v-button-normal";
import VInputNormal from "@/components/_general/v-input-normal";
export default {
  name: "v-forum-discussion-create-form",
  components: {VInputNormal, VButtonNormal},
  props: ['forum_id'],
  data(){
    return{
      form:{
        description: '',
        forum_id: this.forum_id
      }
    }
  },
  methods: {
    onForumDiscussion(){
      this.emitter.emit("load", true)
      this.$store.dispatch("forum_discussion/CREATE", this.form).then(data => {
        if(data.success)
          this.$emit("refresh_modal")
        else
          this.emitter.emit("message", data)
      }).finally(() => this.emitter.emit("load", false))
    }
  }
}
</script>

<style scoped>

</style>