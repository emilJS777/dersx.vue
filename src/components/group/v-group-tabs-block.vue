<template>
  <div class="group_tabs d-grid g-gap-1">
    <div class="toggle_block d-flex g-gap-1 padding-03 bg-fff c-ccc box-shadow-slim">
      <span v-bind:class="modalName === 'membersTab' ? 'padding-03 f-size-small' : 'c-pointer c-content padding-03 f-size-small'" @click="setModalName('membersTab');this.search='';getMembers()"><i class="fa fa-users"></i> участники</span>
      <span v-if="this.group.creator_id === this.profile.id" v-bind:class="modalName === 'inviteTab' ? 'padding-03 f-size-small' : 'c-pointer c-content padding-03 f-size-small'" @click="setModalName('inviteTab');this.search='';getInviteUsers()"><i class="fa fa-user-plus"></i> пригласить</span>
    </div>

    <div v-if="modalName === 'membersTab'" class="d-grid g-gap-1">
      <div class="d-flex a-items-flex-end g-gap-1">
        <v-input-normal placeholder="поиск" class="f-size-small" span="пропешите имя или фамилию пользователя" @value="value => search = value"/>
        <v-button-normal icon="fa fa-search" class="f-size-small" @click="getMembers(1)"/>
      </div>
      <div class="members d-grid g-gap-2" v-if="users.length">
        <v-user-mini-block v-for="user in users" :key="user" :user="user"/>
      </div>
      <h3 class="t-center c-ccc" v-if="!users.length">ничего не найдено</h3>
      <div v-else class="d-flex j-content-flex-end m-top-1">
        <v-paginate
            class="paginate f-size-small"
            :page-count="page_count"
            :click-handler="getMembers"
            :prev-text="'prev'"
            :next-text="'next'"
            :page="page"
            :container-class="'className'"
            :force-page="page">
        </v-paginate>
      </div>
    </div>

    <div v-if="modalName === 'inviteTab'" class="d-grid g-gap-1">
      <div class="d-flex a-items-flex-end g-gap-1">
        <v-input-normal placeholder="поиск" class="f-size-small" span="пропешите имя или фамилию пользователя" @value="value => search = value"/>
        <v-button-normal icon="fa fa-search" class="f-size-small" @click="getInviteUsers(1)"/>
      </div>
      <div class="invite_users d-grid g-gap-2" v-if="users.length">
        <v-group-invite v-for="user in users" :key="user" :user="user" :group="this.group"/>
      </div>
      <h3 class="t-center c-ccc" v-if="!users.length">ничего не найдено</h3>
      <div v-else class="d-flex j-content-flex-end m-top-1">
        <v-paginate
            class="paginate f-size-small"
            :page-count="page_count"
            :click-handler="getInviteUsers"
            :prev-text="'prev'"
            :next-text="'next'"
            :page="page"
            :container-class="'className'"
            :force-page="page">
        </v-paginate>
      </div>
    </div>

  </div>
</template>

<script>
import toggleMixin from "@/mixins/toggle-mixin";
import VUserMiniBlock from "@/components/_general/v-user-mini-block";
import VInputNormal from "@/components/_general/v-input-normal";
import VButtonNormal from "@/components/_general/v-button-normal";
import {mapState} from "vuex";
import paginateMixin from "@/mixins/paginate-mixin";
import VGroupInvite from "@/components/group/v-group-invite";

export default {
  name: "v-group-tabs-block",
  components: {VGroupInvite, VButtonNormal, VInputNormal, VUserMiniBlock},
  mixins: [toggleMixin, paginateMixin],
  props: ['group'],
  data(){
    return{
      users: [],
      search: ''
    }
  },
  computed: mapState({
    profile: state => state.auth.profile
  }),
  mounted() {
    this.setModalName('membersTab')
    this.getMembers()
    this.per_page = 6
  },
  methods: {
    clickPage(selectedPage){
      this.page = selectedPage
    },
    getMembers(selectedPage=1){
      this.users = []
      this.emitter.emit('load', true)
      this.$store.dispatch("user/GET", `?group_id=${this.group.id}&page=${selectedPage}&per_page=${this.per_page}&search=${this.search}`).then(data => {
        this.users = data.obj.items
        this.setPaginate(data.obj.pages, data.obj.page, data.obj.per_page)
      }).finally(() => this.emitter.emit('load', false))
    },
    getInviteUsers(selectedPage=1){
      this.users = []
      this.emitter.emit('load', true)
      this.$store.dispatch("user/GET", `?not_group_id=${this.group.id}&page=${selectedPage}&per_page=${this.per_page}&search=${this.search}`).then(data => {
        this.users = data.obj.items
        this.setPaginate(data.obj.pages, data.obj.page, data.obj.per_page)
      }).finally(() => this.emitter.emit('load', false))
    }
  }
}
</script>

<style scoped>
.members{
  grid-template-columns: 1fr 1fr;
}
</style>