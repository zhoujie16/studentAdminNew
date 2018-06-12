//校友管理 api
import request from '@/utils/request'

export function queryStudent(data){
	return request({
		url: '/student/list',
		method: 'post',
		data : data
	})
}

export function addStudent(data){
	let fd = new FormData();
	Object.keys(data).forEach((key,i) => {
		fd.append(key,data[key])
		console.log(key,data[key])
	})
	return request({
		url: '/student',
		method: 'post',
		data : fd
	})
}

export function editStudent(data){
	let fd = new FormData();
	Object.keys(data).forEach((key,i) => {
		fd.append(key,data[key])
		console.log(key,data[key])
	})
	return request({
		url: '/student/'+data.stuId,
		method: 'put',
		data : fd
	})
}
export function delStudent(data){
	return request({
		url: '/student',
		method: 'delete',
		data : data
	})
}