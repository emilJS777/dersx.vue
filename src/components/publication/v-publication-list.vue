<template>
  <div class="publication padding-2 bg-fff m-top-1">
    <div class="head d-flex j-content-space-between a-items-flex-start">
      <div class="d-grid g-gap-1 p-relative">
        <div class="d-flex a-items-center g-gap-_5 p-relative w-max" >
          <router-link :to="`/profile?id=${publication.creator.id}`" class="img_block b-content-hover p-relative c-pointer o-hidden b-radius-50 d-flex j-content-center a-items-center">
            <!--            <img src="@/assets/images/user-unknown-1.png" alt="" v-if="!vacancy.creator.image">-->
            <span v-if="!publication.creator.image">{{publication.creator.first_name[0]}}</span>
            <img :src="'data:image/'+publication.creator.image.filename+';charset=utf-8;base64, ' + publication.creator.image.b64" class="p-absolute absolute-center profile_image" v-else>
          </router-link>
          <div class="d-grid info_block j-content-flex-end">
            <i>{{ publication.creator.first_name }} {{ publication.creator.last_name }}</i>
            <span class="f-size-small">{{publication.creator.name}}</span>
          </div>
        </div>
      </div>



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
      <img :src="'data:image/'+publication.image.filename+';charset=utf-8;base64, ' + publication.image.b64" class="publication_image">
    </div>

<!--    PUBLICATION CREATION DATE-->
    <div class="d-grid g-gap-_5">
      <span class="f-size-small m-top-0">
        <b>опубликовано:</b> {{publication.creation_date}}
      </span>
    </div>

<!--    PUBLICATION FOOTER-->
    <div class="m-top-1">
      <span class="c-pointer c-content f-size-small"
            v-if="modalName !== 'publicationComments'"
            @click="()=>{setModalName('publicationComments');publicationCommentGet()}">комментарий: {{ publication.comment_count }}</span>

      <span class="c-ccc f-size-small" v-else>комментарий: {{ publication.comment_count }}</span>
    </div>

<!--    PUBLICATION COMMENT-->
    <div v-if="modalName === 'publicationComments'">
      <v-publication-comment-create-form v-if="profile"
                                         :publication_id="publication.id"
                                         @refresh_modal="()=>{this.setModalName('publicationComments');
                                           publication_comment.publication_comments = [];
                                           publicationCommentGet()}"/>

      <v-publication-comment v-for="publication_comment in publication_comment.publication_comments"
                             :key="publication_comment.id"
                             :publication_comment="publication_comment"/>

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
export default {
  name: "v-publication-list",
  components: {VPublicationComment, VPublicationCommentCreateForm, VAlertModal},
  props: ["publication"],
  mixins: [toggleMixin],
  computed: mapState({
    profile: state => state.auth.profile
  }),
  data(){
    return{
      publication_comment: {
        publication_comments: [],
        limit: 6,
        offset: 0,
        see_more: true
      }
    }
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