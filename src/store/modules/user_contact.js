import request from "@/store/request";

const user_contact = {
    namespaced: true,
    actions: {
        async CREATE(context, body){
            const data = await request(context, "/user_contact", "POST", body)
            return data
        },
        async UPDATE(context, user_contact_id, body){
            const data = await request(context, "/user_contact?id="+user_contact_id, "PUT", body)
            return data
        },
        async DELETE(context, user_contact_id){
            const data = await request(context, "/user_contact?id="+user_contact_id, "DELETE")
            return data
        },
        async GET(context, query){
            const data = await request(context, "/user_contact"+query, "GET")
            return data
        }
    }
}

export default user_contact