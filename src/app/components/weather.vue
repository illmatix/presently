<template>
    <div class="weather" v-if="loading == false">
        <div class="weather__presently">
            <h5 v-if="location != ''">{{location}}</h5>
            <h5 v-if="temp != ''">{{temp}}°C</h5>
        </div>
        <div class="weather__forecast" v-if="forecast != ''">
            <ul>
               <li class="forecast" v-for="dayforecast in forecast">
                   <h6 class="forecast__weekday" v-if="dayforecast.day != ''"><strong>{{dayforecast.day}}</strong></h6>
                   <p class="forecast__templow" v-if="dayforecast.temp_low != ''">{{ dayforecast.temp_low}}°C</p>
                   <p class="forecast__temphigh" v-if="dayforecast.temp_high != ''">{{ dayforecast.temp_high}}°C</p>
                   <p class="forecast__text" v-if="dayforecast.text != ''">{{dayforecast.text}}</p>
               </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: "weather",
        data () {
            return {
                loading: true,
                lat: null,
                lon: null,
                location: null,
                temp: null,
                forecast: [],
                images: {
                    "rain": [
                        "clouds.jpg"
                    ],
                    "catchall": [
                        "clouds.jpg"
                    ]
                },
                selectedImage: null
            }
        },
        mounted () {
            this.$options.interval = setInterval(this.updateWeather, 60 * 60 * 10);
        },
        created() {
            navigator.geolocation.getCurrentPosition(pos => {
                this.lat = pos.coords.latitude;
                this.lon = pos.coords.longitude;
                this.updateWeather();
            });
        },
        methods: {
            convertTempToCelsius($value) {
                return Math.round(5/9*(parseInt($value)-32));
            },
            updateWeather() {
                let url = 'https://query.yahooapis.com/v1/public/yql'
                    + '?q=select * from weather.forecast where woeid in '
                    + '(SELECT woeid FROM geo.places WHERE text="(' + this.lat + ',' + this.lon + ')")'
                    + '&format=json'
                    + '&d=5'
                    + '&env=store://datatables.org/alltableswithkeys';

                axios.get(url)
                    .then(res => {
                        let weather = res.data.query.results.channel;

                        this.location = weather.location.city + ", " + weather.location.region;
                        this.temp = this.convertTempToCelsius(weather.item.condition.temp);

                        let forecast = weather.item.forecast;
                        let today = forecast[0].day;
                        if(this.forecast.length > 0) { this.forecast = [] }
                        forecast.forEach((entry) => {
                            if(entry.day == today) { return; }
                            this.forecast.push({
                                day: entry.day,
                                temp_low: this.convertTempToCelsius(entry.low),
                                temp_high: this.convertTempToCelsius(entry.high),
                                text: entry.text
                            })
                        });

                        this.loading = false;
                    })
                    .catch(e => {
                        console.error(e);
                    });
            }
        }
    }
</script>
