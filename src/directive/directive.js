import { isSpec } from "../utils/validate";
import { ElMessage } from 'element-plus'

let findEle = (parent, type) => {
    return parent.tagName.toLowerCase() === type ? parent : parent.querySelector(type)
}
const trigger = (el, type) => {
    const e = document.createEvent('HTMLEvents')
    e.initEvent(type, true, true)
    el.dispatchEvent(e)
}
//校验特殊字符
const VisSpec = {
    mounted: function (el, binding, vnode) {
        // 正则规则可根据需求自定义
        let $inp = findEle(el, 'input')
        el.$inp = $inp
        $inp.handle = function () {
            let val = $inp.value
            if (isSpec(val)) {

                ElMessage({ type: 'error', message: '存在特殊字符。' })
                $inp.value = ""
            }
            trigger($inp, 'input')
        }
        $inp.addEventListener('keyup', $inp.handle)
    },
    unmounted: function (el) {
        el.$inp.removeEventListener('keyup', el.$inp.handle)
    },
}
//对话框拖动
const VdialogDrag = {
    mounted(el, binding, vnode, oldVnode) {
        const dialogHeaderEl = el.querySelector('.el-dialog__header')
        const dragDom = el.querySelector('.el-dialog')
        dialogHeaderEl.style.cursor = 'move'

        // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
        const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null)

        dialogHeaderEl.onmousedown = (e) => {
            // 鼠标按下，计算当前元素距离可视区的距离
            const disX = e.clientX - dialogHeaderEl.offsetLeft
            const disY = e.clientY - dialogHeaderEl.offsetTop

            // 获取到的值带px 正则匹配替换
            let styL, styT

            // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
            if (sty.left.includes('%')) {
                styL = +document.body.clientWidth * (+sty.left.replace(/%/g, '') / 100)
                styT = +document.body.clientHeight * (+sty.top.replace(/%/g, '') / 100)
            } else {
                styL = +sty.left.replace(/\px/g, '')
                styT = +sty.top.replace(/\px/g, '')
            }

            document.onmousemove = function (e) {
                // 通过事件委托，计算移动的距离
                const l = e.clientX - disX
                const t = e.clientY - disY

                // 移动当前元素
                dragDom.style.left = `${l + styL}px`
                dragDom.style.top = `${t + styT}px`

                // 将此时的位置传出去
                // binding.value({x:e.pageX,y:e.pageY})
            }

            document.onmouseup = function (e) {
                document.onmousemove = null
                document.onmouseup = null
            }
        }
    }
}
const VdialogDragWidth = {
    mounted(el, binding, vnode, oldVnode) {
        const dragDom = binding.value.$el.querySelector('.el-dialog')

        el.onmousedown = (e) => {
            // 鼠标按下，计算当前元素距离可视区的距离
            const disX = e.clientX - el.offsetLeft

            document.onmousemove = function (e) {
                e.preventDefault() // 移动时禁用默认事件

                // 通过事件委托，计算移动的距离
                const l = e.clientX - disX
                dragDom.style.width = `${l}px`
            }

            document.onmouseup = function (e) {
                document.onmousemove = null
                document.onmouseup = null
            }
        }
    }
}
export {
    VisSpec,VdialogDrag,VdialogDragWidth
}