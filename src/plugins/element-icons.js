import * as icons from "@element-plus/icons";
export default{
    install(app){
        for(let i in icons){
            app.component(icons[i].name,icons[i])
        }
    }
}
