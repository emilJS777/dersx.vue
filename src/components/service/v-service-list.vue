<template>
  <div class="service bg-fff padding-1 h-max-content box-shadow-slim">
      <div class="service_img_block p-relative o-hidden" v-if="service.image">
        <img :src="`http://0.0.0.0:5000/image?filename=${service.image.filename}`" class="p-absolute absolute-center" alt="">
      </div>

      <h4 class="m-top-05 c-content-hover c-pointer"><a :href="`/service?id=${service.id}`">{{service.title}}</a></h4>
      <b class="f-size-small c-content">краткое описание: </b>
      <p class="m-top-0">{{service.short_description}}</p>

      <ul class="padding-left-1 list-style-content" v-if="service.categories.length">
        <b class="f-size-small c-content">категории: </b>
        <li v-for="category in service.categories" :key="category.id" class="f-size-small f-weight-bold">{{category.title}}</li>
      </ul>

    <span class="c-content" v-if="service.payment_interval">цена {{service.price}}$ за {{service.payment_interval.title}}</span>
    <div class="d-flex j-content-space-between">
        <span class="f-size-small"><b>создано</b> {{service.creation_date}}</span>
        <span class="f-size-small">{{service.rubric.title}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "v-service-list",
  props: ['service'],
}
</script>

<style scoped>
.service_img_block{
  width: 100%;
  height: 180px;
}
.service_img_block > img{
  min-width: 100%;
  max-width: 120%;
  min-height: 80px;
  max-height: 120%;
}
</style>