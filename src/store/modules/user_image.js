import request from "@/store/request";

const user_image = {
    namespaced: true,
    actions: {
        async CREATE(context, body){
            const data = await request(context, "/user_image", "POST", body)
            return data
        },
        async DELETE(context, user_image_path){
            const data = await request(context, "/user_image?filename="+user_image_path, "DELETE")
            return data
        },
        async GET(context, query){
            const data = await request(context, "/user_image"+query, "GET")
            return data
        }
    }
}

export default user_image