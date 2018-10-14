<template>
    <div class="comment">
        <ul>
            <li v-for="(item, index) in comments" :key="index">
                {{ item.createTime }}————{{ item.name }}————{{ item.message }}
            </li>
        </ul>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'comment',
    data() {
        return {
            comments: []
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
        this.axios.get('/admin/getAllComment')
            .then((res) => {
                for (let i = 0; i < res.data.length; i++) {
                    this.comments.push({
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

</style>
