<template>
  <div class=" box-shadow-slim d-grid g-gap-_5">
    <h4 class="m-bottom-0 m-top-0 d-flex j-content-space-between a-items-center g-gap-_3">
      <a :href="`vacancy?id=${vacancy.id}`" class="c-content-hover c-6d f-size-15">{{ vacancy.title }}</a>
      <span class="c-content f-size-small d-flex g-gap-_3">
          <b v-if="vacancy.payment_interval.price"><span>{{ vacancy.price }}</span>  <span>{{ lang.general.dram }}</span> </b>
          <b v-if="lang.lang === 'arm'"> {{vacancy.payment_interval.title_arm}}</b>
          <b v-if="lang.lang === 'eng'"> {{vacancy.payment_interval.title_eng}}</b>
          <b v-if="lang.lang === 'rus'"> {{vacancy.payment_interval.title_rus}}</b>
      </span>
    </h4>
    <p>{{vacancy.short_description}}</p>

    <ul class="w-max categories_block list-style-content padding-left-1" v-if="this.categories !== false">
      <li v-for="category in vacancy.categories" :key="category.id" class="f-size-small f-weight-bold padding-02 d-inline-block m-right-1 m-right-03">
          <span v-if="lang.lang === 'arm'">{{category.title_arm}}</span>
          <span v-if="lang.lang === 'eng'">{{category.title_eng}}</span>
          <span v-if="lang.lang === 'rus'">{{category.title_rus}}</span>
      </li>
    </ul>
    <div class="footer d-flex a-items-center j-content-space-between f-size-small m-top-05">
      <v-user-mini-block :user="vacancy.creator"/>
      <span v-if="footer !== false">{{ lang.general.published }} {{this.date_time}}</span>
      <span v-if="footer !== false">{{ lang.vacancies.offers }} {{ vacancy.vacancy_offers_count }}</span>
      <span class="c-pointer c-content-hover"><a :href="`vacancy?id=${vacancy.id}`">{{ lang.vacancies.more }}</a></span>
    </div>
  </div>
</template>

<script>
import VUserMiniBlock from "@/components/_general/v-user-mini-block";
import localTimeMixin from "@/mixins/local-time-mixin";
import {mapState} from "vuex";
export default {
  name: "v-vacancies-list",
  components: {VUserMiniBlock},
  props: ['vacancy', 'categories', 'footer'],
  mixins: [localTimeMixin],
  computed: mapState({
    lang: state => state.lang.LANG
  }),
  mounted() {
    this.getLocalTime(this.vacancy.creation_date)
  }
}
</script>

<style scoped>
h3{
  margin-top: 0;
}

</style>