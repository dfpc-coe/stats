<template>
<div class='page'>
    <header class='navbar navbar-expand-md navbar-dark d-print-none'>
        <div class="container-xl">
            <div class="col">
                <div class="page-pretitle">TAK Public Safety</div>
                <h2 class="page-title">Statistics</h2>
            </div>

            <div class='ms-auto'>
                <div class='btn-list'>
                    <a href="/docs/" class="btn btn-dark" target="_blank" rel="noreferrer">
                        <CodeIcon/>
                        Docs
                    </a>
                </div>
            </div>
        </div>
    </header>

    <router-view/>

    <TablerError v-if='err' :err='err' @close='err = null'/>
</div>
</template>

<script>
import '@tabler/core/dist/js/tabler.min.js';
import '@tabler/core/dist/css/tabler.min.css';
import {
    CodeIcon,
} from 'vue-tabler-icons';

export default {
    name: 'Tak-PS-Stats',
    data: function() {
        return {
            err: false,
        }
    },
    errorCaptured: function(err) {
        this.err = err;
    },
    watch: {
        async $route() {
            if (localStorage.token) return await this.getSelf();
            if (this.$route.name !== 'login') this.$router.push("/login");
        }
    },
    mounted: async function() {
        if (localStorage.token) return await this.getLogin();
        if (this.$route.name !== 'login') this.$router.push("/login");
    },
    methods: {
        getLogin: async function() {
            try {
                this.user = await window.std('/api/login');
            } catch (err) {
                delete localStorage.token;
                this.$router.push("/login");
            }
        }
    },
    components: {
        CodeIcon
    }
}
</script>
