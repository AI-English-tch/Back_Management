import request from "/@/utils/request"

export function fetchList(query?: Object) {
  return request({
    url: '/bridge/store/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj?: Object) {
  return request({
    url: '/bridge/store',
    method: 'post',
    data: obj
  })
}

export function getObj(id?: string) {
  return request({
    url: '/bridge/store/' + id,
    method: 'get'
  })
}

export function delObjs(ids?: Object) {
  return request({
    url: '/bridge/store',
    method: 'delete',
    data: ids
  })
}

export function putObj(obj?: Object) {
  return request({
    url: '/bridge/store',
    method: 'put',
    data: obj
  })
}