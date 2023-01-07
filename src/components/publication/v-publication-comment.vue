<template>
  <div class="publication_comment m-top-2 d-grid bg-ccc-opacity padding-1">
    <div class="d-flex j-content-space-between a-items-center p-relative">
      <div class="d-grid g-gap-1 p-relative">
        <v-user-mini-block :user="publication_comment.creator"/>
      </div>
      <v-menu-normal v-if="profile && profile.id === publication_comment.creator.id"
                     @edit="setModalName('publicationCommentEditBlock')"
                     @delete="this.setModalName('publicationCommentDeleteAlert')"
                     :menu_list="[{title: 'редактировать', icon_class: 'fa fa-pencil-square', class: '', emit_name: 'edit'},
                                    {title: 'удалить', icon_class: 'fa fa-times-circle', class: 'c-red', emit_name: 'delete'}]"/>
    </div>
    <span class="f-size-small m-top-1">{{publication_comment.text}}</span>

    <div class="d-flex j-content-space-between a-items-center">
      <p class="m-bottom-0 f-size-small"><b>опубликовано</b> {{publication_comment.creation_date}}</p>
    </div>

    <v-publication-comment-edit-form v-if="modalName === 'publicationCommentEditBlock' && this.publication_comment"
                                     @refresh="this.$emit('refresh_modal')"
                                     :publication_comment="publication_comment"
                                     @close="setModalName(false)"/>
  </div>

<!--  ALERTS-->
  <v-alert-modal label="вы дествительно хотите удалить комментарий ?"
                 @close="setModalName(false)"
                 @confirm="onDeletePublicationComment"
                 v-if="this.modalName === 'publicationCommentDeleteAlert'"/>
</template>

<script>
import VUserMiniBlock from "@/components/_general/v-user-mini-block";
import {mapState} from "vuex";
import toggleMixin from "@/mixins/toggle-mixin";
import VAlertModal from "@/components/_general/v-alert-modal";
import VPublicationCommentEditForm from "@/components/publication/forms/v-publication-comment-edit-form";
import VMenuNormal from "@/components/_general/v-menu-normal.vue";
export default {
  name: "v-publication-comment",
  components: {VMenuNormal, VPublicationCommentEditForm, VAlertModal, VUserMiniBlock},
  mixins: [toggleMixin],
  props: ['publication_comment'],
  computed: mapState({
    profile: state => state.auth.profile
  }),
  methods:{
    onDeletePublicationComment(){
      this.emitter.emit('load', true)
      this.$store.dispatch("publication_comment/DELETE", this.publication_comment.id).then(data => {
        if(data.success) {
          this.setModalName(false)
          this.$emit('refresh_modal')
        }
        else
          this.emitter.emit('message', data)
      }).finally(() => this.emitter.emit('load', false))
    }
  }
}
</script>

<style scoped>
.publication_comment:hover .edit{
  display: flex;
}
</style>
