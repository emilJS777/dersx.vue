<template>
  <div class="forums d-grid g-gap-3">
<!--    FORUMS SIDEBAR-->
    <v-forum-list @open="forum_id =>setModalName('forumDiscussion', forum_id)"/>

<!--    FORUM CREATE BUTTON-->
    <div class="h-max-content padding-1 d-flex j-content-center" v-if="!modalName">
      <h3 class="c-content-hover c-ccc c-pointer d-flex a-items-center g-gap-_5" @click="setModalName('forumCreateModal')" v-if="profile">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
        </svg>
        создат форум
      </h3>
    </div>

    <v-forum-discussions :forum_id="this.id"
                        @refresh_modal="setModalName(modalName, id)"
                        @close="this.setModalName(false)"
                        v-if="modalName === 'forumDiscussion'"/>
  </div>


<!--  MODALS-->
  <v-forum-create-form @close="setModalName(false)"
                       v-if="modalName === 'forumCreateModal'"/>
</template>

<script>
import VForumList from "@/components/forum/v-forum-list";
import VForumCreateForm from "@/components/forum/forms/v-forum-create-form";
import toggleMixin from "@/mixins/toggle-mixin";
import VForumDiscussions from "@/components/forum/v-forum-discussions";
import {mapState} from "vuex";
export default {
  name: "v-forums",
  components: {VForumDiscussions, VForumCreateForm, VForumList},
  mixins: [toggleMixin],
  computed: mapState({
    profile: state => state.auth.profile
  })
}
</script>

<style scoped>
.forums{
  grid-template-columns: 1fr 2fr;
}
</style>