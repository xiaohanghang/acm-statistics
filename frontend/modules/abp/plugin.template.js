/* eslint-disable */

import assign from 'lodash/assign'

export default function (ctx, inject) {

  const buildFunction = <%= options.content %>;

  const services = buildFunction(requestHelper(ctx.$axios), assign)

  ctx.$services = services
  inject('services', services)
}

function requestHelper(request) {
  return data => request(data)
    .then(res => {
      return res.data.result
    })
    .catch(e => {
      if (e.response && e.response.data) {
        const data = e.response.data

        if (data.unAuthorizedRequest) {
          // TODO: 处理未登录的情况
        }

        throw data.error
      } else {
        throw e
      }
    })
}
