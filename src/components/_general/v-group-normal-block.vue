<template>
  <div class="group_block p-relative">
    <div class="d-flex a-items-flex-start g-gap-_5 p-relative w-max-content">
      <a :href="`/group?id=${group.id}`" class="img_block b-content-hover p-relative c-pointer o-hidden b-radius-8 d-flex j-content-center a-items-center">
        <span class="c-ccc" v-if="!group.image">
          <i class="fa fa-users fa-2x"></i>
        </span>
        <img :src="`${web_api}/image?filename=${group.image.filename}`" v-else/>
      </a>
      <div class="d-grid info_block j-content-flex-end f-size-small">
        <h4 class="m-top-0 m-bottom-0">{{ group.title }}</h4>
        <span class="f-size-very-small">{{ group.user_count }} участника</span>
        <div class="d-flex m-top-05">
          <span v-if="group.creator_id === profile.id">моя группа</span>
          <v-button-normal label="покинуть" class="f-size-very-small err-msg" icon="fa fa-close" v-else-if="group.entered"/>
          <v-button-normal label="вступить" class="f-size-very-small c-content" icon="fa fa-plus" v-else/>
        </div>
      </div>
    </div>

    <v-menu-normal v-if="group.creator_id === profile.id && menu" :menu_list="[
        {title: 'редактировать', icon_class: 'fa fa-edit'},
        {title: 'удалить', icon_class: 'fa fa-trash', emit_name: 'deleteGroupAlert'}]"
        @deleteGroupAlert="setModalName('deleteGroupAlert')"/>


    <v-alert-modal v-if="modalName === 'deleteGroupAlert'"
                   label="вы дествительно хотите удалить группу ?"
                   @close="setModalName(false)"
                   @confirm="GroupDelete"/>
  </div>
</template>

<script>
import VButtonNormal from "@/components/_general/v-button-normal";
import {mapState} from "vuex";
import VMenuNormal from "@/components/_general/v-menu-normal";
import VAlertModal from "@/components/_general/v-alert-modal";
import toggleMixin from "@/mixins/toggle-mixin";
export default {
  name: "v-group-normal-block",
  components: {VAlertModal, VMenuNormal, VButtonNormal},
  props: ['group', 'menu'],
  mixins: [toggleMixin],
  computed: mapState({
    profile: state => state.auth.profile
  }),
  data(){
    return{
      web_api: process.env.WEB_API
    }
  },
  methods: {
    GroupDelete(){
      this.emitter.emit('load', true)
      this.$store.dispatch("group/DELETE", this.group.id).then(data => {
        this.emitter.emit('message', data)
      }).finally(() => this.emitter.emit('load', false))
    }
  }
}
</script>

<style scoped>
.img_block{
  border: 1px solid #ccc;
  height: 75px;
  width: 75px;
}
img{
  width: auto;
  max-width: 100%;
  height: auto;
  max-height: 100%;
}
</style>