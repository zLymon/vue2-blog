<template>
    <div class="info">
        <div class="info-name">
            <h3>Lymon</h3>
            <p>Web前端开发</p>
        </div>
        <div class="experience">
            <div>
                <h3>实习经验</h3>
                <ul>
                    <li v-for="(item, index) in fieldWorks" :key="index">
                        <h4 @click="toggleWork(index)">{{ index+1 }}.{{ item.time }}</h4>
                        <transition name="toggle">
                            <div v-show="item.isActive" ref="details">
                                <p>实习地点：{{ item.company }}</p>
                                <p>项目描述：{{ item.desc }}</p>
                                <p>责任描述：{{ item.resp }}</p>
                                <p>项目链接: {{ item.link }}</p>
                            </div>
                        </transition>
                    </li>
                </ul>
            </div>
            <div>
                <h3>项目经验</h3>
                <ul>
                    <li v-for="(item, index) in projects" :key="index">
                        <h4 @click="togglePro(index)">{{ index+1 }}.{{ item.time }}</h4>
                        <transition name="toggle">
                            <div v-show="item.isActive" ref="details">
                                <p>实习地点：{{ item.name }}</p>
                                <p>项目描述：{{ item.desc }}</p>
                                <p>责任描述：{{ item.resp }}</p>
                                <p>项目链接: {{ item.link }}</p>
                            </div>
                        </transition>
                    </li>
                </ul>
            </div>
        </div>
        <div class="skill-list">
            <h3>技术栈</h3>
            <ul>
                <li v-for="(item, index) in skillList" :key="index">
                    {{ item.name }} —— {{ item.level }}
                </li>
            </ul>
        </div>
        <div class="contact">
            <h3>联系方式</h3>
            <p>邮箱: zlymon@foxmail.com</p>
            <p>Github: https://github.com/zLymon</p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'info',
    data() {
        return {
            skillList: [
                {name: 'HTML', level: '熟悉'},
                {name: 'CSS', level: '熟悉'},
                {name: 'JavaScript', level: '熟悉'},
                {name: 'Node.js', level: '能够运用Express框架实现简单后台功能'},
                {name: 'Vue.js', level: '熟悉Vue-cli、vue-router和axios等技术的运用和开发'}
            ],
            fieldWorks: [],
            projects: []
        }
    },
    methods: {
        toggleWork(index) {
            this.fieldWorks[index].isActive = !this.fieldWorks[index].isActive
        },
        togglePro(index) {
            this.projects[index].isActive = !this.projects[index].isActive
        }
    },
    created() {
        this.axios.all([
            this.axios.get('/users/getFieldWork'),
            this.axios.get('/users/getProject')
            ])
            .then(this.axios.spread((workResp, projectResp) => {
                for (let i = 0; i < workResp.data.length; i++) {
                    this.fieldWorks.push({
                        id: workResp.data[i]._id,
                        time: workResp.data[i].time,
                        company: workResp.data[i].company,
                        desc: workResp.data[i].desc,
                        resp: workResp.data[i].resp,
                        link: workResp.data[i].link,
                        isActive: false
                    })
                    this.projects.push({
                        id: projectResp.data[i]._id,
                        time: projectResp.data[i].time,
                        name: projectResp.data[i].name,
                        desc: projectResp.data[i].desc,
                        resp: projectResp.data[i].resp,
                        link: projectResp.data[i].link,
                        isActive: false
                    })
                }
            }))
    }
}
</script>
<style lang="scss" scoped>
$same-margin: 10px auto;
@keyframes toggle {
    0% {max-height: 0;opacity: 0;}
    100% {max-height: 200px; opacity: 1;}
}
.info {
    >div {
        width: 70%;
        margin: 20px auto;
        padding: 20px;
        background-color: #fff;
        box-shadow: 2px 2px 5px grey;
        text-align: left;
        h3 {
            margin-bottom: 10px;
        }
    }
    .experience {
        h4 {
            margin: $same-margin;
            display: inline-block;
            &:hover {
                cursor: pointer;
            }
        }
        p {
            margin: $same-margin;
        }
        li {
            list-style: none;
            margin: $same-margin;
        }
        .toggle-enter-active {
            animation: toggle .5s
        }
        .toggle-leave-active {
            animation: toggle .5s reverse
        }
    }
    .skill-list {
        li {
            list-style: none;
            margin: $same-margin
        }
    }
}
</style>
