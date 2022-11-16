<template>
<div class="card">
    <div class="card-body">
        <div class="d-flex">
            <h3 class="card-title">Top User Groups</h3>
            <div class="ms-auto">
                <div class="dropdown">
                    <a class="dropdown-toggle text-muted" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Field</a>
                    <div class="dropdown-menu dropdown-menu-end">
                        <a class="dropdown-item active" href="#">Field</a>
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
                    <tr :key='a.name' v-for='a in agg'>
                        <td v-text='a.name'></td>
                        <td v-text='a.count'></td>
                        <td class="w-50">
                            <div class="progress progress-xs">
                                <div
                                    class="progress-bar bg-primary"
                                    :style='`width: ${a.percent * 100}%;`'
                                ></div>
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
            agg: {}
        }
    },
    mounted: function() {
        this.fetch();
    },
    methods: {
        fetch: async function() {
            const agg = await window.std('/api/aggregate/o');

            let aggs = [];
            let total = 0;
            for (const name in agg) {
                total += agg[name];
                aggs.push({
                    name,
                    count: agg[name]
                });
            }

            this.agg = aggs.map((agg) => {
                agg.percent = agg.count / total;
                return agg;
            }).sort((a, b) => {
                return b.percent - a.percent;
            }).splice(0, 6);
        }
    }
}
</script>
