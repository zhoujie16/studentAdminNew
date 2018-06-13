import Mock from 'mockjs'

function _url(url) {
	return 'http://101.201.196.132/school_webapi' + url;
}

Mock.setup({
    timeout: '200-600'
})
//登录接口
Mock.mock(_url('/user/login'), 'post', {
	"data": {
		"type": "user",
		"account": "admin",
		"pwd": "e10adc3949ba59abbe56e057f20f883e",
		"roleType": 1,
		"status": 1,
		"userId": 11
	},
	"msg": "登录成功",
	"ret": 0,
	"totalCount": 0
})
//新增校区
Mock.mock(_url('/campus'),'post',{
	'data':{
		'type':'',
		'_id':'',
		'name':'',
		'closeDate':'',
		'leaderName':'',
		'openDate':'',
		'seq':'',
	},
	'msg|1-10':"",
	'ret':0,
	'totalCount' :1
})

//删除校区
Mock.mock(_url('/campus'),'delete',{
	msg:'操作成功',
	ret:0,
	totalCount:0
})

//编辑校区
Mock.mock(_url('/campus'),'put',{
	msg:'操作成功',
	ret:0,
	totalCount:0
})

//查询校区
Mock.mock(_url('/campus/list'),'get',{
	'dataList|10':[{
		'type|5':'',
		'_id|5':0,
		'name|5':'',
		'closeDate':'2017-01-01',
		'leaderName|8':'',
		'openDate':'2017-01-01',
		'seq':10,
		leaderId:'',
	}],
	msg:'操作成功',
	ret:0,
	totalCount:10
})

//新增学届
Mock.mock(_url('/grade'),'post',{
	msg:'操作成功',
	ret:0,
	totalCount:10
})
//删除学届
Mock.mock(_url('/grade'),'delete',{
	msg:'操作成功',
	ret:0,
	totalCount:10
})
//查询学届
Mock.mock(_url('/grade/list'),'post',{
	'dataList|10':[{
		'type|5':'',
		'_id|5':0,
		'name|5':'',
		leaderId:'',
	}],
	msg:'操作成功',
	ret:0,
	totalCount:10
})


//新增班级
Mock.mock(_url('/class'),'post',{
	msg:'操作成功',
	ret:0,
	totalCount:10
})
//删除班级
Mock.mock(_url('/class'),'delete',{
	msg:'操作成功',
	ret:0,
	totalCount:10
})
//编辑班级
Mock.mock(_url('/class'),'put',{
	msg:'操作成功',
	ret:0,
	totalCount:10
})
//查询班级
Mock.mock(_url('/class/list'),'post',{
	'dataList|10':[{
		'type|5':'',
		'_id|5':0,
		'name|5':'',
		'campusId|5':'',
		'gradeId|5':'',
		'tchName|5':'',
		'imgUrl|5':'',
		'seq':''
		
	}],
	msg:'操作成功',
	ret:0,
	totalCount:10
})

//新增校友
Mock.mock(_url('/student'),'post',{
	msg:'操作成功',
	ret:0,
	totalCount:10
})
//删除校友
Mock.mock(_url('/student'),'delete',{
	msg:'操作成功',
	ret:0,
	totalCount:10
})
//编辑校友
Mock.mock(_url('/student'),'post',{
	msg:'操作成功',
	ret:0,
	totalCount:10
})
//查询校友
Mock.mock(_url('/student/list'),'post',{
	'dataList|10':[{
		'campusId':'校区ID',
		'gradeId':'学届ID',
		'className':'班级名称',
		'name':'校友姓名',
		'activeStatus':'激活状态',
		'classId':'班级ID', 
		
	}],
	msg:'操作成功',
	ret:0,
	totalCount:10
})
//查询校友详情
//导入校友资料
//导出校友资料

//新增用户
Mock.mock(_url('/user'),'post',{
	msg:'操作成功',
	ret:0,
	totalCount:10
})
//删除用户
Mock.mock(_url('/user'),'delete',{
	msg:'操作成功',
	ret:0,
	totalCount:10
})
//修改密码/停用账号/启用账号
Mock.mock(_url('/user'),'put',{
	msg:'操作成功',
	ret:0,
	totalCount:10
})
//查询用户列表
Mock.mock(_url('/user/list'),'get',{
	'dataList|10':[{
		'account':'账号/手机号',
		'password':'密文密码',
		'status':0,
		'userName':'用户名' 
	}],
	msg:'操作成功',
	ret:0,
	totalCount:10
})
//密码重置
Mock.mock(_url('/user/resetpwd'),'PUT',{
	msg:'操作成功',
	ret:0,
	totalCount:10
})

/*
Mock.mock(_url(''),'post',{
	
})
*/

export default Mock