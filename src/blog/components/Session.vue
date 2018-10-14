<template>
    <div class="session">
        <h2>{{ title }}</h2>
        <span>{{ createTime }}</span>
        <!-- <div v-html="compileMarkdown">
            {{ content }}
        </div> -->
        <p>{{ content }}</p>
        <router-link :to="{name: 'Article', params: {id: id}}">阅读全文</router-link>
    </div>
</template>
<script>
import axios from 'axios'
import marked from 'marked'
let rendererMD = new marked.Renderer()
marked.setOptions({
    renderer: rendererMD,
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
})

export default {
    name: 'session',
    props: [
        'title',
        'createTime',
        'content',
        'id'
    ],
    computed: {
    },
    methods: {
    }
}
</script>
<style lang="scss" scoped>
.session {
    margin: 20px auto;
    padding: 20px;
    width: 50%;
    background-color: #fff;
    text-align: left;
    overflow: hidden;
    div {
        font-size: 16px !important;
        color: #000 !important;
    }
    h2,span,p,a {
        margin-bottom: 10px;
    }
    span {
        color: rgba(138, 138, 138, .7);
    }
    a {
        color:rgb(145, 200, 255);
        text-decoration: none;
    }
}
</style>
