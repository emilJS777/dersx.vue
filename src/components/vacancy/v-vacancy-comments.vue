<template>
  <div class="vacancy_comment d-grid m-top-2 padding-05" v-for="vacancy_comment in vacancy_comments" :key="vacancy_comment.id">
    <div class="d-grid g-gap-1 p-relative">
      <v-user-mini-block :user="vacancy_comment.user"/>
    </div>
    <p class="m-left-1 m-right-1 padding-right-1 m-bottom-0">{{vacancy_comment.text}}</p>

    <div>
      <span class="m-top-1 m-left-1 f-size-small ">опубликовано {{ vacancy_comment.creation_date }}</span>
      <div class="edit d-flex g-gap-1 f-right m-right-1" v-if="profile && vacancy_comment.user.id === profile.id">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash err-msg c-pointer animation-from-hidden" viewBox="0 0 16 16"
               @click="setModalName('vacancyCommentDeleteAlert', vacancy_comment.id)">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
          </svg>

        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square c-pointer animation-from-hidden" viewBox="0 0 16 16"
             @click="setModalName('vacancyCommentEditModal', vacancy_comment.id)">
          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
          <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
        </svg>
      </div>
    </div>
  </div>

  <h3 class="c-ccc" v-if="!vacancy_comments.length">комментарии не найдены</h3>
  <div v-else class="d-flex j-content-flex-end">
    <v-paginate
        class="paginate"
        :page-count="page_count"
        :click-handler="clickPage"
        :prev-text="'prev'"
        :next-text="'next'"
        :page="page"
        :container-class="'className'"
        :force-page="page">
    </v-paginate>
  </div>

  <!--  MODALS-->
  <v-vacancy-comment-edit-form :vacancy_comment_id="this.id"
                               v-if="modalName === 'vacancyCommentEditModal'"
                               @success_edit="()=>{setModalName(false);this.$emit('refreshModal')}"
                               @close="setModalName(false)"/>

  <!--  ALERTS-->
  <v-alert-modal v-if="modalName === 'vacancyCommentDeleteAlert'"
                 label="вы действительно хотите удалить данную комментарии ?"
                 @confirm="deleteVacancyComment"
                 @close="setModalName(false)"/>
</template>

<script>
import paginateMixin from "@/mixins/paginate-mixin";
import {mapState} from "vuex";
import toggleMixin from "@/mixins/toggle-mixin";
import VAlertModal from "@/components/_general/v-alert-modal";
import VVacancyCommentEditForm from "@/components/vacancy/forms/v-vacancy-comment-edit-form";
import VUserMiniBlock from "@/components/_general/v-user-mini-block";

export default {
  name: "v-vacancy-comments",
  components: {VUserMiniBlock, VVacancyCommentEditForm, VAlertModal},
  props: ['vacancy_id'],
  mixins: [paginateMixin, toggleMixin],
  computed: mapState({
    profile: state => state.auth.profile
  }),
  data(){
    return{
      vacancy_comments: []
    }
  },
  mounted() {
    this.getVacancyComments()
  },
  methods: {
    clickPage(selectedPage){
      this.page = selectedPage
      this.getVacancyComments()
    },
    getVacancyComments(){
      this.emitter.emit("load", true)
      this.$store.dispatch("vacancy_comment/GET", `?page=${this.page}&per_page=${this.per_page}&vacancy_id=${this.vacancy_id}`).then(data => {
        this.vacancy_comments = data.obj.items
        this.setPaginate(data.obj.pages, data.obj.page, data.obj.per_page)
      }).finally(() => this.emitter.emit("load", false))
    },
    deleteVacancyComment(){
      this.emitter.emit("load", true)
      this.$store.dispatch("vacancy_comment/DELETE", this.id).then(data => {
        if(data.success){
          this.setModalName(false)
          this.$emit('refreshModal')
        }
        else
          this.emitter.emit("message", data)

      }).finally(() => this.emitter.emit("load", false))
    }
  }
}
</script>

<style scoped>
.vacancy_comment{
  background-color: rgba(210, 210, 210, 0.1);
}
.edit{
  height: 20px;
}
.edit svg{
  display: none;
}
.vacancy_comment:hover svg{
  display: block;
}
</style>