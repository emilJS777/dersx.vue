import request from "@/store/request";


const work_experience = {
    namespaced: true,
    actions: {
        async CREATE(context, body){
            const data = await request(context, "/work_experience", "POST", body)
            return data
        },
        async UPDATE(context, work_experience_id, body){
            const data = await request(context, "/work_experience?id="+work_experience_id, "PUT", body)
            return data
        },
        async DELETE(context, work_experience_id){
            const data = await request(context, "/work_experience?id="+work_experience_id, "DELETE")
            return data
        },
        async GET(context, query){
            const data = await request(context, "/work_experience"+query, "GET")
            return data
        }
    }
}

export default work_experience