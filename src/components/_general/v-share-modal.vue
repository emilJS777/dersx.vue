<template>
  <div class="modal d-flex j-content-center a-items-center" @click="close">
    <div class="p-fixed top-0 left-0 w-max h-max" style="z-index: 0"></div>
    <div class="modal-content w-max-content p-relative" v-if="shortLink">
        <div class="share_block d-grid g-gap-_3">
            <ButtonCopy
                    class="f-size-small t-center copy"
                    title="title"
                    :text="this.shortLink"
                    :url="this.shortLink"
                    isRounded
                    hasIcon
            />
            <ButtonFacebook
                    class="facebook f-size-small t-center"
                    title="title"
                    text="Facebook"
                    :url="this.shortLink"
                    isRounded
                    hasIcon
            />
            <ButtonLinkedIn
                    class="linkedin f-size-small t-center"
                    title="title"
                    text="Linkedin"
                    :url="this.shortLink"
                    isRounded
                    hasIcon
            />

<!--            <ShareNetwork-->
<!--                    network="facebook"-->
<!--                    url="http://185.218.124.120/"-->
<!--                    title="Say hi to Vite! A brand new, extremely fast development setup for Vue."-->
<!--                    description="This week, I’d like to introduce you to 'Vite', which means 'Fast'. It’s a brand new development setup created by Evan You."-->
<!--                    class="facebook"-->
<!--            >-->
<!--                <i class="fab fa-facebook-square"></i>-->
<!--            </ShareNetwork>-->
<!--            <ShareNetwork-->
<!--                    network="linkedin"-->
<!--                    url="http://185.218.124.120/"-->
<!--                    title="Say hi to Vite! A brand new, extremely fast development setup for Vue."-->
<!--                    description="This week, I’d like to introduce you to 'Vite', which means 'Fast'. It’s a brand new development setup created by Evan You."-->
<!--                    class="facebook"-->
<!--            >-->
<!--                <i class="fab fa-linkedin"></i>-->
<!--            </ShareNetwork>-->

<!--            <ShareNetwork-->
<!--                    network="twitter"-->
<!--                    url="http://185.218.124.120/"-->
<!--                    title="Say hi to Vite! A brand new, extremely fast development setup for Vue."-->
<!--                    description="This week, I’d like to introduce you to 'Vite', which means 'Fast'. It’s a brand new development setup created by Evan You."-->
<!--                    quote="The hot reload is so fast it\'s near instant. - Evan You"-->
<!--                    class="twitter"-->
<!--            >-->
<!--                <i class="fab fa-twitter-square"></i>-->
<!--            </ShareNetwork>-->
        </div>

    </div>
  </div>
</template>

<script>
import { ButtonFacebook, ButtonLinkedIn, ButtonCopy } from 'share-button-links';
export default {
    name: "v-share-modal",
    props: ['description', 'image', 'publication_id'],
    components: {ButtonFacebook, ButtonLinkedIn, ButtonCopy},
    data(){
       return{
           shortLink: null
       }
    },
    // components: {ButtonFacebook, ButtonLinkedIn},
    mounted() {
        this.emitter.emit('load', true)
       this.$store.dispatch("dynamic_link/GET", {query: `publication?id=${this.publication_id}`, title: `skillx.am`, description: this.description, image: this.image}).then(data => {
           this.shortLink = data
        }).finally(() => this.emitter.emit('load', false))
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
    grid-template-columns: 1fr;
}
.facebook{
    background-color: #0a80ed;
    border: 0;
}
.linkedin{
    background-color: #0b65c2;
    border: 0;
}
.twitter{
    background-color: #1b80c5;
    border: 0;
}
</style>