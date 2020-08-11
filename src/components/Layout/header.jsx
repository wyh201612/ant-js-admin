import logo from "../../assets/logo.png"
import ScreenFull from "../ScreenFull/index.jsx"
import { SystemTitle } from "@/config"
import "./header.less"
import store from "@/store"

/**
 * @isMobile 判断设备宽度，用于移动端适配
 * @collapsed 控制左侧菜单的展开与收起
 * @bgColor 顶部导航栏的背景颜色，用于动态切换主题色功能
 */

const Header = {
    name: "Header",
    data() {
        return {}
    },
    props: ["isMobile", "collapsed", "bgColor"],
    methods: {
        goIndex() {
            this.$router.push({ path: "/" })
        },
        // 向父组件派发 toggle 事件
        change() {
            this.$emit("toggle")
        },
        logout() {
            store.dispatch("Logout").then((res) => {
                this.$router.push("/login")
            })
        },
    },

    render() {
        // 渲染 Header
        const renderHeader = () => {
            return (
                <a-layout-header
                    class={
                        this.$props.isMobile
                            ? "header-fixed unfold mobile"
                            : "header-fixed unfold"
                    }
                >
                    <div class="left">
                        {!this.$props.isMobile && (
                            <div
                                class={
                                    !this.$props.collapsed
                                        ? "logo"
                                        : "short-logo"
                                }
                                style={{
                                    background: `${this.$props.bgColor} !important`,
                                }}
                                onclick={this.goIndex}
                            >
                                <img src={logo} class="logo-img" />
                                {!this.$props.collapsed && (
                                    <h1>
                                        <span>{SystemTitle}</span>
                                    </h1>
                                )}
                            </div>
                        )}
                        <a-icon
                            class="trigger"
                            type={
                                this.$props.collapsed
                                    ? "menu-unfold"
                                    : "menu-fold"
                            }
                            onClick={this.change}
                        />
                    </div>

                    <div class="right">
                        <ScreenFull />
                        <a-dropdown
                            placement="bottomLeft"
                            class="header-dropdown"
                        >
                            <span class="user">
                                <a-avatar class="avatar">
                                    <a-icon type="user" />
                                </a-avatar>
                                <span class="username">
                                    {/* {GlobalStore.userInfo.name} */}
                                    admin
                                    <a-icon
                                        type="down"
                                        style="margin-left:5px"
                                    />
                                </span>
                            </span>
                            <a-menu slot="overlay">
                                <a-menu-item onclick={this.logout}>
                                    <a-icon type="logout" />
                                    <span>退出登录</span>
                                </a-menu-item>
                                <a-menu-item>
                                    <a-icon type="unlock" />
                                    <span>修改密码</span>
                                </a-menu-item>
                            </a-menu>
                        </a-dropdown>
                    </div>
                </a-layout-header>
            )
        }
        return <div style="position:relative">{renderHeader()}</div>
    },
}

Header.install = function(Vue) {
    Vue.component(Header.name, Header)
}

export default Header
