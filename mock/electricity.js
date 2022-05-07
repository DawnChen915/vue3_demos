const Mock = require('mockjs')

const List = []
const count = 100


for (let i = 0; i < count; i++) {
    List.push(Mock.mock({
        id: '@increment',
        timestamp: +Mock.Random.date('T'),
        'rowspan|1':['',2,3],
        name: '@ctitle(3,5)',
        'area|1': ['兴安盟','赤峰市','通辽市','呼伦贝尔市'],
        code: '@float(0, 100, 2, 2)',
        'type|1': ['水电', '火电', '风电', '光电','其他'],
        'status|1': [1,2,3],
        ratio:'@integer(300, 5000)',
        generationEnterprises: '@ctitle(3,5)',
        generatingStation:'@ctitle(3,5)'
    }))
}
console.log(List)
const elec = [
    {
        url: '/vue3_demos/elec/list',
        type: 'post',
        response: config => {
  
            const {
                status,
                type,
                name,
                page = 1,
                limit = 20,
                sort
            } = JSON.parse(config.body)

            let mockList = List.filter(item => {
                if (status && item.status !== status) return false
                if (type && item.type !== type) return false
                if (name && item.name.indexOf(name) < 0) return false
                return true
            })

            if (sort === '-id') {
                mockList = mockList.reverse()
            }

            const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

            return {
                code: 20000,
                data: {
                    total: mockList.length,
                    items: pageList
                }
            }
        }
    },
    // {
    //     url: '/vue3_demos/article/detail',
    //     type: 'post',
    //     response: config => {
    //         const {
    //             id
    //         } = JSON.parse(config.body)
    //         console.log(id)
    //         for (const article of List) {
    //             if (article.id === +id) {
    //                 return {
    //                     code: 20000,
    //                     data: article
    //                 }
    //             }
    //         }
    //     }
    // }
]
export {elec}