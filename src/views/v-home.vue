<template>
  <div :class="`${mobile ? 'home_mobile' : 'home g-gap-3'} d-grid`">
<!--    VACANCIES-->
    <div class="vacancies_block h-max-content" v-if="!mobile">
      <h4 class="m-top-0 m-bottom-0 padding-05 bg-ccc-opacity d-flex j-content-space-between a-items-center">
        <span class="c-content">{{lang.home.new_vacancies.title}}</span>
        <router-link to="/vacancies" class="f-size-small">{{lang.home.new_vacancies.button}}</router-link>
      </h4>
      <div class="d-grid">
          <v-vacancies-list v-for="vacancy in vacancies"
                            :key="vacancy.id"
                            :footer="false"
                            :categories="false"
                            :vacancy="vacancy"
                            class="padding-1 bg-fff m-top-1"/>
          <div class="d-flex j-content-flex-end">
        </div>
      </div>
    </div>

<!--    PUBLICATIONS-->
    <div>
      <div class="box-shadow-slim" v-if="profile">
        <v-publication-create-form class="bg-fff padding-1"/>
      </div>

      <div class="m-top-1 d-flex g-gap-_5 box-shadow-slim padding-1 bg-fff">
        <a href="/"  :class="`padding-05 bg-fff b-radius-8 c-pointer b-solid-ccc ${!Object.keys(this.$route.query).length ? 'c-ccc' : ''}`">{{ lang.home.publication.menu.all }}</a>

        <a :href="`?publicator_id=${profile.id}`"
           :class="`padding-05 bg-fff b-radius-8 c-pointer b-solid-ccc ${this.$route.query.publicator_id === profile.id.toString() ? 'c-ccc' : ''}`"
           v-if="profile">{{ lang.home.publication.menu.my_posts}}</a>

        <a :href="`?liked_id=${profile.id}`"
           v-if="profile"
           :class="`padding-05 bg-fff b-radius-8 c-pointer b-solid-ccc ${this.$route.query.liked_id === profile.id.toString() ? 'c-ccc' : ''}`">
          {{lang.home.publication.menu.liked}}
        </a>
      </div>

      <h3 class="c-ccc t-center" v-if="!publications.length">{{ lang.general.nothing_found }}</h3>
      <v-publication-list v-for="publication in publications"
                          :key="publication.id"
                          :publication="publication"
                          v-else/>
    </div>
  </div>
</template>

<script>
import VVacanciesList from "@/components/vacancy/v-vacancies-list";
import VPublicationCreateForm from "@/components/publication/forms/v-publication-create-form";
import VPublicationList from "@/components/publication/v-publication-list";
import toggleMixin from "@/mixins/toggle-mixin";
import {mapState} from "vuex";
import offsetMixin from "@/mixins/offset-mixin";
import deviceMixin from "@/mixins/device-mixin";
export default {
  name: "v-home",
  components: {VPublicationList, VPublicationCreateForm, VVacanciesList},
  mixins: [toggleMixin, offsetMixin, deviceMixin],
  computed: mapState({
    profile: state => state.auth.profile,
    lang: state => state.lang.LANG
  }),
  data(){
    return{
      vacancies: [],
      publications: []
    }
  },
  created() {
    // load the data initially
    window.addEventListener('scroll', this.handleScroll);
  },
  mounted() {
    this.setLimit(3)
    this.emitter.emit('load', true)
    this.$store.dispatch("vacancy/GET", `?page=1&per_page=5`).then(data => {
      this.vacancies = data.obj.items
    }).finally(() => this.emitter.emit('load', false))

    this.setModalName('allPublications')
    this.publicationGet()

    if(localStorage.getItem('email_send'))
        this.send_email_activation()
  },
  methods:{
      send_email_activation(){
          this.emitter.emit('load', true)
          this.$store.dispatch('email/GET', `?activation_code=true`).then(data => {
              this.emitter.emit('message', data)
          }).finally(() => {
              localStorage.removeItem('email_send')
              this.emitter.emit('load', false)
          })
      },
    publicationGet(){
      this.emitter.emit('load', true)
      this.$store.dispatch("publication/GET", `?limit=${this.limit}&offset=${this.offset}&creator_id=${this.$route.query.publicator_id ? this.$route.query.publicator_id  : ''}&liked_id=${this.$route.query.liked_id ? this.$route.query.liked_id : ''}`).then(data => {
          data.obj.forEach(publication => this.publications.push(publication))
      }).finally(() => this.emitter.emit('load', false))
    },
    handleScroll() {
      if (((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 1) && (this.publications.length) && (this.$route.name === 'home')) {
        this.setOffset()
        this.publicationGet()
      }
    },
  }
}
</script>

<style scoped>
.home{
  grid-template-columns: 1fr 1.6fr;
}
.home_mobile{
    grid-template-columns: 1fr;
}
</style>