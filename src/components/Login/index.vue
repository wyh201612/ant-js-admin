<template>
    <div class="container">
        <div class="content">
            <div class="top">
                <div class="header">
                    <div class="title">{{ SystemTitle }}</div>
                    <div class="desc">
                        YJCloud Health Template System
                    </div>
                </div>
            </div>
            <div :class="mobileType != 'mobile' && 'login'">
                <a-form-model ref="ruleForm" class="login-form" :model="ruleForm" :rules="rules">
                    <a-form-model-item has-feedback prop="username">
                        <a-input v-model="ruleForm.username" v-focus placeholder="请输入用户名">
                            <a-icon slot="prefix" type="user" />
                        </a-input>
                    </a-form-model-item>
                    <a-form-model-item has-feedback prop="password">
                        <a-input v-model="ruleForm.password" type="password" autocomplete="off">
                            <a-icon slot="prefix" type="lock" />
                        </a-input>
                    </a-form-model-item>
                    <a-form-model-item prop="code">
                        <a-row :gutter="8" style="margin: 0 -4px">
                            <a-col :span="16">
                                <a-input placeholder="请输入验证码" v-model="ruleForm.code" autocomplete="off">
                                    <a-icon slot="prefix" type="alert" />
                                </a-input>
                            </a-col>
                            <a-col :span="8" style="padding-left: 4px">
                                <a-tooltip title="看不清？点击刷新验证码。">
                                    <img :src="code" @click="getCode" style="width: 100%;cursor:pointer;height:32px;" />
                                </a-tooltip>
                            </a-col>
                        </a-row>
                    </a-form-model-item>

                    <div style="margin-bottom:16px">
                        <a-checkbox @change="toggleAuto">
                            自动登录
                        </a-checkbox>
                        <a style="float: right">忘记密码</a>
                    </div>
                    <a-form-model-item>
                        <a-button :loading="loading" style="width:100%" type="primary" @click="login">
                            登录
                        </a-button>
                    </a-form-model-item>
                </a-form-model>
            </div>
        </div>
    </div>
</template>

<script>
import { SystemTitle } from "@/config";
import { mapGetters } from "vuex";
import store from "@/store";
export default {
    data() {
        return {
            SystemTitle,
            ruleForm: {},
            rules: {
                username: { required: true, message: "不能为空！" },
                password: { required: true, message: "不能为空！" },
                code: { required: true, message: "不能为空！" },
            },
            loading: false,
            code: "",
        };
    },
    methods: {
        toggleAuto() {},
        login() {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    sessionStorage.setItem("Token", "admin");
                    store.dispatch("GetInfo").then((roles) => {
                        this.$router.push("/dashboard");
                    });
                }
            });
        },
        getCode() {},
    },
    computed: {
        ...mapGetters(["mobileType"]),
    },
};
</script>

<style lang="less" scoped>
.container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: auto;
    background-color: #f7f7f7;
    background-image: url("https://ethanwp.oss-cn-shenzhen.aliyuncs.com/download/body.8aa7c4a6.svg");
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: 100%;

    .login-form {
        padding: 30px;
    }

    .content {
        padding: 32px 0;
        flex: 1;

        @media (min-width: 768px) {
            padding: 112px 0 24px;
        }

        .top {
            text-align: center;

            .header {
                padding: 38px 0;

                a {
                    text-decoration: none;
                }

                .logo {
                    height: 44px;
                    vertical-align: top;
                    margin-right: 16px;
                }

                .title {
                    font-size: 33px;
                    color: rgba(0, 0, 0, 0.85);
                    font-family: "Myriad Pro", "Helvetica Neue", Arial,
                        Helvetica, sans-serif;
                    position: relative;
                    top: 2px;
                }
            }

            .desc {
                font-size: 14px;
                color: rgba(0, 0, 0, 0.45);
                margin-top: 12px;
            }
        }

        .login {
            width: 384px;
            margin: 0 auto;

            .login-form {
                padding: 0;
            }

            .icon {
                font-size: 24px;
                color: rgba(0, 0, 0, 0.2);
                margin-left: 16px;
                vertical-align: middle;
                cursor: pointer;
                transition: color 0.3s;

                &:hover {
                    color: #1890ff;
                }
            }
        }
    }
}
</style>
