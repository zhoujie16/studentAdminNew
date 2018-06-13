//用户管理 api 
import request from '@/utils/request'

 

export function queryGrade(data){
	return request({
		url: '/grade/list',
		method: 'post',
		data : data
	})
}