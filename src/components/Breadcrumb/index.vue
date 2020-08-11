<template>
    <a-breadcrumb
        v-if="routes.length > 0"
        style="background:#fff;padding:20px 25px;border-bottom:1px solid #F0F0F0;"
    >
        <a-breadcrumb-item key="/">
            <router-link to="/">首页</router-link>
        </a-breadcrumb-item>
        <a-breadcrumb-item :key="i" v-for="(r, i) in routes">
            <span v-if="r.meta.title === $parent.$route.meta.title">{{
                r.meta.title
            }}</span>
            <router-link v-else :to="r.path">{{ r.meta.title }}</router-link>
        </a-breadcrumb-item>
    </a-breadcrumb>
</template>

<script>
export default {
    data() {
        return {
            routes: [],
        }
    },
    mounted() {
        // 如果有父级，就用父级的路由组
        this.routes = this.$parent ? this.$parent.$route.matched : []
    },
}
</script>

<style lang="less" scoped></style>
