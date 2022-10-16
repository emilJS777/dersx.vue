<template>
  <div class="vacancy">
    <h3 class="c-content-hover c-pointer m-bottom-0 " @click="this.$emit('more', 1)">
      {{ vacancy.title }}
    </h3>
    <p>{{vacancy.short_description}}</p>

    <div class="w-max categories_block">
      <span v-for="category in vacancy.categories" :key="category.id" class="f-size-small f-weight-bold padding-02 m-right-03 c-b0">{{category.title}},</span>
    </div>
    <div class="footer d-flex j-content-space-between f-size-small m-top-05">
      <span>опубликовано {{vacancy.creation_date}}</span>
      <span>желаемая цена {{ vacancy.price }}$ за <b class="c-content f-size-small">{{vacancy.payment_interval.title}}</b></span>
      <span>предложений 2</span>
      <span class="c-pointer c-content-hover" @click="this.$emit('more', 1)">подробнее</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "v-vacancies-list",
  props: ['vacancy']
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