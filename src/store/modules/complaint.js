import request from "@/store/request";

const complaint = {
    namespaced: true,
    actions: {
        async CREATE(context, body){
            const data = await request(context, "/complaint", "POST", body)
            return data
        },
        async DELETE(context, complaint_id){
            const data = await request(context, "/complaint?id="+complaint_id, "DELETE")
            return data
        }
    }
}

export default complaint