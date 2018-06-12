import request from '@/utils/request'

export function queryAudit(data){
	return request({
		url: '/audit/postrecd/list',
		method: 'post',
		data : data
	})
}

export function commitAuditPass(id){ 
	return request({
		url: '/audit/postrecd/pass/' + id,
		method: 'put'
	})
}

export function commitAuditDeny(id,denyReason){ 
	return request({
		url: '/audit/postrecd/deny/' + id,
		method: 'put',
		data:{
			denyReason
		}
	})
}