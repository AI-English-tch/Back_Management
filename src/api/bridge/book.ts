import request from "/@/utils/request"

export function fetchList(query?: Object) {
  return request({
    url: '/bridge/book/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj?: Object) {
  return request({
    url: '/bridge/book',
    method: 'post',
    data: obj
  })
}

export function getObj(id?: string) {
  return request({
    url: '/bridge/book/' + id,
    method: 'get'
  })
}

export function delObjs(ids?: Object) {
  return request({
    url: '/bridge/book',
    method: 'delete',
    data: ids
  })
}

export function putObj(obj?: Object) {
  return request({
    url: '/bridge/book',
    method: 'put',
    data: obj
  })
}