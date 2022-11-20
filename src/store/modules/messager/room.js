import request from "@/store/request";

const room = {
    namespaced: true,
    actions: {
        async DELETE(context, forum_discussion_id){
            const data = await request(context, "/room?id="+forum_discussion_id, "DELETE")
            return data
        },
        async GET(context, query){
            const data = await request(context, "/room"+query, "GET")
            return data
        }
    }
}

export default room