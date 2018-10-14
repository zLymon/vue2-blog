<template>
    <div id="list">
        <sidebar :number="newNumber" v-if="this.articleList.length"></sidebar>
        <div class="articleList">
            <li class="item" v-for="(item, index) in reverse" :key="index">
                {{ item.createTime }}：<router-link :to="{name: 'Article', params: {id: item.id}}">{{ item.title }}</router-link>
            </li>
        </div>
        <div class="filter">
            <p>文章标签</p>
            <li class="item" v-for="(item, index) in newTagList" :key="index" @click="getListByTag(item)">
                - {{ item }}
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
            number: 0,
            tagList: [],
            newTagList: []
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
        },
        // 数组去重
        unique(oldArr, newArr) {
            for (let i = 0; i < oldArr.length; i++) {
                if(newArr.indexOf(oldArr[i]) < 0) {
                    newArr.push(oldArr[i])
                }
            }
            return newArr
        },
        getListByTag(tag) {
            this.axios.get('/users/getSummaryByTag', {
                params: {
                    tag: tag
                }
            })
            .then((res) => {
                this.articleList = []
                for (let i = 0; i < res.data.length; i++) {
                    this.articleList.push({
                        id: res.data[i]._id,
                        title:res.data[i].title,
                        createTime: this.formatTime(res.data[i].createTime),
                        tag: res.data[i].tag
                    })
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
                    createTime: this.formatTime(response.data[i].createTime),
                    tag: response.data[i].tag
                })
                this.tagList[i] = this.articleList[i].tag
            }
            this.newTagList = this.unique(this.tagList, this.newTagList)
            //清空原有数组
            this.tagList = []
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
    .filter {
        position: fixed;
        width: 200px;
        text-align: left;
        background-color: #fff;
        right: 50px;
        top: 120px;
        box-shadow: 3px 3px 10px grey;
        li {
            margin: 10px 0;
            list-style: none;
            cursor: pointer;
            :hover {
                background-color: blue;
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
