<template>
  <div class="company_block bg-fff padding-1 box-shadow-slim">
    <div class="company  a-items-flex-start g-gap-1 p-relative w-max" v-if="company">
      <v-company-normal-block :company="this.company"/>
      <v-menu-normal
          v-if="company.creator_id === profile.id"
          @edit="this.$router.push({name: 'vacancyEdit', query:{id: vacancy.id}})"
          @delete="setModalName('companyDeleteAlert')"
          :menu_list="[{title: 'пригласить', icon_class: 'fa fa-user-plus', class: '', emit_name: 'invite'},
                         {title: 'редактировать', icon_class: 'fa fa-pencil-square', class: '', emit_name: 'edit'},
                         {title: 'удалить', icon_class: 'fa fa-times-circle', class: 'c-red', emit_name: 'delete'}]"/>
    </div>
  </div>

<!--  MODALS-->
  <v-alert-modal v-if="modalName === 'companyDeleteAlert'"
                 @confirm="deleteCompany"
                 @close="setModalName(false)"
                 label="вы дествительно хотите удалить компанию ?"/>
</template>

<script>
import VMenuNormal from "@/components/_general/v-menu-normal.vue";
import {mapState} from "vuex";
import toggleMixin from "@/mixins/toggle-mixin";
import VAlertModal from "@/components/_general/v-alert-modal.vue";
import VCompanyNormalBlock from "@/components/_general/v-company-normal-block.vue";

export default {
  name: "v-company-block",
  components: {VCompanyNormalBlock, VAlertModal, VMenuNormal},
  props: ['company'],
  mixins: [toggleMixin],
  computed: mapState({
    profile: state => state.auth.profile
  }),
  data(){
    return{
      web_api: process.env.WEB_API
    }
  },
  methods: {
    deleteCompany(){
      this.emitter.emit('load', true)
      this.$store.dispatch("company/DELETE", this.company.id).then(data => {
        this.emitter.emit('message', data)
      }).finally(() => this.emitter.emit('load', false))
    }
  }
}
</script>

<style scoped>
.company{
  grid-template-columns: 1fr 4fr;
}
.img_block{
  border: 1px solid #ccc;
  height: 140px;
  width: 140px;
}
img{
  width: 120%;
  height: auto;
}
</style>