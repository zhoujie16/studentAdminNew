<template>
    <div class="">
        <el-form :inline="true" size="small">
            <div v-for="(item,i) in formList" class="" style="display: inline-block;">
                <el-form-item v-if="item.eleType=='input'" :label="item.label">
                    <el-input v-model="item.value" :placeholder="item.placeholder"></el-input>
                </el-form-item>
                <el-form-item v-else-if="item.eleType=='select'" :label="item.label">
                    <el-select v-model="item.value" :placeholder="item.placeholder">
                        <el-option label="全部" :value="null"></el-option>
                        <el-option v-for="(option,i) in item.options" :label="option.key" :value="option.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-else-if="item.eleType=='date-picker'" :label="item.label">
                    <el-date-picker value-format="yyyy" v-model="item.value" type="year" :placeholder="item.placeholder"></el-date-picker>
                </el-form-item>
                <el-form-item v-else-if="item.eleType=='button'" size="small">
                    <el-button :type="item.type" @click="item.onClick">{{item.label}}</el-button>
                </el-form-item>
            </div>
        </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
//                 elelist: [{
//                     eleType: 'input',
//                     label: 'input',
//                     type: 'text',
//                     placeholder: "input",
//                     value: '',
//                 }, {
//                     eleType: 'select',
//                     label: 'select',
//                     value: '',
//                     options: [{
//                         key: 'key',
//                         value: 'value'
//                     }]
//                 }, {
//                     eleType: 'date-picker',
//                     label: 'date-picker',
//                     type: "year",
//                     placeholder: "选择年",
//                     value: '',
//                 }, {
//                     eleType: 'button',
//                     label: '按钮',
//                     type: 'success',
//                     onClick: function (e) {
// 
//                     },
//                 }]
            }
        },
		props:['formList'],
        mounted() {

        },
        methods: {

        }
    }
</script>

<style>

</style>
