<!-- 用户管理
		新增用户
		删除用户
		修改密码/停用账号/启用账号
		查询用户列表
		密码重置
 -->
<template>
    <div class="container">
        <el-header>用户管理</el-header>
        <el-main>
            <FormHeader :formList="formList"></FormHeader>
            <!--<el-form :model="queryForm" :inline="true" size="small">
				<el-form-item label="系统账号">
					<el-select v-model="queryForm.campusId" placeholder="请选择">
						<el-option label="全部" :value="null"></el-option>
						<el-option v-for="(item,i) in campusList" :label="item.campusName" :value="item.campusId"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="账号状态">
					<el-select v-model="queryForm.gradeYear" placeholder="请选择">
						<el-option label="全部" :value="null"></el-option>
						<el-option v-for="(item,i) in gradeList" :label="item.gradeName" :value="item.gradeYear"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="用户名">
					<el-input v-model="queryForm.className"></el-input>
				</el-form-item>
				<el-form-item size="small">
					<el-button type="primary" @click="queryBtnClick">查询</el-button>
					<el-button type="success" @click="addBtnClick">新增</el-button>
					<el-button type="danger" @click="delBtnClick">删除</el-button>
				</el-form-item>
			</el-form>-->
            <el-table @selection-change="handleSelectionChange" height="400" :data="dataList" border stripe size="small">
                <el-table-column type="selection" width="40"></el-table-column>
                <el-table-column label="操作" width="80">
                    <template slot-scope="scope">
                        <el-button @click="delTableClick(scope)" class="icon-btn-edit" style="" type="primary" size="mini" icon="el-icon-edit"></el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="userName" label="用户名" width=""></el-table-column>
                <el-table-column prop="account" label="账号/手机号" width=""></el-table-column>
                <el-table-column prop="password" label="密文密码" width=""></el-table-column>
                <el-table-column label="账号状态" width="">
                    <template slot-scope="scope">
                        {{scope.row.status}}
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination" style="margin-top: 10px;">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30]" layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </div>
        </el-main>
        <!--新增编辑框-->
        <el-dialog :title="dialogMark=='add'?'添加记录':'编辑记录'" :visible.sync="dialogVisible">
            <el-form :model="editForm" ref="editForm" label-width="100px" label-position="right" size="small">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="系统账号">
                            <el-input v-model="editForm.account"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="密码">
                            <el-input v-model="editForm.password"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="用户名">
                            <el-input v-model="editForm.userName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogVisible = false">取 消</el-button>
                <el-button size="small" type="primary" @click="submitBtnClick">提 交</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {
        addAction,
        delAction,
        editAction,
        queryAction,
        setpwdAction
    } from './request'

    import FormHeader from './../Components/FormHeader'

    export default {
        data() {
            return {
                dialogVisible: false,
                dialogMark: "",
				pageNum: 1,
				pageSize: 10,
                formList: [{
                        name: 'account',
                        eleType: 'input',
                        label: '系统账号',
                        value: '',
                    },
                    {
                        name: 'status',
                        eleType: 'select',
                        label: '账号状态',
                        value: '',
                        options: [{
                            key: 0,
                            value: 0
                        }, {
                            key: 1,
                            value: 1
                        }]
                    },
                    {
                        name: 'userName',
                        eleType: 'input',
                        label: '用户名',
                        value: '',
                    }, {
                        eleType: 'button',
                        label: '查询',
                        type: 'primary',
                        onClick: function (e) {
							console.log('查询')
                        },
                    }, {
                        eleType: 'button',
                        label: '新增',
                        type: 'success',
                        onClick: function (e) {
							
                        },
                    }, {
                        eleType: 'button',
                        label: '删除',
                        type: 'danger',
                        onClick: function (e) {

                        },
                    }
                ],
                // 查询
                queryForm: {
                    account: null,
                    status: null,
                    userName: null,
                    pageNum: 1,
                    pageSize: 10,
                },
                // 新增校友
                editForm: {
                    account: null,
                    password: null,
                    userName: null
                },
                // 选中的
                multipleSelection: [],
                //分页相关
                dataList: [],
                total: 0,
                curPage: 1,
                pageSize: 10,
            }
        },
        mounted() {
            this.queryAction()
        },
        methods: {
            queryBtnClick() {
                this.queryAction()
            },
            addBtnClick() {
                this.dialogVisible = true;
            },
            delBtnClick() {
                var ids = [];
                this.multipleSelection.forEach((item, i) => {
                    ids.push(item.stuId);
                });
                if (ids.length == 0) {
                    this.$message({
                        message: '请选择一条记录',
                        type: 'warning'
                    });
                    return;
                }
                this.delStudentAction(ids)
            },
            delTableClick() {

            },
            submitBtnClick() {
                addAction().then(response => {
                    const data = response.data;
                    console.log('查询', data)
                    if (data.ret === 0) {
                        this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                        this.dialogVisible = false;
                        this.queryAction()
                    }
                });
            },
            // 每页显示条数改变触发
            handleSizeChange(val) {
                console.log(`SizeChange 每页 ${val} 条`);
                this.queryForm.pageSize = val;
                this.queryAction();
            },
            // 当前页改变触发
            handleCurrentChange(val) {
                console.log(`CurrentChange 当前页: ${val}`);
                this.queryForm.pageNum = val;
                this.queryAction();
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                _log('选中的', val)
            },
            queryAction() {
                queryAction().then(response => {
                    const data = response.data;
                    console.log('查询', data)
                    if (data.ret === 0) {
                        this.dataList = data.dataList;
                    }
                })
            }
        },
        components: {
            FormHeader
        }
    }
</script>

<style>

</style>
