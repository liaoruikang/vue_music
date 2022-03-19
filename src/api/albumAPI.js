import request from '@/plugin/request'

export const discList = (limit, offset, area) => {
  return request.get('album/new', { params: { limit, offset, area } })
}
