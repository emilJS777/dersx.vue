<template>
  <div class="home d-grid g-gap-3">
<!--    VACANCIES-->
    <div class="bg-fff h-max-content">
      <h4 class="m-top-0 m-bottom-0 bg-ccc-opacity padding-05 d-flex j-content-space-between a-items-center">
        <span class="c-content">новые вакансии</span>
        <router-link to="/vacancies" class="f-size-small">смотреть все</router-link>
      </h4>
      <div class="g-gap-1 d-grid">
        <v-vacancies-list v-for="vacancy in vacancies"
                          :key="vacancy.id"
                          :footer="false"
                          :categories="false"
                          :vacancy="vacancy" class="padding-1"/>
        <div class="d-flex j-content-flex-end">
        </div>
      </div>
    </div>

<!--    PUBLICATIONS-->
    <div>
      <v-publication-create-form class="bg-fff padding-1" v-if="profile"/>

      <div class="m-top-1 d-flex g-gap-_5">
        <a href="/"  :class="`padding-05 bg-fff b-radius-8 c-pointer ${!Object.keys(this.$route.query).length ? 'c-ccc' : ''}`">все</a>

        <a :href="`?publicator_id=${profile.id}`"
           :class="`padding-05 bg-fff b-radius-8 c-pointer ${this.$route.query.publicator_id === profile.id.toString() ? 'c-ccc' : ''}`"
           v-if="profile">мои публикации </a>

        <a :href="`?liked_id=${profile.id}`"
           v-if="profile"
           :class="`padding-05 bg-fff b-radius-8 c-pointer ${this.$route.query.liked_id === profile.id.toString() ? 'c-ccc' : ''}`">
          понравившийся</a>
      </div>

      <h3 class="c-ccc t-center" v-if="!publications.length">ничего не найдено </h3>
      <v-publication-list v-for="publication in publications"
                          :key="publication.id"
                          v-else
                          :publication="publication"/>
    </div>
  </div>
</template>

<script>
import VVacanciesList from "@/components/vacancy/v-vacancies-list";
import VPublicationCreateForm from "@/components/publication/forms/v-publication-create-form";
import VPublicationList from "@/components/publication/v-publication-list";
import toggleMixin from "@/mixins/toggle-mixin";
import {mapState} from "vuex";
export default {
  name: "v-home",
  components: {VPublicationList, VPublicationCreateForm, VVacanciesList},
  mixins: [toggleMixin],
  computed: mapState({
    profile: state => state.auth.profile
  }),
  data(){
    return{
      vacancies: [],
      publications: [],

      limit: 3,
      offset: 0
    }
  },
  created() {
    // load the data initially
    window.addEventListener('scroll', this.handleScroll);
  },
  mounted() {
    this.emitter.emit('load', true)
    this.$store.dispatch("vacancy/GET", `?page=1&per_page=5`).then(data => {
      this.vacancies = data.obj.items
    }).finally(() => this.emitter.emit('load', false))

    this.setModalName('allPublications')
    this.publicationGet()
  },
  methods:{
    publicationGet(){
      this.emitter.emit('load', true)
      this.$store.dispatch("publication/GET", `?limit=${this.limit}&offset=${this.offset}&creator_id=${this.$route.query.publicator_id ? this.$route.query.publicator_id  : ''}&liked_id=${this.$route.query.liked_id ? this.$route.query.liked_id : ''}`).then(data => {
          data.obj.forEach(publication => this.publications.push(publication))
      }).finally(() => this.emitter.emit('load', false))
    },
    handleScroll() {
      if (((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 1) && (this.publications.length) && (this.$route.name === 'home')) {
        this.limit = 2
        this.offset += 3
        this.publicationGet()
      }
    },
  }
}
</script>

<style scoped>
.home{
  grid-template-columns: 1fr 2fr;
}
</style>