<template>
<div class="card">
    <div class="card-body">
        <div class="d-flex">
            <h3 class="card-title">User Locations</h3>
            <div class="ms-auto">
                <div class="dropdown">
                    <a class="dropdown-toggle text-muted" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Last 7 days</a>
                    <div class="dropdown-menu dropdown-menu-end">
                        <a class="dropdown-item active" href="#">Last 7 days</a>
                        <a class="dropdown-item" href="#">Last 30 days</a>
                        <a class="dropdown-item" href="#">Last 3 months</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div id="map"></div>
        </div>
    </div>
</div>
</template>

<script>
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';

export default {
    name: 'LocationCard',
    data: function() {
        return {
            map: false,
            scale: 7,
        }
    },
    mounted: function() {
        this.fetch();
        this.$nextTick(() => { this.mountMap(); });
    },
    methods: {
        mountMap: function() {
            mapboxgl.accessToken = 'pk.eyJ1IjoiaW5nYWxscyIsImEiOiJsUDF2STRrIn0.S0c3ZNH4HmseIdPXY-CTlA';
            this.map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [-74.5, 40],
                zoom: 9,
                projection: 'globe'
            });
        },
        fetch: async function() {
            //const list = await window.std('/api/location');
        }
    }
}
</script>
