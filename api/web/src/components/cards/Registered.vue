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
                        }
                    }
                }'
                :series='[{
                  name: "users",
                  data: [30, 40, 35, 50, 49, 60, 70, 91]
                }]'
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
            scale: 7
        }
    },
    components: {
        ApexChart: VueApexCharts
    }
}
</script>
