<template>
    <div class="modal d-flex a-items-center j-content-center">
        <div class="modal-content h-max-content animation-from-hidden">
            <h3 class="m-top-0 m-bottom-1 t-center d-flex g-gap-1 a-items-center j-content-center">{{ lang.profile.language_block.title }}</h3>
            <div class="d-flex">
                <v-radios-normal name="lang" :active_id="this.defaultLang"
                                 @value="value => this.defaultLang = value.id"
                                 :radios="[{id: 'eng', title: '🇬🇧 English'}, {id: 'arm', title: '🇦🇲 հայերեն'}, {id: 'rus', title: '🇷🇺 Русский'}, ]"
                                 class="lang_radio"/>
            </div>

            <div class="btn_block m-top-1 d-flex j-content-center g-gap-_5">
                <v-button-normal class="bg-content f-size-small" :label="lang.general.save" @click="changeLang()"/>
                <v-button-normal class="f-size-small" :label="lang.general.cancel" @click="this.$emit('close')"/>
            </div>
        </div>


    </div>
</template>

<script>
import VRadiosNormal from "@/components/_general/v-radios-normal.vue";
import VButtonNormal from "@/components/_general/v-button-normal.vue";
import {mapState} from "vuex";

export default {
    name: "v-lang-block",
    components: {VButtonNormal, VRadiosNormal},
    computed: mapState({
        lang: state => state.lang.LANG
    }),
    data(){
       return{
           selectShow: true,
           defaultLang: 'eng',
       }
    },
    mounted() {
      this.defaultLang = localStorage.getItem('lang') || 'eng'
    },
    methods:{
        changeLang(){
          localStorage.setItem('lang', this.defaultLang)
          location.reload()
        },
    }
}
</script>

<style scoped>
.modal-content{
    width: 300px;
}

</style>