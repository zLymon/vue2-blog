<template>
    <div class="index">
        <canvas id="my-canvas"></canvas>
		<div class="card">
			<ul class="option">
				<li @click="change('login')" :class="{active:isActive==='login'}">登录</li>
				<li @click="change('register')" :class="{active:isActive==='register'}">注册</li>
			</ul>
			<transition name="fade">
				<div class="login"  v-if="isActive==='login'">
					<div class="username">
                		<label for="username">用户名</label>
                		<input type="text" name="username" id="username" ref="username">
            		</div>
            		<div class="pwd">
                		<label for="pwd">密码</label>
                		<input type="password" name="pwd" id="pwd" ref="pwd">
            		</div>
					<button @click="login">登录</button>
				</div>
			</transition>
			<transition name="fade">
				<div class="register"  v-if="isActive==='register'">
					<div class="username">
                		<label for="username">用户名</label>
                		<input type="text" name="username" id="username" ref="username">
            		</div>
            		<div class="pwd">
                		<label for="pwd">密码</label>
                		<input type="password" name="pwd" id="pwd" ref="pwd">
            		</div>
					<div class="key">
						<label for="key">密钥</label>
						<input type="password" name="key" id="key" ref="key">
					</div>
					<button @click="register">注册</button>
				</div>
			</transition>
		</div>
    </div>
</template>
<script>
import axios from 'axios'
import crypto from 'crypto'
import {mapMutations} from 'vuex'
export default {
    name: 'register',
    data() {
		return {
			isActive: 'login'
		}
	},
    created() {
        this.$nextTick(() => {
            //定义画布宽高和生成点的个数
            var WIDTH = window.innerWidth, HEIGHT = window.innerHeight, POINT = 30;
            var canvas = document.getElementById('my-canvas');
            // 防止出现滚动条
	        canvas.width = WIDTH -10,
	        canvas.height = HEIGHT - 10;
	        var context = canvas.getContext('2d');
	        context.strokeStyle = 'rgba(145, 200, 255, 0.2)',
	        context.strokeWidth = 1,
	        context.fillStyle = 'rgba(145, 200, 255, 0.5)';
	        var circleArr = [];

	        //线条：开始xy坐标，结束xy坐标，线条透明度
	        function Line (x, y, _x, _y, o) {
	        	this.beginX = x,
	        	this.beginY = y,
	        	this.closeX = _x,
	        	this.closeY = _y,
	        	this.o = o;
	        }
	        //点：圆心xy坐标，半径，每帧移动xy的距离
	        function Circle (x, y, r, moveX, moveY) {
	        	this.x = x,
	        	this.y = y,
	        	this.r = r,
	        	this.moveX = moveX,
	        	this.moveY = moveY;
	        }
	        //生成max和min之间的随机数
	        function num (max, _min) {
	        	var min = arguments[1] || 0;
	        	return Math.floor(Math.random()*(max-min+1)+min);
	        }
	        // 绘制原点
	        function drawCricle (cxt, x, y, r, moveX, moveY) {
	        	var circle = new Circle(x, y, r, moveX, moveY)
	        	cxt.beginPath()
	        	cxt.arc(circle.x, circle.y, circle.r, 0, 2*Math.PI)
	        	cxt.closePath()
	        	cxt.fill();
	        	return circle;
	        }
	        //绘制线条
	        function drawLine (cxt, x, y, _x, _y, o) {
	        	var line = new Line(x, y, _x, _y, o)
	        	cxt.beginPath()
	        	cxt.strokeStyle = 'rgba(0,0,0,'+ o +')'
	        	cxt.moveTo(line.beginX, line.beginY)
	        	cxt.lineTo(line.closeX, line.closeY)
	        	cxt.closePath()
	        	cxt.stroke();

	        }
	        //初始化生成原点
	        function init () {
	        	circleArr = [];
	        	for (var i = 0; i < POINT; i++) {
	        		circleArr.push(drawCricle(context, num(WIDTH), num(HEIGHT), num(15, 2), num(10, -10)/40, num(10, -10)/40));
	        	}
	        	draw();
	        }

	        //每帧绘制
	        function draw () {
	        	context.clearRect(0,0,canvas.width, canvas.height);
	        	for (var i = 0; i < POINT; i++) {
	        		drawCricle(context, circleArr[i].x, circleArr[i].y, circleArr[i].r);
	        	}
	        	for (var i = 0; i < POINT; i++) {
	        		for (var j = 0; j < POINT; j++) {
	        			if (i + j < POINT) {
	        				var A = Math.abs(circleArr[i+j].x - circleArr[i].x),
	        					B = Math.abs(circleArr[i+j].y - circleArr[i].y);
	        				var lineLength = Math.sqrt(A*A + B*B);
	        				var C = 1/lineLength*7-0.009;
	        				var lineOpacity = C > 0.03 ? 0.03 : C;
	        				if (lineOpacity > 0) {
	        					drawLine(context, circleArr[i].x, circleArr[i].y, circleArr[i+j].x, circleArr[i+j].y, lineOpacity);
	        				}
	        			}
	        		}
	        	}
	        }

	        //调用执行
	        window.onload = function () {
	        	init();
	        	setInterval(function () {
	        		for (var i = 0; i < POINT; i++) {
	        			var cir = circleArr[i];
	        			cir.x += cir.moveX;
	        			cir.y += cir.moveY;
	        			if (cir.x > WIDTH) cir.x = 0;
	        			else if (cir.x < 0) cir.x = WIDTH;
	        			if (cir.y > HEIGHT) cir.y = 0;
	        			else if (cir.y < 0) cir.y = HEIGHT;

	        		}
	        		draw();
	        	}, 16);
	        }
        })
    },
    methods: {
		...mapMutations([
			'RECORD_USERINFO'
		]),
		change(option) {
			this.isActive = option
		},
		encrypt(pwd) {
			let md5 = crypto.createHash('md5')
			return md5.update(pwd).digest('hex')
		},
		register() {
			let username = this.$refs.username.value
			let pwd = this.$refs.pwd.value
			let key = this.$refs.key.value
			var usernameReg = /^[a-zA-Z0-9]{5,10}$/
			var pwdReg = /^.*(?=.{6,20})(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/
			if(!usernameReg.test(username)) {
				alert('用户名必须为5-10位且无特殊字符,由字母开头')
				return
			}
			if(!pwdReg.test(pwd)) {
				alert('密码长度必须为6-20位，包括至少一个大写字母、一个小写字母和一位数字')
				return
			}
			if(key !== '970805') {
				alert('邀请码错误')
				return
			}
			let safePwd = this.encrypt(pwd)
			this.axios.post('/admin/register', {
				username: username,
				pwd: safePwd
			})
			.then((response) => {
				if(response.data.status === 1) {
					alert(response.data.message)
					this.isActive = 'login'
				}else {
					alert(response.data.message)
					return
				}
			})
			.catch((err) => {
				console.log(err)
			})
		},
		login() {
			let username = this.$refs.username.value
			let pwd = this.$refs.pwd.value
			let safePwd = this.encrypt(pwd)
			this.axios.post('/admin/login', {
				username: username,
				pwd: safePwd
			})
			.then((response) => {
				if(response.data.status === 1) {
					let _id = response.data.data
					this.RECORD_USERINFO({username, _id})
					alert(response.data.message)
					this.$router.push({path: '/manage'})
				} else {
					alert(response.data.message)
				}
			})
		}
    }
}
</script>
<style lang="scss" scoped>
@keyframes fade {
	0%{opacity: 0;}
	100%{opacity: 1;}
}
.index {
	background-color: #fff;
}
.card {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 30%;
	height: 220px;
	box-shadow: 10px 10px 20px grey;
	background-color: #fff;
	.option {
		text-align: left;
		font-size: 0;
		.active {
			border-bottom: 0;
		}
		li {
			display: inline-block;
			border-right: .5px solid black;
			border-bottom: .5px solid black;
			font-size: 16px;
			padding: 10px;
			cursor: pointer;
		}
	}
	.register, .login {
		position: absolute;
		left: 0;
		right: 0;
		margin: 20px auto;
		>div {
			margin: 10px 0;
		}
		input {
			border-bottom: .5px solid black;
		}
		button {
			width: 50px;
			height: 30px;
			background-color: rgba(145, 200, 255, 1);
			box-shadow: 2px 2px 5px grey;
			cursor: pointer;
		}
	}
	.fade-enter-active {
        animation: fade .5s
    }
    .fade-leave-active {
        animation: fade .5s reverse
    }
}
</style>

