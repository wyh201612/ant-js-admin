<template>
    <div class="home">
        <BaseLayout :breadcrumb="true">
            <a-button type="primary">123</a-button>
        </BaseLayout>
    </div>
</template>

<script>
// @ is an alias to /src
import BaseLayout from "@/components/Container/index.jsx"
import { umiList } from "@/api/umi-demo"
export default {
    name: "Home",
    components: {
        BaseLayout,
    },
    mounted() {
        umiList({ pageSize: 20, pageNum: 1 }).then((res) => {
            console.log(res)
        })
    },
}
</script>
