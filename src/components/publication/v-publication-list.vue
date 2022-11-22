<template>
  <div class="publication padding-2 bg-fff m-top-1 box-shadow-slim">
    <div class="head d-flex j-content-space-between a-items-flex-start">
      <v-user-mini-block :user="publication.creator"/>



      <div class="menu_block d-flex j-content-flex-end a-items-flex-start ">
        <ul class="d-flex g-gap-1 m-0-auto">
          <li class="d-flex g-gap-_5 c-content-hover c-pointer a-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
              <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
              <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
              <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
            </svg>
            скрыть
          </li>

          <li class="d-flex g-gap-_5 c-content-hover c-pointer err-msg a-items-center"
              v-if="profile && publication.creator.id === profile.id" @click="setModalName('publicationDeleteAlert')">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
            удалить
          </li>
        </ul>
      </div>
    </div>

<!--    PUBLICATION DESCRIPTION-->
    <p>{{ publication.description }}</p>

<!--    PUBLICATION IMAGE-->
    <div v-if="publication.image" class="w-max">
      <img :src="`http://127.0.0.1:5000/image?filename=${publication.image.filename}`" class="publication_image">
    </div>

<!--    PUBLICATION CREATION DATE-->
    <div class="d-grid g-gap-_5">
      <span class="f-size-small m-top-0">
        <b>опубликовано:</b> {{publication.creation_date}}
      </span>
    </div>

<!--    PUBLICATION FOOTER-->
    <div class="m-top-1 d-flex g-gap-1 j-content-space-between">
      <span class="c-pointer c-content f-size-small d-flex g-gap-_5 a-items-center f-weight-bold"
            v-if="modalName !== 'publicationComments'"
            @click="()=>{setModalName('publicationComments');publicationCommentGet()}">
        <i class="fa fa-comments" aria-hidden="true"></i>
        комментарий: {{ publication.comment_count }}
      </span>

      <span class="c-ccc f-size-small d-flex g-gap-_5 a-items-center f-weight-bold" v-else>
        <i class="fa fa-comments" aria-hidden="true"></i>
        комментарий: {{ publication.comment_count }}
      </span>

      <span class="c-pointer c-content f-size-small d-flex g-gap-_5 a-items-center f-weight-bold"
            @click="publicationLikeCreate"
            v-if="!publication_like.self_like && profile">
        <i class="fa fa-thumbs-up" aria-hidden="true"></i>
        нравится: {{ publication_like.like_count }}
      </span>

      <span class="c-pointer f-size-small d-flex g-gap-_5 a-items-center f-weight-bold"
            v-if="publication_like.self_like && profile"
            @click="publicationLikeDelete">
        <i class="fa fa-thumbs-up" aria-hidden="true"></i>
        нравится: {{ publication_like.like_count }} (вам понравился)
      </span>
    </div>

<!--    PUBLICATION COMMENT-->
    <div v-if="modalName === 'publicationComments'">
      <v-publication-comment-create-form v-if="profile"
                                         :publication_id="publication.id"
                                         @refresh_modal="()=>{this.setModalName('publicationComments');
                                           publication_comment.publication_comments = [];
                                           publicationCommentGet()}"/>

      <v-publication-comment v-for="comment_publication in publication_comment.publication_comments"
                             :key="comment_publication.id"
                             @refresh_modal="()=>{this.setModalName('publicationComments');
                                           publication_comment.publication_comments = [];
                                           publicationCommentGet()}"
                             :publication_comment="comment_publication"/>

      <p class="c-pointer t-decoration-underline-hover c-content f-size-small m-top-2"
            v-if="publication_comment.see_more"
            @click="publicationCommentGet(6, 6)">посмотреть еще</p>
    </div>

  </div>


<!--  ALERTS-->
  <v-alert-modal label="вы действительно хотите удалить публикацию ?"
                 v-if="modalName === 'publicationDeleteAlert'"
                 @close="setModalName(false)"
                 @confirm="publicationDelete"/>
</template>

<script>
import {mapState} from "vuex";
import toggleMixin from "@/mixins/toggle-mixin";
import VAlertModal from "@/components/_general/v-alert-modal";
import VPublicationCommentCreateForm from "@/components/publication/forms/v-publication-comment-create-form";
import VPublicationComment from "@/components/publication/v-publication-comment";
import VUserMiniBlock from "@/components/_general/v-user-mini-block";
export default {
  name: "v-publication-list",
  components: {VUserMiniBlock, VPublicationComment, VPublicationCommentCreateForm, VAlertModal},
  props: ["publication"],
  mixins: [toggleMixin],
  computed: mapState({
    profile: state => state.auth.profile
  }),
  data(){
    return{
      publication_like:{
        self_like: null,
        like_count: 0
      },
      publication_comment: {
        publication_comments: [],
        limit: 6,
        offset: 0,
        see_more: true
      }
    }
  },
  mounted() {
    this.publication_like.like_count = this.publication.like_count
  //  SELF LIKE GET
    this.emitter.emit('load', true)
    this.$store.dispatch("publication_like/GET", `?publication_id=${this.publication.id}`).then(data => {
        this.publication_like.self_like = data.success
    }).finally(() => this.emitter.emit('load', false))
  },
  methods:{
    publicationDelete(){
      this.setModalName(false)
      this.emitter.emit('load', true)
      this.$store.dispatch("publication/DELETE", this.publication.id).then(data => {
        this.emitter.emit('message', data)
      }).finally(() => this.emitter.emit('load', false))
    },
    publicationCommentGet(limit=0, offset=0){
      limit ? this.publication_comment.limit += limit : this.publication_comment.limit = 6
      offset ? this.publication_comment.offset += offset : this.publication_comment.offset = 0

      this.emitter.emit('load', true)
      this.$store.dispatch("publication_comment/GET", `?limit=${this.publication_comment.limit}&offset=${this.publication_comment.offset}&publication_id=${this.publication.id}`).then(data => {
        data.obj.forEach(comment => this.publication_comment.publication_comments.push(comment))
        if(!data.obj.length)
          this.publication_comment.see_more = false
      }).finally(() => this.emitter.emit('load', false))
    },
    publicationLikeCreate(){
      this.emitter.emit('load', true)
      this.$store.dispatch("publication_like/CREATE", {publication_id: this.publication.id}).then(data => {
        this.publication_like.self_like = data.success;
        this.publication_like.like_count++
      }).finally(() => this.emitter.emit('load', false))
    },
    publicationLikeDelete(){
      this.emitter.emit('load', true)
      this.$store.dispatch("publication_like/DELETE", this.publication.id).then(data => {
        this.publication_like.self_like = !data.success
        this.publication_like.like_count--
      }).finally(() => this.emitter.emit('load', false))
    }
  }
}
</script>

<style scoped>
.img_block{
  border: 1px solid #ccc;
  height: 40px;
  width: 40px;
}
.profile_image{
  width: 120%;
  height: auto;
}
.publication_image{
  max-width: 100%;
  height: auto;
}
</style>