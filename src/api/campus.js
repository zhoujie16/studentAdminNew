//校区管理 api
import request from '@/utils/request'

export function queryCampus(){
	return request({
		url: '/campus',
		method: 'get'
	})
}

export function addCampus(data){
	return request({
		url: '/campus',
		method: 'post',
		data : data
	})
}

export function editCampus(data){
	return request({
		url: '/campus',
		method: 'put',
		data : data
	})
}

export function delCampus(data){
	return request({
		url: '/campus',
		method: 'delete',
		data : data
	})
}