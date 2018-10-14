<template>
    <div class="fixed-header">
        <div class="header">
            <ul>
                <li v-for="(item, index) in nav" :key="index">
                    <router-link :to="item.link">{{ item.title }}</router-link>
                </li>
            </ul>
            <img src="@/assets/images/more.png" @click="showMenu">
            <transition name="toggle">
                <InfoMenu v-if="display"></InfoMenu>
            </transition>
        </div>
    </div>
</template>

<script>
import InfoMenu from '@/blog/components/Menu'

export default {
    name: 'Header',
    components: {
        InfoMenu
    },
    data() {
      return {
          nav: [
              {title: '首页',link: '/index'},
              {title: '文章列表',link: '/list'}
          ],
          display: false
      }
    },
    created() {
        document.addEventListener('click', (e) => {
            if(!this.$el.contains(e.target)) this.display = false
        })
    },
    methods : {
        showMenu() {
            this.display = !this.display
        }
    }

}
</script>

<style lang="scss" scoped>
$lightblue: rgb(145, 200, 255);
@keyframes toggle {
    0% {height: 0;opacity: 0;}
    100% {height: 120px; opacity: 1;}
}
.fixed-header {
    height: 70px; //使得fixed顶部不会遮挡其他元素
    .header {
        position: fixed;
        background: $lightblue;
        box-shadow: 0 2px 10px grey;
        z-index: 100;
        height: 70px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        ul {
            margin-left: 20px;
            li {
                a{
                    color: #fff;
                    text-decoration: none;
                }
                margin-right: 20px;
                display: inline-block
            }
        }
        img {
            width: 30px;
            height: 30px;
            margin-right: 20px;
            cursor: pointer;
        }
        :after {
            clear: both;
        }
    }
    .toggle-enter-active {
        animation: toggle .5s
    }
    .toggle-leave-active {
        animation: toggle .5s reverse
    }
}
.router-link-active {
    border-bottom: 1px solid #fff;
}


</style>
