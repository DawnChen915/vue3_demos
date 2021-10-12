import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: '/vue3_demos/article/list',
    method: 'post',
    data: data
  })
}

export function fetchArticle(data) {
  return request({
    url: '/vue3_demos/article/detail',
    method: 'post',
    data: data
  })
}

export function fetchElec(data){
  return request({
    url:'/vue3_demos/elec/list',
    method:'post',
    data:data
  })
}