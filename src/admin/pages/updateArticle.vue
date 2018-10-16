<template>
    <div class="publish">
        <!-- <div class="btnsContainer">
            <div class="btn" @click="getMdValueFn">获取mdValue</div>
            <div class="btn" @click="getHtmlValueFn">获取htmlValue</div>
        </div> -->
        <div class="tags">
            <div class="input">
                <label for="tags">标签</label>
                <input type="text" name="tag" id="tag" ref="tag">
            </div>
            <button @click="update">更新文章</button>
        </div>
        <div class="maskContainer" v-if="dilogStatus">
            <div class="contentContainer">
            <div class="closeBtnContainer" @click="closeMaskFn"></div>
                <textarea class="showAreaContainer" v-model="msgShow" readonly></textarea>
            </div>
        </div>
        <div class="editorContainer">
            <markdown 
            :mdValuesP="msg.mdValue"  
            :fullPageStatusP="false" 
            :editStatusP="true" 
            :previewStatusP="true" 
            :navStatusP="true"
            :icoStatusP="true"  
            @childevent="childEventHandler"
            v-if="msg.mdValue!=='# 请输入标题'"
            ></markdown>
        </div>
    </div>
</template>
<script>
import markdown from '@/admin/components/markdown'
import axios from 'axios'

export default {
    name: 'updateArticle',
    data() {
        return {
            msgShow: '我要显示的内容',
            dilogStatus:false,
            msg: {
                mdValue:'# 请输入标题'
            }
        }
    },
    components: {
        markdown
    },
    inject: ['reload'],
    methods: {
        isEmpty(obj) {
            if(typeof obj == 'undefined' || obj == null || obj == '') {
                return true
            } else {
                return false
            }
        },
        update() {
            let content = this.msg.mdValue
            let tag = this.$refs.tag.value
            let id = this.$route.query.id
            // let createTime = new Date().toLocaleDateString()

            if(this.isEmpty(tag) || this.isEmpty(content)) {
                alert('标签或内容不能为空')
                return
            }
            this.axios.post('/admin/updateArticle', {
                id: id,
                tag: tag,
                content: content
                // createTime: createTime
            })
            .then((response) => {
                if(response.data.status === 1) {
                    alert(response.data.message)
                    this.reload()
                } else {
                    alert(response.data.message)
                    return
                }
            })
        },
        childEventHandler:function(res){
            // res会传回一个data,包含属性mdValue和htmlValue，具体含义请自行翻译
            this.msg=res;
        },
        getMdValueFn:function(){
            this.msgShow=this.msg.mdValue;
            this.dilogStatus=true;
        },
        getHtmlValueFn:function(){
            this.msgShow=this.msg.htmlValue;
            this.dilogStatus=true;
            
        },
        closeMaskFn:function(){
            this.msgShow='';
            this.dilogStatus=false;
        }
    },
    mounted() {
        let id = this.$route.query.id
        this.axios.get('/admin/getUpdateArticle', {
            params: {
                id: id
            }
        })
        .then((res) => {
            this.$refs.tag.value = res.data.message.tag
            this.msg.mdValue = res.data.message.content
            console.log(res)
        })
    }
}
</script>
<style lang="scss" scoped>
.tags {
    display: flex;
    justify-content: flex-end;
    width: 90%;
    margin: 0 auto;
    input {
        border: 1px solid #000;
        width: 40%;
    }
    
}
    .publish {
        height: 100%;
        background: #ddd;
        position: relative;
        margin-left: 210px;
        button {
            padding: 10px;
            background-color: rgb(145, 200, 255);
            color: #fff;
            cursor: pointer
        }
    }
    // .btnsContainer{
    //     // position: absolute;
    //     z-index: 10;
    //     // left: 65px;
    //     // top: 5px;
    //     height: 25px;
    //     min-width: 300px;
    //     // background: pink;
    //     display: flex;
    //     justify-content: flex-start;
    //     align-items: center;
    //     .btn{
    //         display: inline-block;
    //         border:1px solid #ccc;
    //         margin-right: 10px;
    //         box-sizing: border-box;
    //         padding: 0 10px;
    //         background: #fff;
    //         font-size: 12px;
    //         height: 25px;
    //         line-height: 25px;
    //         cursor:pointer;
    //         -moz-user-select: none; 
    //         -o-user-select:none; 
    //         -khtml-user-select:none; /* you could also put this in a class */ 
    //         -webkit-user-select:none;/* and add the CSS class here instead */ 
    //         -ms-user-select:none; 
    //         user-select:none;/**禁止选中文字*/ 
    //         &:active{
    //             opacity: 0.8;
    //             background: lightblue;
    //         }
    //     }
    // }
    .maskContainer{
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        height: 100vh;
        width: 100vw;
        background: rgba(0,0,0,0.5);
        // z-index: 100;
        display: flex;
        justify-content: center;
        align-items: center;
        .contentContainer{
            width: 60%;
            height: 60%;
            background: #fefefe;
            padding: 20px;
            box-sizing: border-box;
            position: relative;
            .showAreaContainer{
                height: 100%;
                width: 100%;
                outline: none;
                background: #eee;
                display: block;
                resize: none;
                padding: 10px;
                box-sizing: border-box;
            }
            .closeBtnContainer{
                position: absolute;
                height: 30px;
                width: 30px;
                right: -40px;
                top: -40px;
                border:1px solid #fff;
                border-radius: 50%;
                &::before{
                    content: '';
                    position: absolute;
                    width: 70%;
                    height: 2px;
                    display: block;
                    background: #fff;
                    left: 15%;
                    top: calc(50% - 1px);
                    transform: rotate(45deg);
                    -webkit-transform: rotate(45deg);
                    -moz-transform: rotate(45deg);
                }
                &::after{
                    content: '';
                    position: absolute;
                    width: 70%;
                    height: 2px;
                    display: bblock;
                    background: #fff;
                    left: 15%;
                    top: calc(50% - 1px);
                    transform: rotate(-45deg);
                    -webkit-transform: rotate(-45deg);
                    -moz-transform: rotate(-45deg);
                }
            }
        }
    }
    
    .editorContainer {
        width: 90%;
        height: 90%;
        margin: 0 auto;
        border: 1px solid #ddd;
    }
</style>
