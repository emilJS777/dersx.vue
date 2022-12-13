import request from "@/store/request";

const message = {
    namespaced: true,
    actions: {
        async CREATE(context, body){
            const data = await request(context, "/message", "POST", body)
            return data
        },
        async UPDATE(context, body){
            const data = await request(context, "/message?id="+body.id, "PUT", body.form)
            return data
        },
        async PATCH(context, message_id){
            const data = await request(context, "/message?id="+message_id, "PATCH")
            return data
        },
        async DELETE(context, message_id){
            const data = await request(context, "/message?id="+message_id, "DELETE")
            return data
        },
        async GET(context, query){
            const data = await request(context, "/message"+query, "GET")
            return data
        }
    },
    mutations: {
       SET_NOT_READ(state, not_read_messages){
           not_read_messages.forEach(message => state.NOT_READ_LIST.push(message))
       },
       DELETE_NOT_READ(state, read_message){
           state.NOT_READ_LIST.forEach((message, index) => {
               if(message.id === read_message.id){
                   state.NOT_READ_LIST.splice(index, 1)
               }
           })
       }
    },
    state: {
        NOT_READ_LIST: []
    },
    getters: {
        NOT_READ_LIST: (state) => state.NOT_READ_LIST
    }
}

export default message