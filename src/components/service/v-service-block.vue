<template>
  <div class="service">
    <div class="bg-fff padding-1 w-max" v-if="service">
      <div class="service_img_block p-relative o-hidden" v-if="service.image" @click="this.$emit('more')">
        <img :src="`http://127.0.0.1:5000/image?filename=${service.image.filename}`" class="p-absolute absolute-center" alt="">
      </div>
      <div class="d-flex m-top-05">
        <span class="f-size-small c-pointer c-content-hover t-decoration-underline-hover" @click="$router.go(-1)">&#9664; назад</span>
      </div>
      <h4 class="m-top-05 d-flex j-content-space-between">
        {{ service.title }}
        <div class="edit d-flex g-gap-1 j-content-flex-end" v-if="profile && service.creator.id === profile.id">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash err-msg c-pointer animation-from-hidden" viewBox="0 0 16 16"
               @click="setModalName('serviceDeleteAlert', service.id)">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
          </svg>

          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square c-pointer animation-from-hidden" viewBox="0 0 16 16"
               @click="this.$router.push({name: 'serviceEdit', query:{id: service.id}})">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
          </svg>
        </div>

      </h4>

      <div class="d-flex j-content-space-between">
        <div class="d-grid g-gap-1 p-relative">
          <v-user-mini-block :user="service.creator"/>
        </div>
        <span class="f-size-small f-weight-bold">{{service.rubric.title}}</span>
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
export default {
  name: "v-service-block",
  components: {VUserMiniBlock, VAlertModal},
  props: ['service_id'],
  mixins: [toggleMixin],
  computed: mapState({
    profile: state => state.auth.profile
  }),
  data(){
    return{
      service: null
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
  height: 260px;
}
.service_img_block > img{
  min-width: 100%;
  max-width: 120%;
  min-height: 80px;
  max-height: 300px;
}
</style>