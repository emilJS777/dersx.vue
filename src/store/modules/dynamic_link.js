import axios from "axios";

const dynamic_link = {
    namespaced: true,
    actions: {
        async GET(context, body){

            return axios({url: `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${process.env.FIREBASE_WEB_API_KEY}`,
                   method: "POST",
                   data:  {longDynamicLink: `${process.env.DYNAMIC_LINK_DOMAIN}/?link=${process.env.WEB_LINK}/${body.query}&ibi=&isi=&efr=1&st=${body.title}&sd=${body.description}&si=${body.image}`}}).then(data => {
                       return data.data.shortLink
            })
        }
    }
}

export default dynamic_link