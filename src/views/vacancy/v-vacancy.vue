<template>
  <div :class="`${mobile ? 'vacancy_mobile' : 'vacancy'} d-grid g-gap-3`">
    <div class="vacancies_list d-grid g-gap-1 h-max-content" v-if="!mobile">
      <h4 class="m-top-0 m-bottom-0 padding-05 b-radius-8 c-6d bg-c3">похожие вакансии </h4>
      <v-vacancies-list  class="padding-1 bg-fff box-shadow-slim"
                         v-for="vacancy in similarVacancies"
                        :key="vacancy.id"
                        :vacancy="vacancy"
                        :similarVacancies="similarVacancies"
                        :categories="false"
                        :footer="false"/>
    </div>
    <v-vacancy-block :vacancy_id="this.$route.query.id"
                     @similar="getSimilarVacancies"/>
  </div>
</template>

<script>
import VVacancyBlock from "@/components/vacancy/v-vacancy-block";
import VVacanciesList from "@/components/vacancy/v-vacancies-list";
import deviceMixin from "@/mixins/device-mixin";
export default {
  name: "v-vacancy",
  components: {VVacanciesList, VVacancyBlock},
  mixins: [deviceMixin],
  data() {
    return {
      similarVacancies: [],
    }
  },
  methods: {
    getSimilarVacancies(obj) {
      if(!this.mobile){
          this.$store.dispatch("vacancy/GET", `?page=1&per_page=5&exclude_id=${this.$route.query.id}&rubric_id=${obj.rubric_id}&category_ids=[${obj.category_ids}]`).then(data => {
              this.similarVacancies = data.obj.items
          })
      }
    }
  }
}
</script>

<style scoped>
.vacancy{
  grid-template-columns: 1fr 1.6fr;
}
.vacancy_mobile{
    grid-template-columns: 1fr;
}
</style>