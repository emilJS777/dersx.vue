<template>
    <div class="modal d-flex a-items-center j-content-center">
        <form class="modal-content h-max-content animation-from-hidden">
            <h4 class="m-top-0 m-bottom-1 t-center d-flex g-gap-1 a-items-center j-content-center" v-if="user">{{user.name}} {{lang.guest.restore_password.title}}</h4>
            <v-input-normal :label="lang.guest.restore_password.restore.new_password.title" type="password" :span="lang.guest.restore_password.restore.new_password.description" @value="value => form.new_password = value"/>
            <v-input-normal :label="lang.guest.restore_password.restore.repeat_password.title" type="password" class="m-top-1" @value="value => form.confirm_password = value"/>

            <div class="btn_block d-flex g-gap-1 m-top-1 j-content-flex-end">
                <v-button-normal :label="lang.general.send" class="bg-content" @click="updateRestorePassword"/>
                <v-button-normal :label="lang.general.cancel" @click="this.$emit('close')"/>
            </div>
        </form>
    </div>
</template>

<script>
import VButtonNormal from "@/components/_general/v-button-normal.vue";
import VInputNormal from "@/components/_general/v-input-normal.vue";
import {mapState} from "vuex";
import validator from "@/validations/update-restore-password.json"
import validateMixin from "@/mixins/validate-mixin";
export default {
    name: "v-update-restore-password",
    components: {VInputNormal, VButtonNormal},
    mixins: [validateMixin],
    computed: mapState({
        lang: state => state.lang.LANG
    }),
    data(){
        return{
            user: null,
            form: {
                new_password: '',
                confirm_password: ''
            }
        }
    },
    mounted() {
        this.emitter.emit('load', true)
        this.$store.dispatch('restore_password/GET', `?security_code=${this.$route.query.restore_password_security_code}`).then(data => {
            if(!data.success)
                this.$router.push({'path': '/'})
            else
                this.user = data.obj.user
        }).finally(() => this.emitter.emit('load', false))
    },
    methods: {
        updateRestorePassword(e){
            e.preventDefault()
            if(this.checkValid(this.form, validator)){
                this.emitter.emit('load', true)
                this.$store.dispatch('restore_password/UPDATE', {security_code: this.$route.query.restore_password_security_code, form: this.form}).then(data => {
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