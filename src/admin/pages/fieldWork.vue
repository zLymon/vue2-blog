<template>
    <div class="field-work">
        <div class="add">
            <label for="time">实习时间</label><input type="text" name="time" id="time" ref="time">
            <label for="company">公司名称</label><input type="text" name="company" id="company" ref="company">
            <label for="desc">项目描述</label><input type="text" name="desc" id="desc" ref="desc">
            <label for="resp">责任描述</label><input type="text" name="resp" id="resp" ref="resp">
            <label for="link">项目链接</label><input type="text" name="link" id="link" ref="link">
            <button @click="addFieldWork">添加</button>
        </div>
        <ul>
            <li v-for="(item, index) in fieldWorks" :key="index">
                {{ item.time }}————{{ item.company }}————{{ item.desc }}————{{ item.resp }}————{{ item.link }} 
                <button @click="deleteFieldWork(item.id)">删除</button>
            </li>
        </ul>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'field-work',
    data() {
        return {
            fieldWorks: []
        }
    },
    inject: ['reload'],
    methods: {
        formatTime(time) {
            let d = new Date(time)
            let createTime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
            return createTime
        },
        addFieldWork() {
            let time = this.$refs.time.value
            let company = this.$refs.company.value
            let desc = this.$refs.desc.value
            let resp = this.$refs.resp.value
            let link = this.$refs.link.value
            this.axios.post('/admin/addFieldWork',{
                time: time,
                company: company,
                desc: desc,
                resp: resp,
                link: link
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
        },
        deleteFieldWork(id) {
            let _id = id
            this.axios.post('/admin/deleteFieldWork', {
                id: _id
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
        this.axios.get('/admin/getFieldWork')
            .then((res) => {
                for (let i = 0; i < res.data.length; i++) {
                    this.fieldWorks.push({
                        id: res.data[i]._id,
                        time: res.data[i].time,
                        company: res.data[i].company,
                        desc: res.data[i].desc,
                        resp: res.data[i].resp,
                        link: res.data[i].link
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
