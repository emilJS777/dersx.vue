<template>
  <div class="vacancy-edit d-grid g-gap-3">
    <div><p>в данном поле нужно описать название вакансии, это может быть просто название специализации. от 5 до 50 символов
    </p></div>
    <v-vacancy-edit-form :vacancy_id="this.$route.query.id"/>
  </div>
</template>

<script>
import VVacancyEditForm from "@/components/vacancy/forms/v-vacancy-edit-form";
export default {
  name: "v-vacancy-edit",
  components: {VVacancyEditForm}
}
</script>

<style scoped>
.vacancy-edit{
  grid-template-columns: 1fr 2fr;
}
</style>