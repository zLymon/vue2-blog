<template>
    <div class="comment">
        <ul>
            <li v-for="(item, index) in reverse" :key="index">
                <p>{{ item.createTime }}————{{ item.name }}————{{ item.message }}</p>
                <button @click="deleteComment(item.id)">删除</button>
            </li>
        </ul>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'comment',
    inject: ['reload'],
    data() {
        return {
            comments: []
        }
    },
    computed: {
        reverse() {
            return this.comments.reverse()
        }
    },
    methods: {
        formatTime(time) {
            let d = new Date(time)
            let createTime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
            return createTime
        },
        deleteComment(id) {
            this.axios.post('/admin/deleteComment', {
                id: id
            })
            .then((res) => {
                if(res.data.status === -1) {
                    alert(res.data.message)
                    return
                } else {
                    alert(res.data.message)
                    this.reload()
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }
    },
    created() {
        this.axios.get('/admin/getAllComment')
            .then((res) => {
                for (let i = 0; i < res.data.length; i++) {
                    this.comments.push({
                        id: res.data[i]._id,
                        name: res.data[i].name,
                        message: res.data[i].message,
                        createTime: this.formatTime(res.data[i].createTime)
                    })
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
}
</script>
<style lang="scss" scoped>
.comment {
    p {
        display: inline-block;
        margin: 10px 0;
    }
    button {
        width: 50px;
        height: 30px;
        background-color: rgb(145, 200, 255);
        color: #fff;
        box-shadow: 2px 2px 5px grey;
        cursor: pointer
    }
}
</style>
