<template>
  <div class="bg-fff padding-1" v-if="!modalName">
    <h3 class="f-weight-bold m-top-0 m-bottom-0 d-flex j-content-space-between a-items-center">
      навыки и умения
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-pencil-square c-pointer c-content-hover d-none" viewBox="0 0 16 16"
           @click="setModalName('skillsEditModal')"  v-if="profile && profile.id === parseInt(this.$route.query.id)">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
      </svg>
    </h3>
    <i class="m-top-0" v-if="!skills.length">данный раздел пуст </i>
    <div v-else>
      <div v-for="skill in skills" :key="skill.id" class="d-grid g-gap-1 a-items-center about_block">
        <div class="m-top-1">
          <div class="d-flex g-gap-1 a-items-center">
            <b>рубрика: </b>
            <span class="f-size-small">{{skill.rubric.title}}</span>
          </div>
          <div class="" v-if="skill.categories.length">
            <b>категории: </b>
            <span v-for="category in skill.categories" :key="category.id" class="f-size-small">
              - {{category.title}}
            </span>
          </div>
          <div class="">
            <b>теги: </b>
            <span class="f-size-small">{{skill.tags}}</span>
          </div>
        </div>
        <div class="edit d-flex g-gap-1"  v-if="profile && profile.id === parseInt(this.$route.query.id)">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash err-msg c-pointer" viewBox="0 0 16 16"
               @click="this.setModalName('skillDeleteAlertModal', skill.id)">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
          </svg>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-fff padding-1" v-if="!modalName">
    <h3 class="f-weight-bold m-bottom-0 m-top-0 d-flex j-content-space-between a-items-center">
      опыт работы
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-pencil-square c-pointer c-content-hover d-none" viewBox="0 0 16 16"
           @click="setModalName('workExperienceEditModal')"  v-if="profile && profile.id === parseInt(this.$route.query.id)">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
      </svg>
    </h3>
    <i class="m-top-0" v-if="!work_experiences.length">данный раздел пуст </i>
    <div v-else>
      <div v-for="work_experience in work_experiences" :key="work_experience.id" class="d-grid g-gap-1 a-items-center about_block">
        <div class="m-top-1">
          <div class="d-flex g-gap-1">
            <b>название: </b>
            <span class="f-size-small" v-if="work_experience.title">{{work_experience.title}}</span>
            <span class="f-size-small" v-else>(не указан)</span>
          </div>
          <div class="d-flex g-gap-1">
            <b>линк: </b>
            <span class="f-size-small" v-if="work_experience.link">
              <a :href="work_experience.link" class="c-content">{{work_experience.link}}</a>
            </span>
            <span class="f-size-small" v-else>(не указан)</span>
          </div>
          <div class="d-flex g-gap-1">
            <b>используемые скилы или технологии: </b>
            <span class="f-size-small" v-if="work_experience.skills">{{work_experience.skills}}</span>
            <span class="f-size-small" v-else>(не указан)</span>
          </div>
          <div class="d-flex g-gap-1">
            <b>описание: </b>
            <span class="f-size-small" v-if="work_experience.description">{{work_experience.description}}</span>
            <span class="f-size-small" v-else>(не указан)</span>
          </div>
          <div class="d-flex g-gap-1">
            <b>дата начало работы: </b>
            <span class="f-size-small" v-if="work_experience.date_start">{{work_experience.date_start}}</span>
            <span class="f-size-small" v-else>(не указан)</span>
          </div>
          <div class="d-flex g-gap-1">
            <b>дата окончание работы: </b>
            <span class="f-size-small" v-if="work_experience.date_end">{{work_experience.date_end}}</span>
            <span class="f-size-small" v-else>(не указан)</span>
          </div>
        </div>
        <div class="edit d-flex g-gap-1"  v-if="profile && profile.id === parseInt(this.$route.query.id)">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash err-msg c-pointer" viewBox="0 0 16 16"
               @click="this.setModalName('workExperiencesDeleteAlertModal', work_experience.id)">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
          </svg>
        </div>
      </div>
    </div>
  </div>

<!--  <div class="bg-fff padding-1">-->
<!--    <h3 class="f-weight-bold m-bottom-0 m-top-0 d-flex j-content-space-between a-items-center">-->
<!--      учеба-->
<!--      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-pencil-square c-pointer c-content-hover d-none" viewBox="0 0 16 16"-->
<!--           @click="setModalName('aboutMeEditModal')"  v-if="profile && profile.id === parseInt(this.$route.query.id)">-->
<!--        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>-->
<!--        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>-->
<!--      </svg>-->
<!--    </h3>-->
<!--    <i class="m-top-0">данный раздел пуст </i>-->
<!--  </div>-->

  <div class="bg-fff padding-1" v-if="!modalName">
    <h3 class="f-weight-bold m-bottom-0 m-top-0 d-flex j-content-space-between a-items-center">
      контакты
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-pencil-square c-pointer c-content-hover d-none" viewBox="0 0 16 16"
           @click="setModalName('contactEditModal')"  v-if="profile && profile.id === parseInt(this.$route.query.id)">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
      </svg>
    </h3>
    <i class="m-top-0" v-if="!user_contacts.length">данный раздел пуст </i>
    <div v-else>
      <div v-for="user_contact in user_contacts" :key="user_contact.id" class="d-grid a-items-center g-gap-_5 about_block m-top-1">
        <div class="d-flex g-gap-_5 a-items-center">
          <b>{{user_contact.type}}</b>
          <span class="f-size-small">{{user_contact.information}}</span>
        </div>
        <div class="edit d-flex"  v-if="profile && profile.id === parseInt(this.$route.query.id)">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash err-msg c-pointer" viewBox="0 0 16 16"
               @click="this.setModalName('userContactDeleteAlertModal', user_contact.id)">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
          </svg>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-fff padding-1" v-if="!modalName">
    <h3 class="f-weight-bold m-bottom-0 m-top-0 d-flex j-content-space-between a-items-center">
      о себе
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-pencil-square c-pointer c-content-hover d-none" viewBox="0 0 16 16"
           @click="setModalName('aboutMeEditModal')"  v-if="profile && profile.id === parseInt(this.$route.query.id)">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
      </svg>
    </h3>
    <i class="m-top-0" v-if="!user_abouts.length">данный раздел пуст </i>
    <div v-else>
      <div v-for="user_about in user_abouts" :key="user_about.id" class="m-top-1 d-grid g-gap-_5 a-items-center about_block">
        <span class="f-size-small">{{user_about.description}}</span>
        <div class="edit d-flex g-gap-1"  v-if="profile && profile.id === parseInt(this.$route.query.id)">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash err-msg c-pointer" viewBox="0 0 16 16"
               @click="this.setModalName('userAboutDeleteAlertModal', user_about.id)">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
          </svg>
        </div>
      </div>
    </div>
  </div>

  <v-skills-edit-form v-if="modalName === 'skillsEditModal'" @close="setModalName(false)"/>
  <v-about-me-edit-form v-if="modalName === 'aboutMeEditModal'" @close="setModalName(false)"/>
  <v-work-experience-edit-form v-if="modalName === 'workExperienceEditModal'" @close="setModalName(false)"/>
  <v-contact-edit-form v-if="modalName === 'contactEditModal'" @close="setModalName(false)"/>

  <v-alert-modal label="вы дествительно хотите удалить ваш скилл ?"
                 v-if="modalName === 'skillDeleteAlertModal'"
                 @confirm="delete_skill(this.id)"
                 @close="setModalName(false)"/>

  <v-alert-modal label="вы дествительно хотите удалить ваш опыт работы ?"
                 v-if="modalName === 'workExperiencesDeleteAlertModal'"
                 @confirm="delete_work_experiences(this.id)"
                 @close="setModalName(false)"/>

  <v-alert-modal label="вы дествительно хотите удалить информацию о вас ?"
                 v-if="modalName === 'userAboutDeleteAlertModal'"
                 @confirm="delete_user_about(this.id)"
                 @close="setModalName(false)"/>

  <v-alert-modal label="вы дествительно хотите удалить контактную информацию ?"
                 v-if="modalName === 'userContactDeleteAlertModal'"
                 @confirm="delete_user_contact(this.id)"
                 @close="setModalName(false)"/>
</template>

<script>
import VSkillsEditForm from "@/components/profile/modals/v-skills-edit-form";
import toggleMixin from "@/mixins/toggle-mixin";
import VAboutMeEditForm from "@/components/profile/modals/v-about-me-edit-form";
import VAlertModal from "@/components/_general/v-alert-modal";
import {mapState} from "vuex";
import VWorkExperienceEditForm from "@/components/profile/modals/v-work-experience-edit-form";
import VContactEditForm from "@/components/profile/modals/v-contact-edit-form";
export default {
  name: "v-profile-about",
  mixins: [toggleMixin],
  components: {VContactEditForm, VWorkExperienceEditForm, VAlertModal, VAboutMeEditForm, VSkillsEditForm},
  computed: mapState({
    profile: state => state.auth.profile
  }),
  data(){
    return{
      skills: [],
      user_abouts: [],
      user_contacts: [],
      work_experiences: []
    }
  },
  mounted() {
    this.emitter.emit('load', true)
    //  SKILLS
    this.$store.dispatch("skill/GET", `?user_id=${this.$route.query.id}`).then(data => {
      this.skills = data.obj
    })
  //  WORK EXPERIENCES
    this.$store.dispatch("work_experience/GET", `?user_id=${this.$route.query.id}`).then(data => {
      this.work_experiences = data.obj
    })
  //  USER ABOUT
    this.$store.dispatch("user_about/GET", `?user_id=${this.$route.query.id}`).then(data => {
      this.user_abouts = data.obj
    })
  //  USER CONTACTS
    this.$store.dispatch("user_contact/GET", `?user_id=${this.$route.query.id}`).then(data => {
      this.user_contacts = data.obj
    })
    this.emitter.emit('load', false)
  },
  methods: {
    delete_skill(id){
      this.$store.dispatch("skill/DELETE", id).then(data => {
        this.emitter.emit("message", data);
      })
    },
    delete_work_experiences(id){
      this.$store.dispatch("work_experience/DELETE", id).then(data => {
        this.emitter.emit("message", data);
      })
    },
    delete_user_about(id){
      this.$store.dispatch("user_about/DELETE", id).then(data => {
        this.emitter.emit("message", data);
      })
    },
    delete_user_contact(id){
      this.$store.dispatch("user_contact/DELETE", id).then(data => {
        this.emitter.emit("message", data);
      })
    }
  }
}
</script>

<style scoped>
div:hover > h3 > svg{
  display: block;
}
.edit{
  height: 20px;
}
.edit svg{
  display: none;
}
.about_block:hover svg{
  display: block;
}
/*.about_block > div{*/
/*  margin-bottom: 5px;*/
/*}*/
</style>