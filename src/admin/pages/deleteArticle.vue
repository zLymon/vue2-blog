<template>
    <div class="list">
        <div class="articleList" v-for="(item, index) in reverse" :key="index">
            <li class="item">
                <button @click="deleteArticle(item.id)">删除</button>
                {{ item.createTime }}————
                <router-link :to="{name: 'Article', params: {id: item.id}}">{{ item.title }}</router-link>
            </li>
        </div>    
    </div>    
</template>
<script>
import axios from 'axios'

export default {
    data() {
        return {
            articleList: []
        }
    },
    inject: ['reload'],
    computed: {
        reverse() {
            return this.articleList.reverse()
        }
    },
    methods: {
        formatTime(time) {
            let d = new Date(time)
            let createTime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
            return createTime
        },
        deleteArticle(id) {
            this.axios.post('/admin/deleteArticle',{
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
        this.axios.get('/users/getSummary')
        .then((response) => {
            for (let i = 0; i < response.data.length; i++) {
                this.articleList.push({
                    id: response.data[i]._id,
                    title:response.data[i].title,
                    createTime: this.formatTime(response.data[i].createTime)
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
.list {
    .articleList {
        margin: 0 auto;
        text-align: left;
        padding: 20px;
        .item {
            background-color: #fff;
            width: 30%;
            margin: 0 auto;
            box-shadow: 3px 3px 10px grey;
            list-style: none;
            a {
                text-decoration: none;
                color: #000;
            }
            button {
                padding: 5px;
                margin: 5px;
                background-color: rgb(145, 200, 255);
                color: #fff;
                cursor: pointer
            }
        }
    }
}
</style>
