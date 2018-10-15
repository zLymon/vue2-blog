import {setStore, removeStore} from '../config/localStorage'
import { RECORD_USERINFO, GET_USERINFO, RECORD_ARTICLENUM, GET_ARTICLENUM } from './mutation-types.js'

const mutations = {
    [RECORD_USERINFO](state, user) {
        //将用户名保存到state中，设置登录状态为true
        state.username = user.username
        state._id = user._id
        state.isLogin = true

        //保存信息到localStorage中
        setStore('_id', user._id)
        setStore('username', user.username)
        setStore('isLogin', true)
    },
    [GET_USERINFO](state, _id) {
        if(state._id && (state._id !== _id)) {
            return
        }

        if(_id) {
            state._id = _id
        } else {
            state._id = null
            state.username = null
            state.isLogin = false
            removeStore('_id')
            removeStore('username')
            removeStore('isLogin')
        }
    },
    [RECORD_ARTICLENUM](state, num) {
        state.articleNum = num
        setStore('articleNum', num)
    },
    [GET_ARTICLENUM](state, num) {
        
    }
}

export default mutations