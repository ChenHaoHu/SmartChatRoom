import Vue from 'vue'
import VueRouter from 'vue-router'
import SmartChat from '../components/SmartChat.vue'
import Index from '../components/Index.vue'

Vue.use(VueRouter)
const router = new VueRouter({
    routes:[
        {path:'/index',component:Index},
        {path:'/smartchat',component:SmartChat},
        {path:'/',redirect:'/index'}
    ],
    mode:'history'
})
export default router