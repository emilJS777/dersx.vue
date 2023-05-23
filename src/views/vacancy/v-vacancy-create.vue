<template>
  <div :class="`${mobile ? 'vacancy-mobile-create' : 'vacancy-create'} d-grid g-gap-3`">
    <div>{{ lang.vacancies.create.description }}</div>
    <v-vacancy-create-form class="w-max"/>
  </div>
</template>

<script>
import VVacancyCreateForm from "@/components/vacancy/forms/v-vacancy-create-form";
import {mapState} from "vuex";
import deviceMixin from "@/mixins/device-mixin";
export default {
  name: "v-vacancy-create",
  components: {VVacancyCreateForm},
  mixins: [deviceMixin],
  computed: mapState({
    lang: state => state.lang.LANG
  })
}
</script>

<style scoped>
.vacancy-create{
  grid-template-columns: 1fr 2fr;
}
.vacancy-mobile-create{
    grid-template-columns: 1fr;
}
</style>