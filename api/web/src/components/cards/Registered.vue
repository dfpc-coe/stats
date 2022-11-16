<template>
<div class="card">
    <div class="card-body">
        <div class="d-flex">
            <h3 class="card-title">Registered Users</h3>
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
        ApexChart: VueApexCharts
    }
}
</script>
