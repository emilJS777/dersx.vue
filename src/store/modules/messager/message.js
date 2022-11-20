import request from "@/store/request";

const message = {
    namespaced: true,
    actions: {
        async CREATE(context, body){
            const data = await request(context, "/message", "POST", body)
            return data
        },
        async UPDATE(context, body){
            const data = await request(context, "/message?id="+body.id, "PUT", body.body)
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
    }
}

export default message