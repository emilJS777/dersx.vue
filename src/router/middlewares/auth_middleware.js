import store from "@/store";

export default (to, from, next) => {
    if (localStorage.getItem("access_token")) {
        if(!store.state.auth.profile){
            store.dispatch("auth/GET_PROFILE").then(response => {
                if (response.success) {
                    store.commit("auth/SET_PROFILE", response.obj)
                    next()
                } else {
                    localStorage.removeItem("access_token")
                    next("/guest")
                }
            })
        }
        else
            next()
    } else {
        next("/guest")
    }
}