<template>
    <div id="list">
        <sidebar :number="newNumber" v-if="this.articleList.length"></sidebar>
        <div class="articleList">
            <li class="item" v-for="(item, index) in reverse" :key="index">
                {{ item.createTime }}：<router-link :to="{name: 'Article', params: {id: item.id}}">{{ item.title }}</router-link>
            </li>
        </div>
    </div>
</template>
<script>
import Sidebar from '@/blog/components/Sidebar'
import axios from 'axios'
export default {
    name: 'List',
    components: {
        Sidebar
    },
    data() {
        return {
            articleList: [],
            number: 0
        }
    },
    computed: {
        reverse() {
            return this.articleList.reverse()
        },
        newNumber() {
            this.number = this.articleList.length
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
#list {
    .articleList {
        margin: 0 auto;
        text-align: left;
        padding: 20px;
        .item {
            width: 30%;
            background-color: #fff;
            margin: 20px auto;
            box-shadow: 3px 3px 10px grey;
            a {
                text-decoration: none;
                color: #000;
            }
        }
    }
}
@media screen and (max-width: 800px){
    #list {
    .articleList {
        .item {
            width: 90%;
        }
    }
}
}
</style>
