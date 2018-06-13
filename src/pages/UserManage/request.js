//用户管理 api 
import request from '@/utils/request'

 
export function addAction(data){
	return request({
		url: '/user',
		method: 'post',
		data : data
	})
}

export function delAction(data){
	return request({
		url: '/user',
		method: 'DELETE',
		data : data
	})
}

export function editAction(data){
	return request({
		url: '/user/' + data.id ,
		method: 'post'
	})
}
export function queryAction(data){
	return request({
		url: '/user/list',
		method: 'GET',
		data : data
	})
}
export function setpwdAction(data){
	return request({
		url: `/user/resetpwd/${data._id}`,
		method: 'post',
		data : data
	})
}