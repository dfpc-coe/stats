<template>
<div class='page'>
    <header class='navbar navbar-expand-md navbar-dark d-print-none'>
        <div class="container-xl">
            <div class="col">
                <div class="page-pretitle">TAK Public Safety</div>
                <h2 class="page-title">Statistics</h2>
            </div>
        </div>
    </header>

    <router-view/>
</div>
</template>

<script>
import '@tabler/core/dist/js/tabler.min.js';
import '@tabler/core/dist/css/tabler.min.css';

export default {
    name: 'Tak-PS-Stats',
    data: function() {
        return {
            err: false,
        }
    }
}
</script>
