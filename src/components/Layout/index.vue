<template>
    <a-layout class="full_layout">
        <!-- 顶部组件 -->
        <Header
            :bgColor="color"
            :collapsed="collapsed"
            @toggle="toggleCollapsed"
            :showTrigger="true"
            :isMobile="mobileType == 'mobile'"
        />
        <!-- 主体 -->
        <a-layout class="full_layout">
            <!-- 移动端适配 -->
            <a-drawer
                v-if="mobileType == 'mobile'"
                placement="left"
                wrapClassName="drawer-sider dark"
                :closable="false"
                :visible="drawerCollapsed"
                @close="drawerClose"
                destroyOnClose
            >
                <div
                    class="logo"
                    :style="{
                        background: `${color} !important`,
                    }"
                >
                    <img :src="logo" class="logo-img" />
                    <h1>
                        <span>{{ SystemTitle }}</span>
                    </h1>
                </div>
                <Siderbar :collapsed="false" :bgColor="color" />
            </a-drawer>
            <Siderbar
                v-show="mobileType == 'desktop'"
                :collapsed="collapsed"
                :bgColor="color"
            />
            <a-layout>
                <a-layout-content>
                    <keep-alive v-if="$route.meta.keepalive">
                        <router-view />
                    </keep-alive>
                    <router-view v-else />
                </a-layout-content>
                <!-- 底部文案 -->
                <a-layout-footer class="footer">
                    Copyright <a-icon type="copyright" />
                    {{ new Date().getFullYear() }} 云嘉出品
                </a-layout-footer>
            </a-layout>
        </a-layout>
        <div class="mask" v-if="showTheme" @click="showThemeHandle" />
        <div class="theme__main" v-if="showTheme">
            <div class="theme__title">主题色</div>
            <div class="item__main">
                <div
                    v-for="(item, index) in colorList"
                    class="theme__item"
                    @click="chooseColor(item.color, index)"
                >
                    <span class="card" :style="{ background: item.color }" />
                    <span class="desc">{{ item.key }}</span>
                    <a-icon
                        type="check"
                        :style="
                            index == curIndex
                                ? {
                                      display: 'block',
                                  }
                                : { display: 'none' }
                        "
                        class="icon__check"
                    />
                </div>
            </div>
            <div class="theme__title" style="margin-top:10px">
                侧边栏背景色
            </div>
            <colorPicker
                class="diy__block"
                v-model="diyColor"
                :defaultColor="defaultSidebar"
                @change="changeDiyColor"
            />
        </div>
    </a-layout>
</template>

<script>
import { mapGetters } from "vuex"
import Siderbar from "./sidebar.jsx"
import Header from "./header.jsx"
import { SystemTitle, defaultSidebar, defaultTheme } from "@/config"
import { logo } from "../../assets/constant"
import { updateTheme, updateColorWeak, colorList } from "./settingConfig"
export default {
    components: {
        Siderbar,
        Header,
    },
    data() {
        return {
            showTheme: false,
            color: "#364152",
            collapsed: false,
            drawerCollapsed: false,
            logo,
            SystemTitle,
            curIndex: 0,
            color: defaultSidebar,
            diyColor: defaultSidebar,
            defaultSidebar,
            colorList,
        }
    },
    mounted() {
        const color = localStorage.getItem("THEME_COLOR") || defaultTheme
        this.diyColor = localStorage.getItem("SIDE_COLOR") || defaultSidebar
        /**
         * 颜色列表默认选中当前主题色
         */
        this.colorList.map((res, index) => {
            if (res.color == color) {
                this.curIndex = index
            }
        })
        updateTheme(color)
        /**
         * 将主题方法挂载到windows对象上
         * 调用时，在console界面执行 showThemeHandle() 即可
         */
        window["showThemeHandle"] = () => {
            this.showThemeHandle()
        }
    },
    methods: {
        /**
         * 展开收起侧栏
         */
        toggleCollapsed() {
            if (this.mobileType == "mobile") {
                this.drawerCollapsed = !this.drawerCollapsed
            } else {
                this.collapsed = !this.collapsed
            }
        },
        /**
         * 颜色拾取器change事件
         */
        changeDiyColor(e) {
            this.color = e
            localStorage.setItem("SIDE_COLOR", e)
        },
        drawerClose() {
            this.drawerCollapsed = false
        },
        /**
         * 选择主题色
         */
        chooseColor(color, index) {
            this.curIndex = index
            localStorage.setItem("THEME_COLOR", color)
            updateTheme(color)
        },
        showThemeHandle() {
            this.showTheme = !this.showTheme
        },
    },
    computed: {
        ...mapGetters(["mobileType"]),
    },
}
</script>

<style lang="less">
.full_layout {
    height: 100%;
}

.footer {
    padding: 20px 0;
    text-align: center;
}

.padding-left {
    padding-left: 17px;
}

.ant-layout-content {
    overflow: auto;
}

.ant-menu-inline .ant-menu-item {
    margin: 0;
    line-height: 46px;
    height: 46px;
}

.ant-layout-sider {
    background: @sidebar !important;
}

.ant-menu-dark {
    background: @sidebar !important;
}

// header
.logo,
.short-logo {
    position: relative;
    height: 64px;
    padding-left: 12px;
    overflow: hidden;
    background: @logo-bg;
    line-height: 64px;
    transition: all 0.2s;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    box-sizing: border-box;
    width: 256px;

    .logo-img {
        display: inline-block;
        height: 24px;
        vertical-align: middle;
    }

    h1 {
        color: #fff;
        display: inline-block;
        margin: 0;
        margin-left: 12px;
        font-size: 16px;
        font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;

        span {
            font-weight: 400;
            font-size: 16px;
        }
    }
}

.short-logo {
    width: 80px;
    overflow: hidden;
}

.mask {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 998;
}

.theme__main {
    width: 200px;
    height: 230px;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-top: -100px;
    margin-left: -100px;
    background: #fff;
    z-index: 999;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
    border-radius: 5px;
    padding: 10px;
    box-sizing: border-box;

    .theme__title {
        width: 100%;
        height: 30px;
        line-height: 30px;
        font-weight: 500;
        color: #333;
        text-align: center;
    }

    .item__main {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
    }

    .theme__item {
        width: 40px;
        display: flex;
        float: left;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin-top: 10px;
        position: relative;

        .card {
            width: 20px;
            height: 20px;
            border-radius: 2px;
            float: left;
            cursor: pointer;
            padding-left: 0px;
            padding-right: 0px;
            text-align: center;
            color: #fff;
            font-weight: 700;
        }

        .desc {
            font-size: 12px;
            color: #666;
            margin-top: 5px;
        }

        .icon__check {
            position: absolute;
            left: 50%;
            top: 3px;
            margin-left: -7px;
            color: #fff;
        }
    }
}
</style>
