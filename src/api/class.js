//班级管理 api
import request from '@/utils/request'

export function queryClass(data){
	return request({
		url: '/class/list',
		method: 'post',
		data : data
	})
}

export function addClass(data){
	let fd = new FormData();
	Object.keys(data).forEach((key,i) => {
		fd.append(key,data[key])
		console.log(key,data[key])
	})
	return request({
		url: '/class',
		method: 'post',
		data : fd
	})
}

export function editClass(data){
	let fd = new FormData();
	Object.keys(data).forEach((key,i) => {
		fd.append(key,data[key])
		console.log(key,data[key])
	})
	return request({
		url: '/class/'+data.classId,
		method: 'put',
		data : fd
	})
}
export function delClass(data){
	return request({
		url: '/class',
		method: 'delete',
		data : data
	})
}