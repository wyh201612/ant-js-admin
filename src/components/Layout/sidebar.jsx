import cloneDeep from "lodash.clonedeep"
const Siderbar = {
    name: "Siderbar",
    data() {
        return {
            openkeys: [],
            menuList: [],
        }
    },
    props: ["bgColor", "collapsed"],
    computed: {
        currnetRoute() {
            return [this.$route.matched[0].path]
        },
        /**
         * 过滤路由列表
         */
        routerMaps() {
            const routerMaps = cloneDeep(this.$store.getters.roles) || []
            const loop = (arr) => {
                return (
                    arr &&
                    arr.map((r) => {
                        if (r.children && r.children.length > 0) {
                            // 当子路由同父路由的path相同时,隐藏子路由菜单
                            r.children[0].path === r.path
                                ? (r.children = undefined)
                                : loop(r.children)
                        }
                    })
                )
            }
            loop(routerMaps)
            return routerMaps
        },
    },
    watch: {
        collapsed(v) {
            this.openkeys = v ? [] : this.currnetRoute
        },
    },
    created() {
        this.openkeys = this.currnetRoute
    },

    render() {
        const titleClick = ({ key }) => {
            this.openkeys = this.openkeys[0] !== key ? [key] : []
        }
        const menuClick = ({ keyPath, key }) => {
            // this.$route.path === key && this.reloadView()
            this.openkeys = this.$props.collapsed
                ? []
                : keyPath
                ? [keyPath[keyPath.length - 1]]
                : []
            this.$router.push(key)
        }
        const subItem = (r) => {
            return (
                <a-sub-menu
                    key={r.path}
                    onTitleClick={titleClick}
                    title={[
                        <a-icon type={r.meta.icon} />,
                        <span class="padding-left">{r.meta.title}</span>,
                    ]}
                >
                    {r.children.map((i) => menuItem(i))}
                </a-sub-menu>
            )
        }
        const menuItem = (r) => {
            return r.children ? (
                <a-menu-item key={r.children[0].path}>
                    {r.meta.icon && <a-icon type={r.meta.icon} />}
                    <span class="padding-left">{r.children[0].meta.title}</span>
                </a-menu-item>
            ) : (
                <a-menu-item key={r.path}>
                    {r.meta.icon && <a-icon type={r.meta.icon} />}
                    <span class="padding-left">{r.meta.title}</span>
                </a-menu-item>
            )
        }
        return (
            <a-layout-sider
                collapsible
                trigger={null}
                v-model={this.$props.collapsed}
                width={256}
                style={{
                    background: `${this.$props.bgColor} !important`,
                }}
            >
                <a-menu
                    onClick={menuClick}
                    selectedKeys={[this.$route.path]}
                    openKeys={this.openkeys}
                    mode="inline"
                    theme="dark"
                >
                    {this.routerMaps.map((r) =>
                        r.children && r.children.length > 1
                            ? subItem(r)
                            : menuItem(r)
                    )}
                </a-menu>
            </a-layout-sider>
        )
    },
}

// 注册组件
Siderbar.install = function(Vue) {
    Vue.component(Siderbar.name, Siderbar)
}

export default Siderbar
