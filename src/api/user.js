//用户管理 api 
import request from '@/utils/request'


export default Mock.mock('http://g.cn', {
          'name'    : '@name',
          'age|1-100': 100,
          'color'    : '@color'
}); 

export function queryGrade(data){
	return request({
		url: '/grade/list',
		method: 'post',
		data : data
	})
}