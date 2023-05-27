<template>
  <div class="modal d-flex j-content-center a-items-center">
    <div class="p-fixed top-0 left-0 w-max h-max" style="z-index: 0" @click="close"></div>
    <div class="modal-content w-max-content p-relative" v-if="shortLink">

        <div class="share_block d-grid g-gap-_3">
            <v-button-normal icon="fa fa-share-alt" class="cut-text f-size-small w-200 o-hidden t-center c-555 copy" @click="copy_link" :label="this.shortLinkIsCopy ? 'copied' : this.shortLink"/>

            <ButtonFacebook
                    @click="close"
                    class="facebook f-size-small t-center"
                    title="title"
                    text="Facebook"
                    :url="this.shortLink"
                    isRounded
                    hasIcon
            />
            <ButtonLinkedIn
                    @click="close"
                    class="linkedin f-size-small t-center"
                    title="title"
                    text="Linkedin"
                    :url="this.shortLink"
                    isRounded
                    hasIcon
            />
        </div>
    </div>
  </div>
</template>

<script>
import { ButtonFacebook, ButtonLinkedIn } from 'share-button-links';
import VButtonNormal from "@/components/_general/v-button-normal.vue";
export default {
    name: "v-share-modal",
    props: ['description', 'image', 'publication_id'],
    components: {VButtonNormal, ButtonFacebook, ButtonLinkedIn},
    data(){
       return{
           shortLink: null,
           shortLinkIsCopy: false
       }
    },
    // components: {ButtonFacebook, ButtonLinkedIn},
    mounted() {
        this.emitter.emit('load', true)
       this.$store.dispatch("dynamic_link/GET", {query: `publication?id=${this.publication_id}`, title: `${this.description}`, description: '', image: this.image}).then(data => {
           this.shortLink = data
        }).finally(() => this.emitter.emit('load', false))
    },
    methods: {
        close(){
            this.$emit('close')
        },
        copy_link(){
            const textArea = document.createElement('textarea');
            textArea.

                value = this.shortLink;
            document.body.appendChild(textArea);
            textArea.select();

            try {
                const successful = document.execCommand('copy');
                if (successful) {
                    this.shortLinkIsCopy = true;
                    setTimeout(() => {
                        this.shortLinkIsCopy = false;
                    }, 500);
                } else {
                    console.error('Failed to copy link.');
                }
            } catch (error) {
                console.error('Failed to copy link:', error);
            }

            document.body.removeChild(textArea);
        },
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
.copy{
    background-color: #fff !important;
    color: #555 !important;
    border: 0;
}
.copy:hover{
    background-color: #275172 !important;
    color: #fff!important;
}
</style>