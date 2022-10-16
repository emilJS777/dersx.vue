import request from "@/store/request";

const skill = {
    namespaced: true,
    actions: {
        async CREATE(context, body){
            const data = await request(context, "/skill", "POST", body)
            return data
        },
        async UPDATE(context, skill_id, body){
            const data = await request(context, "/skill?id="+skill_id, "PUT", body)
            return data
        },
        async DELETE(context, skill_id){
            const data = await request(context, "/skill?id="+skill_id, "DELETE")
            return data
        },
        async GET(context, query){
            const data = await request(context, "/skill"+query, "GET")
            return data
        }
    }
}

export default skill