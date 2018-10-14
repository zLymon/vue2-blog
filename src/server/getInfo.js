import axios from 'axios'
import {getStore} from '../config/localStorage'

//从服务器获取用户信息
export const getAccount = () => {
    this.axios.post('/users/getAccountInfo', {
        username: getStore('username')
    })
}