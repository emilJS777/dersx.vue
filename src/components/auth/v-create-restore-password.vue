<template>
    <div class="modal d-flex a-items-center j-content-center">
        <form class="modal-content h-max-content animation-from-hidden" @submit="createRestorePassword">
            <h3 class="m-top-0 m-bottom-1 t-center d-flex g-gap-1 a-items-center j-content-center"> {{ lang.guest.restore_password.title }}  </h3>
            <v-input-normal :label="lang.guest.restore_password.email.title" :span="lang.guest.restore_password.email.description" @value="value => form.address = value"/>


            <div class="btn_block d-flex g-gap-1 m-top-1 j-content-flex-end">
                <v-button-normal :label="lang.general.send" class="bg-content" @click="createRestorePassword"/>
                <v-button-normal :label="lang.general.cancel" @click="this.$emit('close')"/>
            </div>
        </form>
    </div>
</template>

<script>
import VButtonNormal from "@/components/_general/v-button-normal.vue";
import VInputNormal from "@/components/_general/v-input-normal.vue";
import {mapState} from "vuex";
import validator from "@/validations/create-restore-password.json"
import validateMixin from "@/mixins/validate-mixin";
export default {
    name: "v-create-restore-password",
    components: {VInputNormal, VButtonNormal},
    mixins: [validateMixin],
    computed: mapState({
        lang: state => state.lang.LANG
    }),
    data(){
        return{
            form: {
                address: ''
            }
        }
    },
    methods:{
        createRestorePassword(e){
            e.preventDefault()
            if(this.checkValid(this.form, validator)){
                this.emitter.emit('load', true)
                this.$store.dispatch('restore_password/CREATE', this.form).then(data => {
                    this.emitter.emit('message', data)
                }).finally(() => this.emitter.emit('load', false))
            }
        }
    }
}
</script>

<style scoped>
.modal-content{
    width: auto;
}
</style>