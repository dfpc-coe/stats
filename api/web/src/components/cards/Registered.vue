<template>
<div class="card">
    <div class="card-body">
        <div class="d-flex">
            <h3 class="card-title">Registered Users</h3>
            <div class="ms-auto">
                <TablerSelect
                    :values='["Last 30 Days", "Month To Date", "Current Quarter", "Year To Date", "All Time"]'
                />
            </div>
        </div>
        <div class="row">
            <ApexChart
                type='line'
                height='350'
                :options='{
                    chart: {
                        id: "total-users",
                        zoom: {
                            enabled: false
                        },
                    },
                    xaxis: {
                        type: "datetime"
                    }
                }'
                :series='series'
            />
        </div>
    </div>
</div>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts'
import TablerSelect from '../util/Select.vue';

export default {
    name: 'RegisteredCard',
    data: function() {
        return {
            scale: 7,
            series: [{
                name: 'users',
                data: []
            }]
        }
    },
    mounted: function() {
        this.fetch();
    },
    methods: {
        fetch: async function() {
            const list = await window.std('/api/total');

            this.series[0].data = list.totals.map((total) => {
                return { x: new Date(total.dt), y: total.count };
            });
        }
    },
    components: {
        TablerSelect,
        ApexChart: VueApexCharts
    }
}
</script>
