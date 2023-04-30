

const localTimeMixin = {
    data(){
        return{
            date_time: ''
        }
    },
    methods: {
        getLocalTime(datetimeString) {
            const gmtTime = new Date(datetimeString);
            const timezoneOffset = gmtTime.getTimezoneOffset() / 60;
            const localTime = new Date(gmtTime.getTime() + (timezoneOffset * 60 * 60 * 1000));
            const now = new Date();

            if (localTime.toDateString() === now.toDateString()) {
                this.date_time = localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            // } else if (localTime.toDateString() === new Date(now.getTime() - 24 * 60 * 60 * 1000).toDateString()) {
            //     this.date_time = 'Yesterday ' + localTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            } else {
                this.date_time = localTime.toLocaleString();
            }
        }
    }
}
export default localTimeMixin