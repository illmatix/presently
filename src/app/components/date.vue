<template>
    <h4>{{ date }}</h4>
</template>

<script>
    import moment from 'moment';

    export default {
        name: "date",
        data () {
            return {
                date: moment().format('LL')
            }
        },
        computed () {
            return this.date;
        },
        mounted: function(){
            setInterval(() => {
                this.date = moment().format('LL')
            }, 1000);
        }
    }
</script>
