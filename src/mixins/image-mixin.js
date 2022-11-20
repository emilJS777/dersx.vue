const imageGetMixin = {
    data(){
        return{
            image:{
                b64: null,
                format: null,
                filename: null
            }
        }
    },
    methods:{
        onImage(image, query){
            this.emitter.emit("load", true)
            this.$store.dispatch("image/CREATE", {query: query, form: image}).then(() => {
                // this.emitter.emit('message', data)
            }).finally(() => this.emitter.emit('load', false))
        },
        deleteImage(filename){
            this.emitter.emit("load", true)
            this.$store.dispatch("image/DELETE", filename).then(() => {
                // this.emitter.emit('message', data)
            }).finally(() => this.emitter.emit('load', false))
        },
        getImage(filename){
            this.emitter.emit("load", true)
            return this.$store.dispatch("image/GET", filename).then(data => {
                this.image.b64 = data.b64
                this.image.format = data.format
                this.image.filename = data.filename
                return data
                // this.emitter.emit('message', data)
            }).finally(() => this.emitter.emit('load', false))
        }
    }
}
export default imageGetMixin