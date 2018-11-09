<template>
    <div class="clock" v-if="time != ''">
        <h1>{{time}}</h1>
    </div>
</template>

<script>
    import moment from 'moment';

    export default {
        name: "clock",
        data () {
            return {
                time: moment().format('LTS'),
            }
        },
        mounted () {
            this.$options.interval = setInterval(this.updateDateTime, 1000);
        },
        beforeDestroy () {
            clearInterval(this.$options.interval);
        },
        methods: {
            updateDateTime () {
                let now = moment();
                this.time = now.format('LTS').toString()
            }
        }
    }
</script>
