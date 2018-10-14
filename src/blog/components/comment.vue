<template>
    <div class="comment">
        <input type="text" placeholder="请输入用户名" ref="name" id="name" name="name" onkeyup="this.value=this.value.replace(/^\s+|\s+$/g, '')">
        <input type="text" placeholder="请在这里留言" ref='message' id="message" name="message" onkeyup="this.value=this.value.replace(/^\s+|\s+$/g, '')">
        <button @click="publishComment">发表</button>
        <p>评论({{commentList.length}})</p>
        <div class="comment-list" v-for="(item, index) in reverse" :key="index">
            <h3>{{ item.name }}</h3>
            <p>{{ item.message }}</p>
            <span>{{ item.createTime }}</span>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'comment',
    inject: ['reload'],
    props: [
        'id'
    ],
    data() {
        return {
            commentList: []
        }
    },
    computed: {
        reverse() {
            return this.commentList.reverse()
        }
    },
    methods: {
        publishComment() {
            let name = this.$refs.name.value
            let message = this.$refs.message.value
            let createTime = new Date().toLocaleDateString()
            if(name == '' || message == '') {
                alert('用户名或留言不能为空')
                return
            }
            this.axios.post('/users/publishComment', {
                id: this.id,
                name: name,
                message: message,
                createTime: createTime
            })
            .then((res) => {
                if(res.data.status === 1) {
                    alert(res.data.message)
                    this.reload()
                } else {
                    alert(res.data.message)
                }
            })
            .catch((err) => {
                alert(err)
            })
        },
        formatTime(time) {
            let d = new Date(time)
            let createTime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
            return createTime
        }
    },
    created() {
        this.axios.post('/users/getComment', {
            id: this.id
        })
        .then((res) => {
            for (let i = 0; i < res.data.length; i++) {
                this.commentList.push({
                    name: res.data[i].name,
                    createTime: this.formatTime(res.data[i].createTime), 
                    message: res.data[i].message, 
                    }
                )
            }
        })
    }
}
</script>
<style lang="scss" scoped>
.comment {
    position: relative;
    margin: 0 auto 50px;
    border-top: 1px solid rgba(138, 138, 138, .3);
    padding: 20px;
    width: 50%;
    background-color: #fff;
    text-align: left;
    input {
        padding: 10px;
        width: 97%;
        border: 1px solid rgba(138, 138, 138, .3);
        margin: 10px auto;
    }
    button {
        width: 80px;
        padding: 10px;
        cursor: pointer;
    }
    .comment-list {
        padding: 20px 0;
        text-align: left;
        border-top: 1px solid rgba(138, 138, 138, .3);
        border-bottom: 1px solid rgba(138, 138, 138, .3);
        p {
            margin: 10px 0;
        }
        span {
            text-align: right;
        }
    }
}
@media screen and (max-width: 800px){
    .comment {
        width: 80%
    }
}
</style>
