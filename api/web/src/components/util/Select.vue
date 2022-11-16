<template>
<div class="dropdown">
    <a class="dropdown-toggle text-muted" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-text='current'></a>
    <div class="dropdown-menu dropdown-menu-end">
        <a :key='value' v-for='value in values' class="dropdown-item active" href="#" v-text='value'></a>
    </div>
</div>
</template>

<script>
export default {
    name: 'TablerSelect',
    props: {
        default: String,
        values: Array
    },
    data: function() {
        return {
            current: ''
        }
    },
    mounted: function() {
        if (!this.default) this.current = this.values[0];
    },
    methods: {
    },
}
</script>
