import request from "@/store/request";

const user_about = {
    namespaced: true,
    actions: {
        async CREATE(context, body){
            const data = await request(context, "/user_about", "POST", body)
            return data
        },
        async UPDATE(context, user_about_id, body){
            const data = await request(context, "/user_about?id="+user_about_id, "PUT", body)
            return data
        },
        async DELETE(context, user_about_id){
            const data = await request(context, "/user_about?id="+user_about_id, "DELETE")
            return data
        },
        async GET(context, query){
            const data = await request(context, "/user_about"+query, "GET")
            return data
        }
    }
}

export default user_about