<template>
  <div class="p-fixed bg-c5c top-0 left-0 w-max h-max" style="z-index: 8" v-if="more" @click="this.more=false"></div>

  <div :class="`publication padding-2 bg-fff m-top-1 box-shadow-slim animation-from-hidden ${this.more ? 'publication-modal z-index-10 p-fixed top-0 bottom-0 h-max w-max-content' : ''}`">
    <div class="head d-flex j-content-space-between a-items-center p-relative b-bottom-ccc padding-bottom-05">
      <v-user-mini-block :user="publication.creator"/>
      <v-menu-normal
          @delete="setModalName('publicationDeleteAlert')"
          @complaint="complaintCreate()"
          @complaintDelete="complaintDelete()"
          @share="setModalName('share')"
          @more="this.more = !this.more"
          class="m-top-05"
          :inline="!mobile"
          :opening="mobile"
          :menu_list="[{title: lang.general.complaint, icon_class: 'fa fa-flag', emit_name: 'complaint', class: 'c-red', hidden: publication.creator.id !== profile.id && !complaint_id ? false : true},
                       {title: lang.general.complaint_cancel, icon_class: 'fa fa-flag', emit_name: 'complaintDelete', class: 'c-red', hidden: publication.creator.id !== profile.id && complaint_id ? false : true},
                       {title: this.more ? lang.general.close : lang.general.look, icon_class: 'fa fa-expand', emit_name: 'more'},
                       {title: lang.general.share, icon_class: 'fa fa-share-alt', class: 'c-blue-opacity', emit_name: 'share'},
                       {title: lang.general.delete, icon_class: 'fa fa-times-circle', emit_name: 'delete', class: 'c-red', hidden: publication.creator.id !== profile.id},]"/>
    </div>

<!--    PUBLICATION DESCRIPTION-->
    <p class="m-top-1 m-bottom-1"><span v-html="publication.description"></span></p>

<!--    PUBLICATION IMAGE-->
    <div v-if="publication.image" class="w-max">
      <div class="w-fit-content p-relative d-flex-hover">
          <div class="c-pointer p-absolute right-0 top-0 left-0 w-max h-max bg-c5c-hover d-flex j-content-center a-items-center d-none animation-from-hidden c-6d" v-if="!this.more" @click="this.more = true">
              <i class="fa fa-expand f-size-30">{{lang.general.look}}</i>
          </div>
          <img :src="`${web_api}/image?filename=${publication.image.filename}`" class="publication_image">
      </div>
    </div>

<!--    PUBLICATION CREATION DATE-->
    <div class="d-grid g-gap-_5 m-top-05">
      <span class="f-size-small m-top-0">
        <b>{{ lang.general.published }}:</b> {{this.date_time}}
      </span>
    </div>

<!--    PUBLICATION FOOTER-->
    <div class="m-top-1 d-flex g-gap-1 j-content-space-between b-top-ccc padding-top-05">
      <span class="c-pointer c-content f-size-small d-flex g-gap-_5 a-items-center f-weight-bold"
            v-if="modalName !== 'publicationComments'"
            @click="()=>{setModalName('publicationComments');publicationCommentGet()}">
        <i class="fa fa-comments" aria-hidden="true"></i>
        {{ lang.general.comments }}: {{ publication.comment_count }}
      </span>

      <span class="c-ccc f-size-small d-flex g-gap-_5 a-items-center f-weight-bold" v-else>
        <i class="fa fa-comments" aria-hidden="true"></i>
        {{ lang.general.comments }}: {{ publication.comment_count }}
      </span>

      <span class="c-pointer c-content f-size-small d-flex g-gap-_5 a-items-center f-weight-bold"
            @click="publicationLikeCreate"
            v-if="!publication_like.self_like && profile">
        <i class="fa fa-thumbs-up" aria-hidden="true"></i>
        {{ lang.general.likes }}: {{ publication_like.like_count }}
      </span>

      <span class="c-pointer f-size-small d-flex g-gap-_5 a-items-center f-weight-bold"
            v-if="publication_like.self_like && profile"
            @click="publicationLikeDelete">
        <i class="fa fa-thumbs-up" aria-hidden="true"></i>
        {{ lang.general.likes }}: {{ publication_like.like_count }} ({{ lang.general.did_you_like }})
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
            @click="publicationCommentGet(6, 6)">{{ lang.general.see_more }}</p>
    </div>

  </div>


<!--  ALERTS-->
  <v-alert-modal :label="lang.home.publication.confirm_delete"
                 v-if="modalName === 'publicationDeleteAlert'"
                 @close="setModalName(false)"
                 @confirm="publicationDelete"/>

    <v-share-modal @close="setModalName(false)"
                   :description="publication.description"
                   :publication_id="publication.id"
                   :image="publication.image ? `${web_api}/image?filename=${publication.image.filename}` : ''"
                   v-if="modalName === 'share'"/>
</template>

<script>
import {mapState} from "vuex";
import toggleMixin from "@/mixins/toggle-mixin";
import VAlertModal from "@/components/_general/v-alert-modal";
import VPublicationCommentCreateForm from "@/components/publication/forms/v-publication-comment-create-form";
import VPublicationComment from "@/components/publication/v-publication-comment";
import VUserMiniBlock from "@/components/_general/v-user-mini-block";
import VMenuNormal from "@/components/_general/v-menu-normal.vue";
import localTimeMixin from "@/mixins/local-time-mixin";
import VShareModal from "@/components/_general/v-share-modal.vue";
import deviceMixin from "@/mixins/device-mixin";

export default {
  name: "v-publication-list",
  components: {VShareModal, VMenuNormal, VUserMiniBlock, VPublicationComment, VPublicationCommentCreateForm, VAlertModal},
  props: ["publication"],
  mixins: [toggleMixin, localTimeMixin, deviceMixin],
  computed: mapState({
    profile: state => state.auth.profile,
    lang: state => state.lang.LANG
  }),
  data(){
    return{
      web_api: process.env.WEB_API,
      complaint_id: false,
      more: false,
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
    this.getLocalTime(this.publication.creation_date)
  //  SELF LIKE GET
    this.emitter.emit('load', true)
    this.$store.dispatch("publication_like/GET", `?publication_id=${this.publication.id}`).then(data => {
        this.publication_like.self_like = data.success
    }).finally(() => this.emitter.emit('load', false))
  },
  methods:{
    complaintCreate(){
      this.emitter.emit('load', true)
      this.$store.dispatch("complaint/CREATE", {'publication_id': this.publication.id}).then(data => {
          this.complaint_id = data.obj.id
      }).finally(() => this.emitter.emit('load', false))
    },
      complaintDelete(){
          this.emitter.emit('load', true)
          this.$store.dispatch("complaint/DELETE", this.complaint_id).then(data => {
              if(data.success)
                  this.complaint_id = false
          }).finally(() => this.emitter.emit('load', false))
      },
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
.publication-modal{
    margin-top: 0;
    left: 50%;
    right: 50%;
    transform: translateX(-50%);
    min-width: 300px;
    max-width: 100%;
    overflow-y: auto;
}
.publication{
    transition: .3s;
}
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