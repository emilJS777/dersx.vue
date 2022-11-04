<template>
  <div v-if="this.forum.title" class="h-max-content">
    <div class="bg-fff">
      <div class=" padding-1 d-grid">
        <h4 class="m-top-0 m-bottom-0 c-content d-flex a-items-center j-content-space-between">
          {{ this.forum.title }}
          <span class="c-ccc c-content-hover c-pointer" @click="this.$emit('close')">закрыт ✖</span>
        </h4>
        <span class="f-size-small"><b>рубрика: </b> <i>{{this.forum.rubric.title}}</i></span>
        <span class=""><b>тема: </b><i>{{ this.forum.topic }}</i></span>

        <div class="d-flex j-content-space-between a-items-center forum">
          <div class="d-grid g-gap-1 p-relative m-top-05">
            <div class="d-flex a-items-center g-gap-_5 p-relative w-max" >
              <router-link :to="`/profile?id=${forum.creator.id}`" class="img_block b-content-hover p-relative c-pointer o-hidden b-radius-50 d-flex j-content-center a-items-center">
                <img src="@/assets/images/user-unknown-1.png" alt="" v-if="!forum.creator.image">
                <img :src="'data:image/'+forum.creator.image.filename+';charset=utf-8;base64, ' + forum.creator.image.b64" class="p-absolute absolute-center profile_image" v-else>
              </router-link>
              <div class="d-grid info_block j-content-flex-end f-size-small">
                <i>{{ forum.creator.first_name }} {{ forum.creator.last_name }}</i>
                <span class="f-size-very-small">{{forum.creator.name}}</span>
              </div>
            </div>
          </div>

          <span class="f-size-small">опубликовано: {{forum.creation_date}}</span>
          <span class="f-size-small">ответов: {{forum.forum_discussion_count}}</span>

          <!--       FORUM EDIT -->
          <div class="edit d-flex g-gap-1 j-content-flex-end" v-if="profile && forum.creator.id === profile.id">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-trash err-msg c-pointer animation-from-hidden" viewBox="0 0 16 16"
                 @click="setModalName('forumDeleteAlert', forum.id)">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
              <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg>

            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-pencil-square c-pointer animation-from-hidden" viewBox="0 0 16 16"
                 @click="setModalName('forumEditModal', forum.id)">
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
              <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
            </svg>
          </div>
        </div>
      </div>

      <div class="m-top-05 padding-1 d-grid g-gap-_3 forum_discussion bg-ccc-opacity" v-for="forum_discussion in forum_discussions" :key="forum_discussion.id">
        <div class="d-flex j-content-space-between a-items-center">
          <div class="d-grid g-gap-_3 p-relative">
            <div class="d-flex a-items-center g-gap-_5 p-relative w-max">
              <router-link :to="`/profile?id=${forum_discussion.creator.id}`" class="img_block b-content-hover p-relative c-pointer o-hidden b-radius-50 d-flex j-content-center a-items-center">
<!--                <img src="@/assets/images/user-unknown-1.png" alt="" v-if="!forum_discussion.creator.image">-->
                <span v-if="!publication_comment.creator.image">{{forum_discussion.creator.first_name[0]}}</span>
                <img :src="'data:image/'+forum_discussion.creator.image.filename+';charset=utf-8;base64, ' + forum_discussion.creator.image.b64" class="p-absolute absolute-center profile_image" v-else>
              </router-link>
              <div class="d-grid info_block j-content-flex-end">
                <i>{{ forum_discussion.creator.first_name }} {{ forum_discussion.creator.last_name }}</i>
                <span class="f-size-small">{{forum_discussion.creator.name}}</span>
              </div>
            </div>
            <span class="f-size-small m-top-05">опубликовано: {{forum_discussion.creation_date}}</span>
          </div>

          <div class="edit d-flex g-gap-1 j-content-flex-end d-none" v-if="profile && forum_discussion.creator.id === profile.id">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-trash err-msg c-pointer animation-from-hidden" viewBox="0 0 16 16"
                 @click="setModalName('forumDiscussionDeleteAlert', forum_discussion.id)">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
              <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg>

            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-pencil-square c-pointer animation-from-hidden" viewBox="0 0 16 16"
                 @click="setModalName('forumDiscussionEditModal', forum_discussion.id)">
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
              <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
            </svg>
          </div>
        </div>

        <span class="">{{ forum_discussion.description }}</span>


      </div>
    </div>


    <v-forum-discussion-create-form @refresh_modal="this.$emit('refresh_modal')"
                                    v-if="profile"
                                    :forum_id="this.forum_id"/>
  </div>

<!--  MODALS-->
  <v-forum-edit-form :forum_id="forum.id"
                     v-if="modalName === 'forumEditModal'"
                     @refresh_modal="this.$emit('refresh_modal')"
                     @close="setModalName(false)"/>

  <v-forum-discussion-edit-form :forum_discussion_id="this.id"
                                @refresh_modal="this.$emit('refresh_modal')"
                                @close="setModalName(false)"
                                v-if="modalName === 'forumDiscussionEditModal'"/>

<!--  ALERTS-->
  <v-alert-modal label="ви дествительно xотите удалить ответ на форуме ?"
                 v-if="modalName === 'forumDiscussionDeleteAlert'"
                 @close="setModalName(false)"
                 @confirm="deleteForumDiscussion"/>

  <v-alert-modal label="ви дествительно xотите удалить форум ?"
                 v-if="modalName === 'forumDeleteAlert'"
                 @close="setModalName(false)"
                 @confirm="deleteForum"/>
</template>

<script>
import VForumDiscussionCreateForm from "@/components/forum/forms/v-forum-discussion-create-form";
import {mapState} from "vuex";
import VAlertModal from "@/components/_general/v-alert-modal";
import toggleMixin from "@/mixins/toggle-mixin";
import VForumEditForm from "@/components/forum/forms/v-forum-edit-form";
import VForumDiscussionEditForm from "@/components/forum/forms/v-forum-discussion-edit-form";
export default {
  name: "v-forum-discussions",
  components: {VForumDiscussionEditForm, VForumEditForm, VAlertModal, VForumDiscussionCreateForm},
  props: ['forum_id'],
  mixins: [toggleMixin],
  computed: mapState({
    profile: state => state.auth.profile
  }),
  data(){
    return{
      forum_discussions: [],
      forum:{
        id: null,
        title: '',
        topic: '',
        rubric: null,
        creator: null,
        forum_discussion_count: 0,
        creation_date: null
      },
    }
  },
  mounted() {
      // FORUM GET
      this.emitter.emit('load', true)
      this.$store.dispatch("forum/GET", `?id=${this.forum_id}`).then(data => {
        this.forum.id = data.obj.id
        this.forum.title = data.obj.title
        this.forum.topic = data.obj.topic
        this.forum.rubric = data.obj.rubric
        this.forum.creator = data.obj.creator
        this.forum.forum_discussion_count = data.obj.forum_discussion_count
        this.forum.creation_date = data.obj.creation_date
      }).finally(() => this.emitter.emit('load', false))

      // FORUM DISCUSSIONS GET
      this.emitter.emit('load', true)
      this.$store.dispatch("forum_discussion/GET", `?forum_id=${this.forum_id}`).then(data => {
        this.forum_discussions = data.obj
      }).finally(() => this.emitter.emit('load', false))
  },
  methods:{
    deleteForum(){
      this.emitter.emit('load', true)
      this.$store.dispatch("forum/DELETE", this.id).then(data => {
        this.emitter.emit('message', data)
      }).finally(() => this.emitter.emit('load', false))
    },
    deleteForumDiscussion(){
      this.emitter.emit('load', true)
      this.$store.dispatch("forum_discussion/DELETE", this.id).then(data => {
          if(data.success)
            this.$emit('refresh_modal')
          else
            this.emitter.emit('message', data)
      }).finally(() => this.emitter.emit('load', false))
    }
  }
}
</script>

<style scoped>
.img_block{
  border: 1px solid #ccc;
  height: 30px;
  width: 30px;
}
.profile_image{
  width: 120%;
  height: auto;
}
.forum_discussion:hover .edit{
  display: flex;
}
</style>