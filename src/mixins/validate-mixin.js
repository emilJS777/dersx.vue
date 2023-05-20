import {mapState} from "vuex";

const validateMixin = {
    computed: mapState({
       lang: state => state.lang.lang
    }),
    data(){
        return{
            msg: ""
        }
    },
    methods:{
        checkValid(form, validator, messageModal=true){
            this.msg = ""
            for (let field in form) {
                if (validator[field]) {
                    const value = form[field];

                    if (validator[field].type === 'string') {
                        const { minLength, maxLength, msg, required, pattern, match } = validator[field];

                        if (minLength && value.length < minLength || maxLength && value.length > maxLength || pattern && !value.match(pattern) || match && value !== form[match]) {
                            if(!required && value || required){
                                if(messageModal)
                                    this.msg += `${msg[this.lang.lang]} <br/>`;
                                else
                                    this.msg = true
                            }
                        }
                    }
                    if (validator[field].type === 'number') {
                        const { minimum, maximum, msg, required } = validator[field];
                        if (value < minimum || value > maximum) {
                            if(!required && value || required){
                                if(messageModal)
                                    this.msg += `${msg[this.lang.lang]} <br/>`;
                                else
                                    this.msg = true
                            }
                        }
                    }
                }
            }
            if(this.msg) {
                if(messageModal)
                    this.emitter.emit('message', {obj: {success: false, msg: this.msg}})
                return false
            }
            else
                return true
        }
    }
}
export default validateMixin