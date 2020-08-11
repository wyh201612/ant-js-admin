import Breadcrumb from "../Breadcrumb"

const BaseLayout = {
    name: "BaseLayout",
    props: ["breadcrumb"],
    render() {
        return (
            <div>
                {this.$props.breadcrumb && <Breadcrumb />}
                <div style="background:#fff;padding:20px;overflow:auto">
                    {/* 不具名插槽，父组件可以在闭合标签内写标签 */}
                    {this.$slots.default}
                </div>
            </div>
        )
    },
}

BaseLayout.install = function(Vue) {
    Vue.component(BaseLayout.name, BaseLayout)
}

export default BaseLayout
