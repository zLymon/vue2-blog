<template>
    <div class="project">
        <div class="add">
            <label for="time">时间</label><input type="text" name="time" id="time" ref="time">
            <label for="name">项目名称</label><input type="text" name="name" id="name" ref="name">
            <label for="desc">项目描述</label><input type="text" name="desc" id="desc" ref="desc">
            <label for="resp">责任描述</label><input type="text" name="resp" id="resp" ref="resp">
            <label for="link">项目链接</label><input type="text" name="link" id="link" ref="link">
            <button @click="addProject">添加</button>
        </div>
        <ul>
            <li v-for="(item, index) in projects" :key="index">
                {{ item.time }}————{{ item.name }}————{{ item.desc }}————{{ item.resp }}————{{ item.link }} 
                <button @click="deleteProject(item.id)">删除</button>
            </li>
        </ul>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'Project',
    data() {
        return {
            projects: []
        }
    },
    inject: ['reload'],
    methods: {
        formatTime(time) {
            let d = new Date(time)
            let createTime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
            return createTime
        },
        addProject() {
            let time = this.$refs.time.value
            let name = this.$refs.name.value
            let desc = this.$refs.desc.value
            let resp = this.$refs.resp.value
            let link = this.$refs.link.value
            this.axios.post('/admin/addProject',{
                time: time,
                name: name,
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
        deleteProject(id) {
            let _id = id
            this.axios.post('/admin/deleteProject', {
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
        this.axios.get('/admin/getProject')
            .then((res) => {
                for (let i = 0; i < res.data.length; i++) {
                    this.projects.push({
                        id: res.data[i]._id,
                        time: res.data[i].time,
                        name: res.data[i].name,
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
