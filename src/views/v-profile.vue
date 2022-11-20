<template>
  <div class="profile d-grid g-gap-3">
      <div class="d-grid h-max-content g-gap-1">
        <div class="bg-fff padding-1 d-grid j-content-center">
          <v-profile-img/>
          <v-button-normal label="настройки профиля" class="bg-content-hover w-max m-top-2"
                           @click="setModalName('profileEditModal')"
                           v-if="profile && profile.id === parseInt(this.$route.query.id)"/>
        </div>

      </div>

      <div class="d-grid g-gap-1 h-max-content">
        <div class="toggle_block d-flex g-gap-1 padding-03 bg-fff c-ccc">
          <span v-bind:class="modalName === 'infoUserTab' ? ' f-size-small padding-03' : 'c-pointer c-content f-size-small padding-03'" @click="setModalName('infoUserTab')">информация о пользователе</span>
          <span v-bind:class="modalName === 'publicationVacancies' ? ' f-size-small padding-03' : 'c-pointer c-content f-size-small padding-03'" @click="get_vacancies">опубликованные вакансии</span>
          <span v-bind:class="modalName === 'servicesTab' ? ' f-size-small padding-03' : 'c-pointer c-content f-size-small padding-03'" @click="get_services">услуги пользователя </span>
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
            <h3 v-if="!vacancies.length" class="c-ccc t-center">ничего не найдено </h3>

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

      </div>
  </div>

<!--  MODALS-->


<!--  <v-vacancy-modal v-if="modalName === 'vacancyModal'"-->
<!--                   :vacancy_id="this.id"-->
<!--                   @close="setModalName('publicationVacancies')"/>-->

<!--  <v-service-modal v-if="modalName === 'serviceModal'"-->
<!--                   :service_id="this.id"-->
<!--                   @close="setModalName('servicesTab')"/>-->
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
export default {
  name: "v-profile",
  components: {
    VServiceList,
    VVacanciesList, VProfileEditBlock, VProfileAbout, VProfileImg, VButtonNormal},
  mixins: [toggleMixin, paginateMixin],
  computed: mapState({
    profile: state => state.auth.profile
  }),
  data(){
    return{
      vacancies: [],
      services: []
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
</style>