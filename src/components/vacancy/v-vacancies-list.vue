<template>
  <div class=" box-shadow-slim d-grid g-gap-_5">
    <h4 class="m-bottom-0 m-top-0 d-flex j-content-space-between a-items-flex-start g-gap-_3">
      <a :href="`vacancy?id=${vacancy.id}`" class="c-content-hover t-decoration-underline-hover" style="font-size: 18px;">{{ vacancy.title }}</a>
      <span class="c-6d f-size-small d-flex g-gap-_3 m-top-05">
          <b v-if="vacancy.payment_interval.price"><span>{{ vacancy.price }}</span>  <span>{{ lang.general.dram }}</span> </b>
          <b v-if="lang.lang === 'arm'"> {{vacancy.payment_interval.title_arm}}</b>
          <b v-if="lang.lang === 'eng'"> {{vacancy.payment_interval.title_eng}}</b>
          <b v-if="lang.lang === 'rus'"> {{vacancy.payment_interval.title_rus}}</b>
      </span>
    </h4>
    <p class="text-5-line">{{vacancy.short_description}}</p>

    <ul class="w-max categories_block list-style-content padding-0" v-if="this.categories !== false">
      <li v-for="category in vacancy.categories" :key="category.id" class="f-size-small f-weight-bold padding-02 d-inline-block m-right-05 m-right-03 padding-left-1_5 padding-05 b-radius-8 margin-03  bg-c5c">
          <span v-if="lang.lang === 'arm'">{{category.title_arm}}</span>
          <span v-if="lang.lang === 'eng'">{{category.title_eng}}</span>
          <span v-if="lang.lang === 'rus'">{{category.title_rus}}</span>
      </li>
    </ul>
    <div :class="`${mobile ? 'd-grid g-gap-_5' : 'd-flex'} footer a-items-center j-content-space-between f-size-small m-top-05 padding-top-05 b-top-ccc`">
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
import deviceMixin from "@/mixins/device-mixin";
export default {
  name: "v-vacancies-list",
  components: {VUserMiniBlock},
  props: ['vacancy', 'categories', 'footer'],
  mixins: [localTimeMixin, deviceMixin],
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