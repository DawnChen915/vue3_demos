//注册全局指令
import * as directives from "./directive"
export default {
    install(app) {
        Object.keys(directives).forEach((key) => {
            app.directive(key, directives[key])
        })
    },
}