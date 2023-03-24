import request from "@/store/request";

const group_invite = {
    namespaced: true,
    actions: {
        async CREATE(context, body){
            const data = await request(context, "/group_invite", "POST", body)
            return data
        },
        async UPDATE(context, group_invite_id){
            const data = await request(context, "/group_invite?id="+group_invite_id, "PUT")
            return data
        },
        async DELETE(context, query){
            const data = await request(context, "/group_invite"+query, "DELETE")
            return data
        },
        async GET(context, query){
            const data = await request(context, "/group_invite"+query, "GET")
            return data
        },
    }
}

export default group_invite