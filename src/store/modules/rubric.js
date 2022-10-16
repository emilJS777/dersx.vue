import request from "@/store/request";

const rubric = {
    namespaced: true,
    actions: {
        async CREATE(context, body){
            const data = await request(context, "/rubric", "POST", body)
            return data
        },
        async UPDATE(context, rubric_id, body){
            const data = await request(context, "/rubric?id="+rubric_id, "PUT", body)
            return data
        },
        async DELETE(context, rubric_id){
            const data = await request(context, "/rubric?id="+rubric_id, "DELETE")
            return data
        },
        async GET(context, query){
            const data = await request(context, "/rubric"+query, "GET")
            return data
        }
    }
}

export default rubric