import request from "@/store/request";

const friend = {
    namespaced: true,
    actions: {
        async CREATE(context, body){
            const data = await request(context, "/friend", "POST", body)
            return data
        },
        async UPDATE(context, friend_id){
            const data = await request(context, "/friend?id="+friend_id, "PUT")
            return data
        },
        async DELETE(context, friend_id){
            const data = await request(context, "/friend?id="+friend_id, "DELETE")
            return data
        },
        async GET(context, query){
            const data = await request(context, "/friend"+query, "GET")
            return data
        }
    }
}

export default friend