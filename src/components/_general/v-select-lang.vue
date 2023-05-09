<template>
  <div class="select_block c-pointer p-relative" style="padding: 6px" @click="this.selected = !this.selected">
    <div class="d-flex g-gap-_3 a-items-center padding-02 f-size-small l-height-1 c-555">
        <div class="d-flex a-items-center w-max j-content-center g-gap-_3" v-if="lang.lang === 'eng'">
            <span style="font-size: 20px">🇬🇧</span>
            <span> Eng</span>
        </div>
        <div class="d-flex a-items-center w-max j-content-center g-gap-_3" v-if="lang.lang === 'rus'">
            <span style="font-size: 20px">🇷🇺</span>
            <span> Рус</span>
        </div>
        <div class="d-flex a-items-center w-max j-content-center g-gap-_3" v-if="lang.lang === 'arm'">
            <span style="font-size: 20px">🇦🇲 </span>
            <span>  հայ</span>
        </div>
        <span class="f-size-very-small">▼</span>
    </div>

    <div class="p-absolute bg-fff select_list_block left-0 right-0 select_block w-max m-0-auto padding-0 animation-from-hidden" v-if="selected">
        <div class="g-gap-_3 a-items-center padding-02 f-size-small c-555 d-grid">
            <div class="d-flex a-items-center w-max j-content-center bg-content-hover g-gap-_3" v-if="lang.lang !== 'eng'" @click="set_lang('eng')">
                <span style="font-size: 20px">🇬🇧</span>
                <span> Eng</span>
            </div>
            <div class="d-flex a-items-center w-max j-content-center bg-content-hover g-gap-_3" v-if="lang.lang !== 'arm'" @click="set_lang('arm')">
                <span style="font-size: 20px">🇦🇲 </span>
                <span>  հայ</span>
            </div>
            <div class="d-flex a-items-center w-max j-content-center bg-content-hover g-gap-_3" v-if="lang.lang !== 'rus'" @click="set_lang('rus')">
                <span style="font-size: 20px">🇷🇺</span>
                <span>  Рус</span>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
    name: "v-select-lang",
    computed: mapState({
        lang: state => state.lang.LANG
    }),
    data(){
        return{
            selected: false
        }
    },
    mounted() {
       this.get_lang()
    },
    methods: {
        set_lang(lang){
            localStorage.setItem('lang', lang)
            this.get_lang()
        },
        get_lang(){
            this.emitter.emit('load', true)
            this.$store.dispatch("lang/GET", `?lang=${localStorage.getItem('lang') || 'eng'}`).finally(() => {this.emitter.emit('load', false)})
        }
    }
}
</script>

<style scoped>
.select_block{
    border: 1px solid #d2d4d5;
}
/*.select_list_block{*/
/*    top: 90%;*/
/*}*/
</style>