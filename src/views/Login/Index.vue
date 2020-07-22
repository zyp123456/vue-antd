<template>
    <div class="loginBG">
        <div class="login">
            <div class="loginTitle">系统登录</div>
            <a-form
                id="login"
                :form="form"
                class="loginForm"
                @submit="handleSubmit"
            >
                <a-form-item>
                    <a-input
                        v-decorator="[
                            'userName',
                            { rules: [{ required: true, message: 'Please input your username!' }] },
                        ]"
                        placeholder="Username"
                        size="large"
                    >
                        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
                    </a-input>
                </a-form-item>
                <a-form-item>
                    <a-input-password
                        v-decorator="[
                            'password',
                            { rules: [{ required: true, message: 'Please input your Password!' }] },
                        ]"
                        placeholder="Password"
                        size="large"
                        autocomplete="off"
                    >
                        <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
                    </a-input-password>
                </a-form-item>
                <!-- <a-form-item>
                    <a-input size="large" addon-before="验证码" addon-after="请输入验证码" default-value="请输入验证码" />
                </a-form-item> -->
                <a-form-item>
                    <a-button type="primary" size="large" html-type="submit" class="loginButton" :loading="loading">登录</a-button>
                </a-form-item>
            </a-form> 
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                loading: false,
            };
        },
        beforeCreate() {
            // 指定form指向
            this.form = this.$form.createForm(this, { name: 'login' });
        },
        methods: {
            handleSubmit(e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (!err) {
                        console.log('Received values of form: ', values);
                        this.$store.dispatch("user/login", values);
                    }
                });
            },
        },
    };
</script>

<style lang="less">
    .loginBG {
        width: 100%;
        height: 100vh;
        background: #2d3a4b;
        position: relative;

        .login {
            max-width: 400px;
            height: 320px;
            margin: 0 auto;
            position: absolute;
            left: 0;
            right: 0;
            top: 50%;
            margin-top: -220px;

            .loginTitle {
                width: 100%;
                color: #fff;
                font-size: 24px;
                text-align: center;
                padding: 40px 0;
            }

            .loginForm {
                max-width: 400px;
            }

            .loginButton {
                width: 100%;
            }
        }

    }
</style>