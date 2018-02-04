<template>
    <div class="login">
        <div :class="wrapper">
            <div class="container">
                <h1>拍拍二手降级管理平台</h1>
                <form class="form" v-if="isShow" :model="loginForm" ref="loginForm">
                    <input v-model="loginForm.username" type="text" placeholder="用户名">
                    <input v-model="loginForm.password" type="password" placeholder="密码">
                    <button id="login-button" @click="onLogin">登录</button>
                </form>
            </div>
            <ul class="bg-bubbles">
                <li v-for="(bubble, index) in bubbles" :key="'bubble' + index"></li>
            </ul>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import { Notification } from 'element-ui'

export default {
    name: 'login',
    data() {
        return {
            wrapper: 'wrapper',
            isShow: true,
            loginForm: {
                username: 'admin',
                password: 'admin'
            },
            bubbles: new Array(10)
        }
    },
    methods: {
        onLogin: function(event) {
            if (event) event.preventDefault()
            this.isShow = false
            this.wrapper = 'wrapper form-success'
            /*
            * TODO 校验登录信息
            */
            this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
                this.$router.push({ path: '/' })
                this.$notify.success({
                    title: '成功',
                    message: '用户【' + this.loginForm.username + '】登录成功'
                });
            }).catch(() => {
                this.isShow = true
                this.wrapper = 'wrapper'
                this.$notify.error({
                    title: '错误',
                    message: '用户名或密码错误！！'
                });
            })
        }
    }
}
</script>

<style scoped>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-weight: 300;
}

::-webkit-input-placeholder {
    /* WebKit browsers */
    color: white;
}

:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: white;
}

::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: white;
}

:-ms-input-placeholder {
    /* Internet Explorer 10+ */
    color: white;
}

.wrapper {
    background: #50a3a2;
    background: -webkit-linear-gradient(top left, #50a3a2 0%, #53e3a6 100%);
    background: linear-gradient(to bottom right, #50a3a2 0%, #53e3a6 100%);
    opacity: 0.8;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.wrapper.form-success .container h1 {
    -webkit-transform: translateY(85px);
    -ms-transform: translateY(85px);
    transform: translateY(85px);
}

.container {
    width: 600px;
    height: 600px;
    margin: -250px 0 0 -300px;
    padding: 80px 0;
    text-align: center;
    position: absolute;
    left: 50%;
    top: 50%;
}

.container h1 {
    font-family: 'Source Sans Pro', sans-serif;
    color: white;
    font-size: 60px;
    -webkit-transition-duration: 1s;
    transition-duration: 1s;
    -webkit-transition-timing-function: ease-in-put;
    transition-timing-function: ease-in-put;
    font-weight: 400;
}

form {
    padding: 20px 0;
    position: relative;
    z-index: 2;
}

form input {
    -webkit-appearance: none;
    -moz-appearance: none;
    outline: 0;
    border: 1px solid rgba(255, 255, 255, 0.4);
    background-color: rgba(255, 255, 255, 0.2);
    width: 300px;
    border-radius: 3px;
    padding: 10px 15px;
    margin: 0 auto 10px auto;
    display: block;
    text-align: center;
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 18px;
    color: white;
    -webkit-transition-duration: 0.25s;
    transition-duration: 0.25s;
    font-weight: 300;
}

form input:hover {
    background-color: rgba(255, 255, 255, 0.4);
}

form input:focus {
    background-color: white;
    width: 350px;
    color: black;
}

form button {
    -webkit-appearance: none;
    -moz-appearance: none;
    outline: 0;
    background-color: white;
    border: 0;
    padding: 10px 15px;
    color: #53e3a6;
    border-radius: 3px;
    width: 300px;
    cursor: pointer;
    font-size: 18px;
    -webkit-transition-duration: 0.25s;
    transition-duration: 0.25s;
}

form button:hover {
    background-color: #f5f7f9;
}

.bg-bubbles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
}

.bg-bubbles li {
    position: absolute;
    list-style: none;
    display: block;
    width: 40px;
    height: 40px;
    background-color: rgba(255, 255, 255, 0.15);
    bottom: -160px;
    -webkit-animation: square 25s infinite;
    animation: square 25s infinite;
    -webkit-transition-timing-function: linear;
    transition-timing-function: linear;
}

.bg-bubbles li:nth-child(1) {
    left: 10%;
}

.bg-bubbles li:nth-child(2) {
    left: 20%;
    width: 80px;
    height: 80px;
    -webkit-animation-delay: 2s;
    animation-delay: 2s;
    -webkit-animation-duration: 17s;
    animation-duration: 17s;
}

.bg-bubbles li:nth-child(3) {
    left: 25%;
    -webkit-animation-delay: 4s;
    animation-delay: 4s;
}

.bg-bubbles li:nth-child(4) {
    left: 40%;
    width: 60px;
    height: 60px;
    -webkit-animation-duration: 22s;
    animation-duration: 22s;
    background-color: rgba(255, 255, 255, 0.25);
}

.bg-bubbles li:nth-child(5) {
    left: 70%;
}

.bg-bubbles li:nth-child(6) {
    left: 80%;
    width: 120px;
    height: 120px;
    -webkit-animation-delay: 3s;
    animation-delay: 3s;
    background-color: rgba(255, 255, 255, 0.2);
}

.bg-bubbles li:nth-child(7) {
    left: 32%;
    width: 160px;
    height: 160px;
    -webkit-animation-delay: 7s;
    animation-delay: 7s;
}

.bg-bubbles li:nth-child(8) {
    left: 55%;
    width: 20px;
    height: 20px;
    -webkit-animation-delay: 15s;
    animation-delay: 15s;
    -webkit-animation-duration: 40s;
    animation-duration: 40s;
}

.bg-bubbles li:nth-child(9) {
    left: 25%;
    width: 10px;
    height: 10px;
    -webkit-animation-delay: 2s;
    animation-delay: 2s;
    -webkit-animation-duration: 40s;
    animation-duration: 40s;
    background-color: rgba(255, 255, 255, 0.3);
}

.bg-bubbles li:nth-child(10) {
    left: 90%;
    width: 160px;
    height: 160px;
    -webkit-animation-delay: 11s;
    animation-delay: 11s;
}

@-webkit-keyframes square {
    0% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
    }
    100% {
        -webkit-transform: translateY(-700px) rotate(600deg);
        transform: translateY(-700px) rotate(600deg);
    }
}

@keyframes square {
    0% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
    }
    100% {
        -webkit-transform: translateY(-700px) rotate(600deg);
        transform: translateY(-700px) rotate(600deg);
    }
}
</style>
