<template>
  <div class="service">
    <div class="bg-fff padding-1 w-max box-shadow-slim" v-if="service">
      <div class="d-flex j-content-space-between a-items-center p-relative padding-05">
        <span class="f-size-small c-pointer c-content-hover t-decoration-underline-hover d-flex g-gap-_5 a-items-center" @click="$router.go(-1)">
          <i class="fa fa-arrow-left" aria-hidden="true"></i>
          назад
        </span>

        <v-menu-normal v-if="profile && profile.id === service.creator.id"
                       @edit="this.$router.push({name: 'serviceEdit', query:{id: service.id}})"
                       @delete="setModalName('serviceDeleteAlert', service.id)"
                       :menu_list="[{title: 'редактировать', icon_class: 'fa fa-pencil-square', class: '', emit_name: 'edit'},
                                    {title: 'удалить', icon_class: 'fa fa-times-circle', class: 'c-red', emit_name: 'delete'}]"/>

<!--        <div class="edit d-flex g-gap-1 j-content-flex-end d-block-hover p-relative f-weight-bold" v-if="profile && service.creator.id === profile.id">-->
<!--          <i class="fa fa-ellipsis-v" aria-hidden="true"></i>-->

<!--          <ul class="m-0-auto d-none animation-from-hidden p-absolute padding-05 bg-fff box-shadow-slim z-index-max">-->
<!--            <li @click="this.$router.push({name: 'serviceEdit', query:{id: service.id}})" class="padding-03 c-pointer c-content-hover f-size-small d-flex g-gap-_5 a-items-center">-->
<!--              <i class="far fa-edit"></i>-->
<!--              редактировать-->
<!--            </li>-->

<!--            <li @click="setModalName('serviceDeleteAlert', service.id)" class="padding-03 c-pointer c-content-hover f-size-small err-msg d-flex g-gap-_5 a-items-center">-->
<!--              <i class="fas fa-trash-alt"></i>-->
<!--              удалить-->
<!--            </li>-->
<!--          </ul>-->
<!--        </div>-->
      </div>

      <div class="service_img_block p-relative o-hidden m-top-05" v-if="service.image" @click="this.$emit('more')">
        <img :src="`${web_api}/image?filename=${service.image.filename}`" class="p-absolute absolute-center" alt="">
      </div>

      <h4 class="m-top-05 d-flex j-content-space-between a-items-center m-top-1">
        <div class="d-grid">
          {{ service.title }}
          <span class="f-size-small f-weight-bold">{{service.rubric.title}}</span>
        </div>
      </h4>

      <div class="d-flex j-content-space-between">
        <div class="d-grid g-gap-1 p-relative">
          <v-user-mini-block :user="service.creator"/>
        </div>

      </div>

      <p class="m-bottom-0">{{service.long_description}}</p>

      <div class="d-flex g-gap-3 j-content-space-between">
        <ul class="padding-left-1 list-style-content" v-if="service.categories.length">
          <b class="c-content">категории: </b>
          <li v-for="category in service.categories" :key="category.id" class="f-size-small f-weight-bold">{{category.title}}</li>
        </ul>

        <div class="contacts m-top-1">
          <span class="c-content"><b>контакты</b></span>
          <p v-for="contact in service.contacts" :key="contact.id" class="m-top-0 f-size-small m-bottom-0"><b>{{contact.type}} </b> <span>{{contact.information}}</span></p>
        </div>
      </div>
      <b class="c-content" v-if="service.payment_interval">цена {{service.price}}$ за {{service.payment_interval.title}}</b>
      <div class="d-flex j-content-space-between">
        <span class="f-size-small"><b>создано</b> {{service.creation_date}}</span>
      </div>
    </div>
  </div>

<!--  ALERTS-->
  <v-alert-modal label="вы дествительно хотите удалить услугу ?"
                 v-if="modalName === 'serviceDeleteAlert'"
                 @confirm="deleteService"
                 @close="setModalName(false)"/>
</template>

<script>
import toggleMixin from "@/mixins/toggle-mixin";
import {mapState} from "vuex";
import VAlertModal from "@/components/_general/v-alert-modal";
import VUserMiniBlock from "@/components/_general/v-user-mini-block";
import VMenuNormal from "@/components/_general/v-menu-normal.vue";
export default {
  name: "v-service-block",
  components: {VMenuNormal, VUserMiniBlock, VAlertModal},
  props: ['service_id'],
  mixins: [toggleMixin],
  computed: mapState({
    profile: state => state.auth.profile
  }),
  data(){
    return{
      service: null,
      web_api: process.env.WEB_API
    }
  },
  mounted(){
  //  SERVICE GET
    this.emitter.emit('load', true)
    this.$store.dispatch("service/GET", `?id=${this.service_id}`).then(data => {
      this.service = data.obj
      //  EMIT SIMILAR SERVICES
      this.$emit('similar', {rubric_id: data.obj.rubric_id, category_ids: Array.from(data.obj.categories, category => category.id)})
    }).finally(() => this.emitter.emit('load', false))
  },
  methods: {
    deleteService(){
      this.emitter.emit('load', true)
      this.$store.dispatch("service/DELETE", this.id).then(data => {
        this.emitter.emit('message', data)
      }).finally(() => this.emitter.emit('load', false))
    }
  }
}
</script>

<style scoped>
.modal-content{
  width: 40%;
}
.service_img_block{
  width: 100%;
  height: 320px;
}
.service_img_block > img{
  min-width: 100%;
  max-width: 120%;
  min-height: 80px;
  max-height: 150%;
}
</style>