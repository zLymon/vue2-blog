<template>
    <div id="index">
        <sidebar></sidebar>
        <session v-for="(item, index) in reverse" :key="index" 
        :title="item.title"
        :createTime="item.createTime"
        :content="item.content"
        :id="item.id"></session>
        <!-- <div class="session" v-for="(item, index) in reverse" :key="index">
            <h2>{{ item.title }}</h2>
            <span>{{ item.createTime }}</span>
            <p>{{ item.content }}</p>
            <router-link :to="{name: 'Article', params: {id: item.id}}">阅读全文</router-link>
        </div> -->
    </div>
</template>
<script>
import axios from 'axios'
import Header from '@/blog/components/Header'
import Sidebar from '@/blog/components/Sidebar'
import session from '@/blog/components/Session'
import { setStore } from '../../config/localStorage'

export default {
    name: 'Index',
    components: {
        Header,
        Sidebar,
        session
    },
    data() {
        return {
            articles: [],
            number: 0
        }
    },
    computed: {
        reverse() {
            return this.articles.reverse()
        },
        newNumber() {
            this.number = this.articles.length
            return this.number
        }
    },
    methods: {
        formatTime(time) {
            let d = new Date(time)
            let createTime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
            return createTime
        }
    },
    beforeCreate() {
        this.axios.get('/users/getSummary')
        .then((response) => {
            for (let i = 0; i < response.data.length; i++) {
                this.articles.push({
                    id: response.data[i]._id,
                    title:response.data[i].title, 
                    content:response.data[i].content, 
                    createTime: this.formatTime(response.data[i].createTime)}
                )
            }
            setStore('articleNum', this.articles.length)
        })
        .catch((err) => {
            console.log(err)
        })
    }
}
</script>
<style lang="scss" scoped>
#index {
    height: 100%;
    .session {
        margin: 20px auto;
        padding: 20px;
        width: 50%;
        background-color: #fff;
        text-align: left;
        h2,span,p,a {
            margin-bottom: 10px;
        }
        span {
            color: rgba(138, 138, 138, .7);
        }
        a {
            color:rgb(145, 200, 255);
        }
    }
}
</style>