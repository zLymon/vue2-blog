<template>
    <div class="sidebar">
        <img src="@/assets/images/Logo.jpg" alt="">
        <div v-for="(item, index) in type" :key="index">
            <p>{{ item.title }}</p>
            <p>{{ item.number }}</p>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { mapState } from 'vuex'
import { getStore } from '../../config/localStorage'

export default {
    name: 'Sidebar',
    data() {
        return {
            type: [
                {
                    title: '文章数量',
                    number: this.articleNum
                }
            ],
            ...mapState([
                'articleNum'
            ])
        }
    },
    beforeCreate() {
        this.articleNum = getStore('articleNum')
    }
}
</script>
<style lang="scss" scoped>
.sidebar {
    box-shadow: 1px 0 5px grey;
    position: fixed;
    top: 70px;
    bottom: 0;
    width: 10%;
    min-width: 120px;
    background-color: rgb(245, 245, 245);
    div {
        margin: 20px auto;
    }
    img {
        display: block;
        margin: 30px auto 0;
        width: 100px;
        height: 100px;
    }
    ul {
        display: inline-block;
        li {
            display: inline-block;
            margin: 20px 10px 0;
        }
    }
    .number {
        margin: 20px 20px 0;
    }
}
@media screen and (max-width: 800px){
    .sidebar {
        display: none;
    }
}
</style>
