<template>
  <div class="publication padding-2 bg-fff m-top-1 box-shadow-slim">
    <div class="head d-flex j-content-space-between a-items-flex-start">
      <v-user-mini-block :user="publication.creator"/>



      <div class="menu_block d-flex j-content-flex-end a-items-flex-start d-block-hover p-relative padding-03">
        <i class="fa fa-ellipsis-v" aria-hidden="true"></i>

        <ul class="m-0-auto d-none animation-from-hidden p-absolute padding-05 bg-fff box-shadow-slim">
          <li class="d-flex g-gap-_5 c-content-hover c-pointer a-items-center padding-03">
            <i class="fas fa-eye-slash"></i>
            скрыть
          </li>

          <li class="d-flex g-gap-_5 c-content-hover c-pointer err-msg a-items-center padding-03"
              v-if="profile && publication.creator.id === profile.id" @click="setModalName('publicationDeleteAlert')">
            <i class="fas fa-trash-alt"></i>
            удалить
          </li>
        </ul>
      </div>
    </div>

<!--    PUBLICATION DESCRIPTION-->
    <p>{{ publication.description }}</p>

<!--    PUBLICATION IMAGE-->
    <div v-if="publication.image" class="w-max">
      <img :src="`http://0.0.0.0:5000/image?filename=${publication.image.filename}`" class="publication_image">
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