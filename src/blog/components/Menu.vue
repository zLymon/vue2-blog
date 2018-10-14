<template>
    <div class="infomenu">
        <ul>
            <li v-for="(item, index) in menu_list" :key="index">
                <router-link :to="item.link">{{ item.title }}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'infomenu',
    data() {
        return {
            menu_list : [
                {
                    title: '关于我',
                    link: '/aboutme'
                },
                {
                    title: '关于博客',
                    link: '/aboutblog'
                }
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
.infomenu {
    position: absolute;
    right: 0;
    top: 70px;
    width: 100px;
    height: 120px;
    background-color: #fff;
    box-shadow: 0px 2px 5px #000;
    ul {
        li {
            list-style: none;
            margin-top: 10px;
            line-height: 48px;
            a {
                text-decoration: none;
                color: #333;
                display: block
            }
            :hover {
                background-color: #eee;
            }
        }
    }
}
</style>
