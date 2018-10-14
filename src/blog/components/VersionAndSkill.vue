<template>
    <div class="aboutblog">
        <div class="version">
            <h3>Version</h3>
            <p>1.0</p>
        </div>
        <div class="skill">
            <h3>技术栈</h3>
            <table>
                <thead>
                    <tr>
                        <th>技术栈</th>
                        <th>描述</th>
                        <th>url</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in skillList" :key="index">
                        <th>{{ item.name }}</th>
                        <th>{{ item.description }}</th>
                        <th>{{ item.url }}</th>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
export default {
    name: 'VersionAndSkill',
    data() {
        return {
            skillList: [
                {name: 'Vue.js', description: 'Vue是一套用于构建用户界面的渐进式框架。', url: 'https://cn.vuejs.org'},
                {name: 'Express', description: 'Express 是一个保持最小规模的灵活的 Node.js Web 应用程序开发框架。', url: 'http://www.expressjs.com.cn/'},
                {name: 'Axios', description: 'Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。', url: 'https://github.com/axios/axios'},
                {name: 'Sass', description: 'Sass是一个CSS预处理器。它通过添加标记到样式表中，可以帮助我们更轻松惬意的书写CSS。', url: 'https://www.sass.hk/'},
                {name: 'marked.js', description: 'marked.js是一个用于解析markdown格式文本的JS文件，可以将其渲染成HTML文本', url: 'https://github.com/markedjs/marked'}
            ]
        }
    }
}
</script>
<style lang="scss" scoped>
.aboutblog {
    width: 70%;
    margin: 20px auto;
    div {
        background-color: #fff;
        box-shadow: 2px 2px 5px grey;
    }
    .version {
        width: 100%;
        padding: 20px;
        text-align: left;
        margin-bottom: 20px;
    }
    .skill {
        width: 100%;
        padding: 20px;
        h3 {
            text-align: left;
            font-weight: bold;
        }
        table {
            margin: 0 auto;
            border-collapse: collapse;
        }
        tr {
            border-bottom: 1px solid grey;
            th {
                padding: 20px;
            }
        }
    }
}
@media screen and (max-width: 800px){
    .session {
        width: 80%;
    }
}
</style>
