//学届管理 api 
import request from '@/utils/request'

export function queryGrade(data){
	return request({
		url: '/grade/list',
		method: 'post',
		data : data
	})
}

export function addGrade(data){
	return request({
		url: '/grade',
		method: 'post',
		data : data
	})
}
export function editGrade(){
	return request({
		url: '/grade',
		method: 'put'
	})
}
export function delGrade(data){
	return request({
		url: '/grade',
		method: 'delete',
		data : data
	})
}