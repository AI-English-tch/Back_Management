import request from "/@/utils/request"

export function fetchList(query?: Object) {
  return request({
    url: '/bridge/topic/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj?: Object) {
  return request({
    url: '/bridge/topic',
    method: 'post',
    data: obj
  })
}

export function getObj(id?: string) {
  return request({
    url: '/bridge/topic/' + id,
    method: 'get'
  })
}

export function delObjs(ids?: Object) {
  return request({
    url: '/bridge/topic',
    method: 'delete',
    data: ids
  })
}

export function putObj(obj?: Object) {
  return request({
    url: '/bridge/topic',
    method: 'put',
    data: obj
  })
}