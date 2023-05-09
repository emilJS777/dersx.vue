<template>
  <div class="profile d-grid g-gap-3">
      <div class="d-grid h-max-content g-gap-1 box-shadow-slim">
        <div class="bg-fff padding-1 d-grid j-content-center">
          <v-profile-img/>

          <v-button-normal :label="lang.profile.buttons.profile_settings" class="bg-content-hover w-max m-top-1 f-size-small"
                           @click="setModalName('profileEditModal')"
                           icon="fa fa-cog"
                           v-if="profile && profile.id === parseInt(this.$route.query.id)"/>

        </div>

      </div>

      <div class="d-grid g-gap-1 h-max-content">
        <div class="toggle_block d-flex g-gap-1 padding-03 bg-fff c-ccc box-shadow-slim">
          <span v-bind:class="modalName === 'infoUserTab' ? 'padding-03' : 'c-pointer c-content padding-03'" @click="setModalName('infoUserTab')">{{ lang.profile.information.information }}</span>
          <span v-bind:class="modalName === 'friendsTab' ? 'padding-03' : 'c-pointer c-content padding-03'" @click="get_friends">{{ lang.profile.information.friends }}</span>
          <span v-bind:class="modalName === 'publicationVacancies' ? ' padding-03' : 'c-pointer c-content padding-03'" @click="get_vacancies">{{ lang.general.vacancies }}</span>
<!--          <span v-bind:class="modalName === 'servicesTab' ? ' padding-03' : 'c-pointer c-content padding-03'" @click="get_services">услуги </span>-->
<!--          <span v-bind:class="modalName === 'teamsTab' ? ' padding-03' : 'c-pointer c-content padding-03'" @click="get_teams">команды </span>-->
        </div>
<!--        PROFILE EDIT -->
        <v-profile-edit-block v-if="modalName === 'profileEditModal'"
                              @close="setModalName('infoUserTab')"/>
<!--        PROFILE ABOUT TAB-->
        <v-profile-about v-if="modalName === 'infoUserTab'"/>

<!--        VACANCIES TAB-->
        <div v-if="modalName === 'publicationVacancies'">
          <div class="d-grid g-gap-1">
            <v-vacancies-list v-for="vacancy in vacancies"
                              @more="vacancy_id => this.$router.push({name: 'vacancy', query:{id: vacancy_id}})"
                              :key="vacancy.id"
                              :vacancy="vacancy"
                              class="bg-fff padding-1"/>
            <h3 v-if="!vacancies.length" class="c-ccc t-center">{{ lang.general.nothing_found }} </h3>

            <!--    PAGINATION-->
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
          </div>
        </div>

<!--        SERVICES TAB-->
        <div v-if="modalName === 'servicesTab'">
          <div class="services d-grid g-gap-1">
            <v-service-list v-for="service in services"
                            :key="service.id"
                            :service="service"/>
          </div>
          <h3 v-if="!services.length" class="c-ccc t-center">ничего не найдено </h3>
          <!--    PAGINATION-->
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
        </div>

<!--        FRIENDS TAB-->
        <div v-if="modalName === 'friendsTab'">
            <div class="friends_list d-grid g-gap-3 m-top-2 h-max-content" v-if="friends.length">
              <v-user v-for="user in friends" :key="user.id" :user="user" class="box-shadow-slim"/>
            </div>

          <h3 v-if="!friends.length" class="c-ccc t-center">ничего не найдено </h3>

          <!--    PAGINATION-->
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
        </div>

<!--&lt;!&ndash;        TEAMS TAB&ndash;&gt;-->
<!--        <div v-if="modalName === 'teamsTab'">-->
<!--          <div class="teams_list d-grid g-gap-2 h-max-content" v-if="teams.length">-->
<!--            <v-team-info-block v-for="team in teams" :key="team.id" :team="team"/>-->
<!--          </div>-->

<!--          <h3 v-if="!teams.length" class="c-ccc t-center">ничего не найдено </h3>-->

<!--          &lt;!&ndash;    PAGINATION&ndash;&gt;-->
<!--          <div v-else class="d-flex j-content-flex-end">-->
<!--            <v-paginate-->
<!--                class="paginate"-->
<!--                :page-count="page_count"-->
<!--                :click-handler="clickPage"-->
<!--                :prev-text="'prev'"-->
<!--                :next-text="'next'"-->
<!--                :page="page"-->
<!--                :container-class="'className'"-->
<!--                :force-page="page">-->
<!--            </v-paginate>-->
<!--          </div>-->
<!--        </div>-->

      </div>
  </div>
</template>

<script>
import VButtonNormal from "@/components/_general/v-button-normal";
import VProfileImg from "@/components/profile/v-profile-img";
import VProfileAbout from "@/components/profile/v-profile-about";
import VProfileEditBlock from "@/components/profile/modals/v-profile-edit-form";
import toggleMixin from "@/mixins/toggle-mixin";
import {mapState} from "vuex";
import VVacanciesList from "@/components/vacancy/v-vacancies-list";
import paginateMixin from "@/mixins/paginate-mixin";
import VServiceList from "@/components/service/v-service-list";
import VUser from "@/components/user/v-user";
export default {
  name: "v-profile",
  components: {
    VUser,
    VServiceList,
    VVacanciesList, VProfileEditBlock, VProfileAbout, VProfileImg, VButtonNormal},
  mixins: [toggleMixin, paginateMixin],
  computed: mapState({
    profile: state => state.auth.profile,
    lang: state => state.lang.LANG
  }),
  data(){
    return{
      vacancies: [],
      services: [],
      friends: [],
      teams: [],
    }
  },
  mounted() {
    this.setModalName('infoUserTab')
  },
  methods: {
    clickPage(selectedPage){
      this.page = selectedPage
      this.get_vacancies()
    },
    get_vacancies(){
      if(this.modalName !== 'publicationVacancies'){
        this.setModalName('publicationVacancies')
        this.emitter.emit('load', true)
        this.$store.dispatch("vacancy/GET", `?page=${this.page}&per_page=${this.per_page}&creator_id=${this.$route.query.id}`).then(data => {
          this.vacancies = data.obj.items
          this.setPaginate(data.obj.pages, data.obj.page, data.obj.per_page)
        }).finally(() => this.emitter.emit('load', false))
      }
    },
    get_services(){
      if(this.modalName !== 'servicesTab'){
        this.setModalName('servicesTab')
        this.emitter.emit('load', true)
        this.$store.dispatch("service/GET", `?page=${this.page}&per_page=${this.per_page}&creator_id=${this.$route.query.id}`).then(data => {
          this.services = data.obj.items
          this.setPaginate(data.obj.pages, data.obj.page, data.obj.per_page)
        }).finally(() => this.emitter.emit('load', false))
      }
    },
    get_friends(){
      if(this.modalName !== 'friendsTab'){
        this.setModalName('friendsTab')
        this.emitter.emit('load', true)
        this.$store.dispatch("friend/GET", `?page=${this.page}&per_page=${this.per_page}&confirmed=1&user_id=${this.$route.query.id}`).then(data => {
          this.friends = data.obj.items
          this.setPaginate(data.obj.pages, data.obj.page, data.obj.per_page)
        }).finally(() => this.emitter.emit('load', false))
      }
    },
    get_teams(){
      if(this.modalName !== 'teamsTab'){
        this.setModalName('teamsTab')
        this.emitter.emit('load', true)
        this.$store.dispatch("team/GET", `?page=${this.page}&per_page=${this.per_page}&user_id=${this.$route.query.id}`).then(data => {
          this.teams = data.obj.items
          this.setPaginate(data.obj.pages, data.obj.page, data.obj.per_page)
        }).finally(() => this.emitter.emit('load', false))
      }
    }
  }
}
</script>

<style scoped>
.profile{
  grid-template-columns: 1.5fr 4fr;
}
.services{
  grid-template-columns: 1fr 1fr;
}
.friends_list{
  grid-template-columns: 1fr 1fr 1fr;
}
</style>