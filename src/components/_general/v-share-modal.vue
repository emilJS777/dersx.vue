<template>
  <div class="modal d-flex j-content-center a-items-center">
    <div class="p-fixed top-0 left-0 w-max h-max" style="z-index: 0" @click="close"></div>
    <div class="modal-content w-max-content p-relative">
        <h3 class="m-top-0 t-center">share</h3>
        <div class="share_block d-flex g-gap-1">
            <ShareNetwork
                    network="facebook"
                    :url="`${this.web_api}/?v=${this.publication_id}`"
                    title="Say hi to Vite! A brand new, extremely fast development setup for Vue."
                    description="This week, I’d like to introduce you to 'Vite', which means 'Fast'. It’s a brand new development setup created by Evan You."
                    class="facebook"
            >
                <i class="fab fa-facebook-square"></i>
            </ShareNetwork>
            <ShareNetwork
                    network="linkedin"
                    url="http://185.218.124.120/"
                    title="Say hi to Vite! A brand new, extremely fast development setup for Vue."
                    description="This week, I’d like to introduce you to 'Vite', which means 'Fast'. It’s a brand new development setup created by Evan You."
                    class="facebook"
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
import {computed, reactive} from "vue";
import {useHead} from "@vueuse/head";

export default {
    name: "v-share-modal",
    props: ['description', 'image', 'publication_id'],
    data(){
      return {
          web_api: process.env.WEB_API
      }
    },
    mounted(){
        const siteData = reactive({
            description: this.description,
            image: this.image,
            type: 'website',
            title: 'skillx.am'
        })
        useHead({
            meta: [
                {
                    name: 'og:title',
                    content: computed(() => siteData.title)
                },
                {
                    name: 'og:type',
                    content: computed(() => siteData.type)
                },
                {
                    name: 'og:url',
                    content: computed(() => this.web_api)
                },
                {
                    name: 'og:description',
                    content: computed(() => siteData.description)
                },
                {
                    name: 'og:image',
                    content: computed(() => siteData.image)
                }
            ]
        })
    },
    methods: {
        close(){
            this.$emit('close')
        }
    },
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