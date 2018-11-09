<template>
    <div id="content">
        <div class="wrapper">
            <clock></clock>
            <date></date>
            <weather></weather>
        </div>
    </div>
</template>

<script>
    import clock from './components/clock';
    import date from './components/date';
    import weather from './components/weather';

    export default {
        name: "app",
        components: {
            'clock': clock,
            'date': date,
            'weather': weather
        }
    }
</script>
