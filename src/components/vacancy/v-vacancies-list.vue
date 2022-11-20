<template>
  <div class="vacancy">
    <h3 class="m-bottom-0 d-flex j-content-space-between a-items-center g-gap-_3">
      <a :href="`vacancy?id=${vacancy.id}`" class="c-content-hover">{{ vacancy.title }}</a>
      <span class="c-content f-size-small">желаемая цена {{ vacancy.price }}$ за <b>{{vacancy.payment_interval.title}}</b></span>
    </h3>
    <p>{{vacancy.short_description}}</p>

    <ul class="w-max categories_block list-style-content d-grid g-gap-_3 padding-left-1" v-if="this.categories !== false">
      <li v-for="category in vacancy.categories" :key="category.id" class="f-size-small f-weight-bold padding-02 m-right-03">{{category.title}}</li>
    </ul>
    <div class="footer d-flex a-items-center j-content-space-between f-size-small m-top-05" v-if="this.footer !== false">
      <v-user-mini-block :user="vacancy.creator"/>
      <span>опубликовано {{vacancy.creation_date}}</span>
      <span>предложений {{ vacancy.vacancy_offers_count }}</span>
      <span class="c-pointer c-content-hover"><a :href="`vacancy?id=${vacancy.id}`">подробнее</a></span>
    </div>
  </div>
</template>

<script>
import VUserMiniBlock from "@/components/_general/v-user-mini-block";
export default {
  name: "v-vacancies-list",
  components: {VUserMiniBlock},
  props: ['vacancy', 'categories', 'footer'],
}
</script>

<style scoped>
h3{
  margin-top: 0;
}
.categories_block{
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
}
</style>