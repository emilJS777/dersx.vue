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
      <div class="d-grid g-gap-1 p-relative">
        <div class="d-flex a-items-center g-gap-_5 p-relative w-max" >
          <router-link :to="`/profile?id=${vacancy.creator.id}`" class="img_block b-content-hover p-relative c-pointer o-hidden b-radius-50 d-flex j-content-center a-items-center">
<!--            <img src="@/assets/images/user-unknown-1.png" alt="" v-if="!vacancy.creator.image">-->
            <span v-if="!vacancy.creator.image">{{vacancy.creator.first_name[0]}}</span>
            <img :src="'data:image/'+vacancy.creator.image.filename+';charset=utf-8;base64, ' + vacancy.creator.image.b64" class="p-absolute absolute-center profile_image" v-else>
          </router-link>
          <div class="d-grid info_block j-content-flex-end">
            <i>{{ vacancy.creator.first_name }} {{ vacancy.creator.last_name }}</i>
            <span class="f-size-small">{{vacancy.creator.name}}</span>
          </div>
        </div>
      </div>
      <span>опубликовано {{vacancy.creation_date}}</span>
      <span>предложений {{ vacancy.vacancy_offers_count }}</span>
      <span class="c-pointer c-content-hover"><a :href="`vacancy?id=${vacancy.id}`">подробнее</a></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "v-vacancies-list",
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
.img_block{
  border: 1px solid #ccc;
  height: 40px;
  width: 40px;
}
.profile_image{
  width: 120%;
  height: auto;
}
</style>