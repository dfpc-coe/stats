<template>
<div class="card">
    <div class="card-body">
        <div class="d-flex">
            <h3 class="card-title">Top User Groups</h3>
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
            <table class="table card-table table-vcenter">
                <thead>
                    <tr>
                        <th>User Group</th>
                        <th colspan="2">Users</th>
                    </tr>
                </thead>
                <tbody>
                    <tr :key='s.name' v-for='s in series'>
                        <td v-text='s.name'></td>
                        <td v-text='s.count'></td>
                        <td class="w-50">
                            <div class="progress progress-xs">
                                <div class="progress-bar bg-primary" style="width: 71.0%"></div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'TopStats',
    data: function() {
        return {
            scale: 7,
            series: []
        }
    },
    mounted: function() {
        this.fetch();
    },
    methods: {
        fetch: async function() {
            const list = await window.std('/api/aggregate/');

            this.series[0].data = list.totals.map((total) => {
                return { x: new Date(total.dt), y: total.count };
            });
        }
    }
}
</script>
