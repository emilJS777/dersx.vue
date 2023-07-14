<template>
  <div class="vacancy_comment d-grid m-top-2 padding-1 g-gap-1" v-for="vacancy_comment in vacancy_comments" :key="vacancy_comment.id">
    <div class="d-grid g-gap-1 p-relative">
      <v-user-mini-block :user="vacancy_comment.user"/>
      <v-menu-normal v-if="profile && profile.id === vacancy_comment.user.id"
                     @edit="setModalName('vacancyCommentEditModal', vacancy_comment.id)"
                     @delete="setModalName('vacancyCommentDeleteAlert', vacancy_comment.id)"
                     :opening="true"
                     :menu_list="[{title: lang.general.redactor, icon_class: 'fa fa-pencil-square', class: '', emit_name: 'edit'},
                                    {title: lang.general.delete, icon_class: 'fa fa-times-circle', class: 'c-red', emit_name: 'delete'}]"/>
    </div>
    <p class="m-left-1 m-right-1 padding-right-1 m-bottom-0" v-html="vacancy_comment.text"></p>

    <div>
      <span class="m-top-1 m-left-1 f-size-small ">{{ lang.general.published }} {{ vacancy_comment.creation_date }}</span>
    </div>

    <v-vacancy-comment-edit-form :vacancy_comment_id="this.id"
                                 v-if="modalName === 'vacancyCommentEditModal' && this.id === vacancy_comment.id"
                                 @success_edit="()=>{setModalName(false);this.$emit('refreshModal')}"
                                 @close="setModalName(false)"/>
  </div>

  <h3 class="c-ccc t-center" v-if="!vacancy_comments.length">{{ lang.general.nothing_found }}</h3>
  <div v-else class="d-flex j-content-flex-end m-top-1">
    <v-paginate
        class="paginate"
        :page-count="page_count"
        :click-handler="clickPage"
        :prev-text="'❮'"
        :next-text="'❯'"
        :page="page"
        :container-class="'className'"
        :force-page="page">
    </v-paginate>
  </div>

  <!--  MODALS-->


  <!--  ALERTS-->
  <v-alert-modal v-if="modalName === 'vacancyCommentDeleteAlert'"
                 :label="lang.general.comment_delete.confirm"
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
import VMenuNormal from "@/components/_general/v-menu-normal.vue";
import localTimeMixin from "@/mixins/local-time-mixin";

export default {
  name: "v-vacancy-comments",
  components: {VMenuNormal, VUserMiniBlock, VVacancyCommentEditForm, VAlertModal},
  props: ['vacancy_id'],
  mixins: [paginateMixin, toggleMixin, localTimeMixin],
  computed: mapState({
    profile: state => state.auth.profile,
    lang: state => state.lang.LANG
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
    setSmartTime(){
      this.vacancy_comments.map(comment => {
        this.getLocalTime(comment.creation_date)
        comment.creation_date = this.date_time
      })
    },
    getVacancyComments(){
      this.emitter.emit("load", true)
      this.$store.dispatch("vacancy_comment/GET", `?page=${this.page}&per_page=${this.per_page}&vacancy_id=${this.vacancy_id}`).then(data => {
        this.vacancy_comments = data.obj.items
        this.setPaginate(data.obj.pages, data.obj.page, data.obj.per_page)
      }).finally(() => {
        this.emitter.emit("load", false)
        this.setSmartTime()
      })
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
.edit svg{
  display: none;
}
.vacancy_comment:hover svg{
  display: block;
}
</style>