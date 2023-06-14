import request from "/@/utils/request"

export function fetchList(query?: Object) {
  return request({
    url: '/bridge/history/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj?: Object) {
  return request({
    url: '/bridge/history',
    method: 'post',
    data: obj
  })
}

export function getObj(id?: string) {
  return request({
    url: '/bridge/history/' + id,
    method: 'get'
  })
}

export function delObjs(ids?: Object) {
  return request({
    url: '/bridge/history',
    method: 'delete',
    data: ids
  })
}

export function putObj(obj?: Object) {
  return request({
    url: '/bridge/history',
    method: 'put',
    data: obj
  })
}