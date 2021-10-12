import Mock from "mockjs";
import {article} from "./article";
import {elec}from './electricity'

Mock.setup({
    timeout: '200-600'
})

article.forEach(item=>{
    Mock.mock(item.url,item.type,item.response)
})
elec.forEach(item=>{
    Mock.mock(item.url,item.type,item.response)
})
