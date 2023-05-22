<template>
  <div class="d-flex j-content-space-between a-items-center">
    <v-user-mini-block :user="user"/>
    <v-button-normal :icon="this.invited ? 'fa fa-remove' : 'fa fa-user-plus'"
                     :label="this.invited ? 'отменить' : 'пригласить'"
                     class="w-max-content f-size-very-small c-content"
                     @click="this.invited ? inviteDelete() : inviteCreate()"/>
  </div>
</template>

<script>
import VUserMiniBlock from "@/components/_general/v-user-mini-block";
import VButtonNormal from "@/components/_general/v-button-normal";
export default {
  name: "v-group-invite",
  components: {VButtonNormal, VUserMiniBlock},
  props: ['user', 'group'],
  data(){
    return{
      invited: false
    }
  },
  mounted() {
    this.emitter.emit('load', true)
    this.$store.dispatch("group_invite/GET", `?group_id=${this.group.id}&user_id=${this.user.id}`).then(data => {
      if(data.success)
        this.invited = true
    }).finally(() => this.emitter.emit('load', false))
  },
  methods: {
    inviteCreate(){
      this.emitter.emit('load', true)
      this.$store.dispatch("group_invite/CREATE", {group_id: this.group.id, user_id: this.user.id}).then(data => {
        if(data.success)
          this.invited = true
        else
          this.emitter.emit('message', data)
      }).finally(() => this.emitter.emit('load', false))
    },
    inviteDelete(){
      this.emitter.emit('load', true)
      this.$store.dispatch("group_invite/DELETE", `?group_id=${this.group.id}&user_id=${this.user.id}`).then(data => {
        if(data.success)
          this.invited = false
        else
          this.emitter.emit('message', data)
      }).finally(() => this.emitter.emit('load', false))
    }
  }
}
</script>

<style scoped>

</style>