<template>
  <div class="service_create d-grid g-gap-3">
    <div>sadsdf</div>
    <v-service-create-form/>
  </div>
</template>

<script>
import VServiceCreateForm from "@/components/service/forms/v-service-create-form";
export default {
  name: "v-service-create",
  components: {VServiceCreateForm}
}
</script>

<style scoped>
.service_create{
  grid-template-columns: 1fr 2fr;
}
</style>