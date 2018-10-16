<template>
    <div class="fixed-sidebar">
        <div class="sidebar">
            <p>管理员:{{ username }}</p>
            <button @click="logout">注销</button>
            <ul class="functions">
                <li v-for="(item, index) in functions" :key="index">
                    <p @click="toggle(index)">{{ item.name }}</p>
                    <transition name="toggle">
                        <ul class="child" v-show="item.isActive">
                            <li v-for="(child, index) in item.children" :key="index">
                                <router-link :to="child.link">{{ child.name }}</router-link>
                            </li>
                        </ul>
                    </transition>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import {getStore, removeStore} from '../../config/localStorage'
import {mapState} from 'vuex'
export default {
    name: 'sidebar',
    data() {
        return {
            functions: [
                {
                    name: '文章管理', 
                    isActive: false,
                    children: [
                        {name: '发布文章', link: '/publish'},
                        {name: '编辑文章', link: '/deleteArticle'}
                    ]
                },
                {
                    name: '评论管理',
                    isActive: false,
                    children: [
                        {name: '查看评论', link: '/comment'},
                        {name: '删除评论', link: '/deleteComment'}
                    ]
                },
                {
                    name: '实习、项目管理',
                    isActive: false,
                    children: [
                        {name: '实习经验',link: '/fieldWork'},
                        {name: '项目经验',link: '/project'}
                    ]
                }
            ],
            // 信息在每次组件加载之前从localStorage获取，所以不能将state放在computed属性内
            ...mapState([
                '_id',
                'username',
                'isLogin'
            ])
        }
    },
    // computed: {
    //     ...mapState([
    //         '_id',
    //         'username',
    //         'isLogin'
    //     ])
    // },
    methods: {
        toggle(index) {
            this.functions[index].isActive = !this.functions[index].isActive
        },
        logout() {
            removeStore('username')
            removeStore('isLogin')
            alert('注销成功')
            this.$router.push({path: '/admin'})
        }
    },
    created() {
        this.username = getStore('username')
        this.isLogin = getStore('isLogin')
    }
}
</script>
<style lang="scss" scoped>
@keyframes toggle {
    0% {max-height: 0;opacity: 0;}
    100% {max-height: 200px;opacity: 1}
}
.fixed-sidebar {
    height: 100%;
    width: 200px;
    float: left
}
.sidebar {
    position: fixed;
    height: 100%;
    background-color: rgb(145, 200, 255);
    width: 200px;
    padding-top: 20px;
    box-shadow: 2px 0 10px grey;
    button {
        padding: 10px;
        background-color: rgb(145, 200, 255);
        color: #fff;
        cursor: pointer
    }
    >p {
        margin: 0 20px;
    }
    >ul {
        margin: 20px 0;
        p {
            cursor: pointer
        }
        >li {
            a {
                display: block;
                text-decoration: none;
                color: #000;
            }
            p {
                border-top: 1px solid #fff;
                border-bottom: 1px solid #fff;
            }
            margin: 20px 0;
            line-height: 48px;
            li {
                margin: 20px 0;
                background-color: #6db6ff;
            }
        }
    }
        .toggle-enter-active {
        animation: toggle .5s
    }
    .toggle-leave-active {
        animation: toggle .5s reverse
    }
}
</style>
