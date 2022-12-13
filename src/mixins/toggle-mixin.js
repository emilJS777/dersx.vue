const toggleMixin = {
    data(){
        return{
            modalName: false,
            id: null,
            obj: null
        }
    },
    methods:{
        setModalName(modal_name, id=null, obj=null){
            this.modalName = false;
            this.id = null;
            setTimeout(() => {
                this.modalName = modal_name
                this.id = id
                this.obj = obj
            }, 20)
        },
        refreshModalName(){

        }
    }
}
export default toggleMixin