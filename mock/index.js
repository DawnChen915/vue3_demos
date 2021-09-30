import Mock from "mockjs";
import {article} from "./article";

Mock.setup({
    timeout: '200-600'
})

article.forEach(item=>{
    Mock.mock(item.url,item.type,item.response)
})
