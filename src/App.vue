<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default{
    name: 'App'
  }
</script>
<style>
	.icon-btn-edit{
		color: #409EFF;padding: 5px;background-color: initial;border: initial;
	}
	.icon-btn-edit:hover,.icon-btn-edit:focus{
		color: #409EFF;
		background-color: initial;
	}
	.icon-btn-del{
		color: #f56c6c;padding: 5px;background-color: initial;border: initial;
	}
	.icon-btn-del:hover,.icon-btn-del:focus{
		color: #f56c6c;background-color: initial;
	}
</style>
