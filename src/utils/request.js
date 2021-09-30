import axios from 'axios'
import { ElMessage } from 'element-plus'
const service = axios.create({
  timeout:3000
})

// TODO: 后端返回数据格式还会添加success属性
// service.interceptors.response.use(
//   (response) => {
//     var res = response.data
//     if (res.code % 2 !== 0) {
//       ElMessage({
//         message: res.msg || 'Error',
//         type: 'error',
//         duration: 2 * 1000
//       })
//       return res
//     } else {
//       if (res.msg != '') {
//         ElMessage({
//           message: res.msg,
//           type: 'success',
//           duration: 2 * 1000
//         })
//         return res
//       } else {
//         return res.data
//       }
//     }
//   },
//   (err) => {}
// )

export default service
