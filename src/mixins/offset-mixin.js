const offsetMixin = {
    data(){
        return{
            limit: 8,
            offset: 0,
            show_more: true
        }
    },
    methods:{
        setOffset(){
            this.offset += this.limit
        },
        setLimit(limit){
            this.limit = limit
        },
        showMore(limit_length){
            if(limit_length < this.limit)
                this.show_more = false
        }
    }
}
export default offsetMixin
