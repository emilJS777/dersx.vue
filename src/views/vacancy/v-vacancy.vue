<template>
  <div class="vacancy d-grid g-gap-3">
    <div class="vacancies_list d-grid g-gap-1 h-max-content">
      <h4 class="m-top-0 m-bottom-0 padding-05 c-content">похожие вакансии </h4>
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
export default {
  name: "v-vacancy",
  components: {VVacanciesList, VVacancyBlock},
  data() {
    return {
      similarVacancies: []
    }
  },
  methods: {
    getSimilarVacancies(obj) {
      this.$store.dispatch("vacancy/GET", `?page=1&per_page=5&exclude_id=${this.$route.query.id}&rubric_id=${obj.rubric_id}&category_ids=[${obj.category_ids}]`).then(data => {
        this.similarVacancies = data.obj.items
        console.log(data.obj)
      })
    }
  }
}
</script>

<style scoped>
.vacancy{
  grid-template-columns: 1fr 2fr;
}
</style>