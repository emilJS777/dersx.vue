<template>
  <div :class="`${mobile ? 'vacancy-edit-mobile' : 'vacancy-edit'} d-grid g-gap-3`">
    <div><p>{{lang.vacancies.edit.description}}</p></div>
    <v-vacancy-edit-form :vacancy_id="this.$route.query.id"/>
  </div>
</template>

<script>
import VVacancyEditForm from "@/components/vacancy/forms/v-vacancy-edit-form";
import {mapState} from "vuex";
import deviceMixin from "@/mixins/device-mixin";
export default {
  name: "v-vacancy-edit",
  components: {VVacancyEditForm},
  mixins: [deviceMixin],
  computed: mapState({
    lang: state => state.lang.LANG
  })
}
</script>

<style scoped>
.vacancy-edit{
  grid-template-columns: 1fr 2fr;
}
.vacancy-edit-mobile{
    grid-template-columns: 1fr;
}
</style>