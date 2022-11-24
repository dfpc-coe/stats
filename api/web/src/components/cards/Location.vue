<template>
<div class="card">
    <div class="card-body">
        <div class="d-flex">
            <h3 class="card-title">User Locations</h3>
        </div>
        <div class="row">
            <div id="map" style='height: 350px;'></div>
        </div>
    </div>

     <Err v-if='err' :err='err' @close='err = null'/>
</div>
</template>

<script>
import Err from '../Err.vue';
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';

export default {
    name: 'LocationCard',
    data: function() {
        return {
            err: false,
            tilejson: {},
            map: false,
            scale: 7,
        }
    },
    mounted: async function() {
        await this.fetchJson();
        this.$nextTick(() => { this.mountMap(); });
    },
    methods: {
        mountMap: function() {
            mapboxgl.accessToken = 'pk.eyJ1IjoiaW5nYWxscyIsImEiOiJsUDF2STRrIn0.S0c3ZNH4HmseIdPXY-CTlA';
            this.map = new mapboxgl.Map({
                container: 'map',
                center: [ -105.477959, 39.116007 ],
                zoom: 9,
                projection: 'globe'
            });

            this.map.on('load', () => {
                this.map.addSource('zipcodes', {
                    type: 'vector',
                    tiles: this.tilejson.tiles,
                    minzoom: this.tilejson.minzoom,
                    maxzoom: this.tilejson.maxzoom
                });

                this.map.addLayer({
                    'id': 'zipcodes',
                    'type': 'line',
                    'source': 'zipcodes',
                    'source-layer': 'tl_2022_us_zcta520',
                    'layout': {
                        'line-cap': 'round',
                        'line-join': 'round'
                    },
                    'paint': {
                        'line-opacity': 0.6,
                        'line-color': 'rgb(53, 175, 109)',
                        'line-width': 2
                    }
                });
            });
        },
        fetchJson: async function() {
            try {
                this.tilejson = await window.std('/api/zipcodes');
                this.tilejson.tiles.push(String(window.stdurl('/api/zipcodes')) + '/{z}/{x}/{y}');
            } catch (err) {
                this.err = err;
            }
        },
    },
    components: {
        Err
    }
}
</script>
