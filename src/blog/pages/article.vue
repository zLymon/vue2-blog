<template>
    <div class="article">
        <div class="session">
            <h2>{{ title }}</h2>
            <div class="article-info">
                <span>{{ createTime }}</span>
                <div class="tags">
                    <span>{{ tag }}</span>
                </div>
                <!-- <span class="tags" v-for="(item, index) in tags" :key="index">{{ item }}</span> -->
            </div>
            <!-- <span>{{ createTime }}</span> -->
            <p class="previewContainer markdown-body" v-html="compileMarkdown">{{ content }}</p>
        </div>
        <comment :id="this.id"></comment>
    </div>
</template>
<script>
import axios from 'axios'
import comment from '@/blog/components/comment'
import marked from 'marked'
import hljs from '../../../static/js/highlight.min.js'
import range from '../../../static/js/rangeFn.js'

let rendererMD = new marked.Renderer()
marked.setOptions({
    renderer: rendererMD,
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    highlight: function(code) {
        return hljs.highlightAuto(code).value
    }
})

export default {
    name: 'Article',
    props: ['id'],
    components: {
        comment
    },
    data() {
        return {
            title: '',
            createTime: null,
            content: '',
            tag: ''
        }
    },
    methods: {
        formatTime(time) {
            let d = new Date(time)
            let createTime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
            return createTime
        }
    },
    computed: {
        compileMarkdown() {
            // this.content = this.regReplace(this.content)
            return marked(this.content, {sanitize: true})
        }
    },
    created() {
        this.axios.get('/users/getArticle', {
            params: {
                id: this.id
            }
        })
        .then((response) => {
            this.title = response.data.message.title
            this.createTime = this.formatTime(response.data.message.createTime)
            this.content = response.data.message.content
            this.tag = response.data.message.tag
        })
        .catch((err) => {
            console.log(err)
        })
    }
}
</script>
<style lang="scss" scoped>
.session {
    margin: 20px auto 0;
    padding: 20px;
    width: 50%;
    background-color: #fff;
    h2,span,p,a {
        margin-bottom: 10px;
    }
    p {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        background: #fff;
        overflow: auto;
        padding: 10px;
        text-align: left;
    }
    .article-info {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid rgba(138, 138, 138, .3);
        color: rgba(138, 138, 138, .7);
        span {
            color: rgba(138, 138, 138, .7);
        }
        .tags {
            span {
                padding: 5px;
                border-radius: 20px;
                background-color: rgba(138,138,138,.3);
                color: #000;
                margin: 0 10px;
            }
        }
    }
    a {
        color:rgb(145, 200, 255);
    }
}
@media screen and (max-width: 800px){
    .session {
        width: 80%;
    }
}
</style>
