import axios from 'axios'
export function getCode (params) {
  return axios.post('api/sysUser/getPhoneCode', params)
}
