<template>
  <div class="modal d-flex j-content-center a-items-center">
    <div class="p-fixed top-0 left-0 w-max h-max" style="z-index: 0" @click="close"></div>
    <div class="modal-content w-max-content p-relative">
        <h3 class="m-top-0 t-center">share</h3>
        <div class="share_block d-flex g-gap-1">
            <ShareNetwork
                    network="facebook"
                    url=""
                    title="Say hi to Vite! A brand new, extremely fast development setup for Vue."
                    description="This week, I’d like to introduce you to 'Vite', which means 'Fast'. It’s a brand new development setup created by Evan You."
                    class="facebook"
                    media="http://185.218.124.120:5000/image?filename=5May:17:2023:06:17:262850.jpg"
            >
                <i class="fab fa-facebook-square"></i>
            </ShareNetwork>
            <ShareNetwork
                    network="linkedin"
                    url="http://185.218.124.120/"
                    title="Say hi to Vite! A brand new, extremely fast development setup for Vue."
                    description="This week, I’d like to introduce you to 'Vite', which means 'Fast'. It’s a brand new development setup created by Evan You."
                    quote="The hot reload is so fast it\'s near instant. - Evan You"
                    class="linkedin"
            >
                <i class="fab fa-linkedin"></i>
            </ShareNetwork>

            <ShareNetwork
                    network="twitter"
                    url="http://185.218.124.120/"
                    title="Say hi to Vite! A brand new, extremely fast development setup for Vue."
                    description="This week, I’d like to introduce you to 'Vite', which means 'Fast'. It’s a brand new development setup created by Evan You."
                    quote="The hot reload is so fast it\'s near instant. - Evan You"
                    class="twitter"
            >
                <i class="fab fa-twitter-square"></i>
            </ShareNetwork>
        </div>

    </div>
  </div>
</template>

<script>
export default {
    name: "v-share-modal",
    methods: {
        close(){
            this.$emit('close')
        }
    }
}
</script>

<style scoped>
.share_block{
    font-size: 50px;
    color: #fff;
}
.facebook{
    color: #0a80ed;
}
.linkedin{
    color: #0b65c2;
}
.twitter{
    color: #3083cb
}
</style>