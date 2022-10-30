<template>
  <div class="vacancy-create d-grid g-gap-3">
    <div>asd</div>
    <v-vacancy-create-form/>
  </div>
</template>

<script>
import VVacancyCreateForm from "@/components/vacancy/forms/v-vacancy-create-form";
export default {
  name: "v-vacancy-create",
  components: {VVacancyCreateForm}
}
</script>

<style scoped>
.vacancy-create{
  grid-template-columns: 1fr 2fr;
}
</style>