import screenfull from "screenfull"
const ScreenFull = {
    name: "BaseLayout",
    data() {
        return {
            iconStyle: {
                color: "#999",
                "font-size": "20px",
                cursor: "pointer",
            },
            isFull: false,
        }
    },
    methods: {
        handleFull() {
            const SF = screenfull
            const caniuse = SF.isEnabled
            if (!caniuse) {
                this.$message.error(
                    "您的浏览器暂不支持全屏功能，请下载最新版本的google浏览器或其他主流浏览器~"
                )
                return false
            }
            this.isFull = !this.isFull
            SF.toggle()
        },
    },
    props: ["breadcrumb"],
    render() {
        return (
            <a-icon
                style={this.iconStyle}
                onclick={this.handleFull}
                type={this.isFull ? "fullscreen-exit" : "fullscreen"}
            />
        )
    },
}

ScreenFull.install = function(Vue) {
    Vue.component(ScreenFull.name, ScreenFull)
}

export default ScreenFull
