import { Loading } from 'element-ui';

let loadingInstance;
				
export function showLoading(){
	loadingInstance = Loading.service({
	  lock: true,
	  text: '正在加载...', 
	  background: 'rgba(0, 0, 0, 0.1)'
	});
}

export function closeLoading(){
	loadingInstance.close()
}