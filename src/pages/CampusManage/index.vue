<!--校区管理-->
<template>
    <div class="container">
        <el-header>校区管理</el-header>
        <el-main>
            <el-form size="small">
                <el-form-item size="small">
                    <!--<el-button @click="queryCampusAction">查询</el-button>-->
                    <el-button @click="addCampusClick" type="primary">新增</el-button>
                    <el-button @click="delCampusBtnClick" type="danger">删除</el-button>
					<!--<el-button @click="testClick" type="">测试</el-button>-->
                </el-form-item>
            </el-form>
            <el-table max-height="480" :data="campusData" @selection-change="handleSelectionChange" border stripe size="small">
                <el-table-column type="selection" width="40"></el-table-column>
                <el-table-column label="操作" width="80">
                    <template slot-scope="scope">
                        <!--<span><i class="el-icon-edit"></i></span>-->
                        <!--<span><i class="el-icon-delete"></i></span>-->
                        <el-button @click="editCampusClick(scope)" class="icon-btn-edit" style=""
                            type="primary" size="mini" icon="el-icon-edit"></el-button>
                        <el-button @click="delCampusClick(scope)" class="icon-btn-del"
                            type="danger" size="mini" icon="el-icon-delete"></el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="校区名称" width=""></el-table-column>
                <el-table-column prop="openDate" label="创办时间" width=""></el-table-column>
                <el-table-column prop="closeDate" label="停办时间" width=""></el-table-column>
                <el-table-column prop="leaderName" label="负责人" width=""></el-table-column>
                <el-table-column prop="seq" label="排列序号" width=""></el-table-column>
            </el-table>
        </el-main>
        <el-dialog :title="dialogMark=='add'?'添加校区':'编辑校区'" :visible.sync="dialogVisible">
            <el-form :model="addCampusForm" label-width="100px" label-position="right" size="small">
                <el-form-item label="校区名称">
                    <el-input v-model="addCampusForm.name"></el-input>
                </el-form-item>
                <el-form-item label="创办时间">
                    <el-date-picker v-model="addCampusForm.openDate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="停办日期">
                    <el-date-picker v-model="addCampusForm.colseDate" value-format="yyyy-MM-dd" type="date" placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="负责人姓名">
                    <el-input v-model="addCampusForm.leaderName"></el-input>
                </el-form-item>
                <el-form-item label="排列序号">
                    <el-input v-model="addCampusForm.seq"></el-input>
                </el-form-item>
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
        queryCampus,
        addCampus,
        editCampus,
        delCampus
    } from '@/api/campus'
	import { Loading } from 'element-ui';
    export default {
        data() {
            return {
                dialogVisible: false,
                dialogMark: "",
                //新增校区表单提交 
                addCampusForm: {
                    "name": "",
                    "openDate": "",
                    "colseDate": "",
                    "leaderName": "",
                    "seq": ""
                },
                //校区列表 
                campusData: [],
                // 选中的校区列表
                multipleSelection: [],
            }
        },
        mounted() {
            this.queryCampusAction();
        },
        methods: {
            //查询校区
            queryCampusAction() {
                queryCampus().then(response => {
                    const data = response.data;
                    if (data.ret === 0) {
                        console.log('queryCampus', data);
                    }
                    this.campusData = data.dataList;
                }).catch(err => {
                    console.error(err);
                })
            },
            addCampusClick() {
                this.dialogMark = "add";
                this.addCampusForm = {
                    "name": "",
                    "openDate": "",
                    "colseDate": "",
                    "leaderName": "",
                    "seq": ""
                };
                this.dialogVisible = true;
            },
            submitBtnClick() {
                console.log(this.dialogMark)
                if (this.dialogMark == 'add') {
                    this.addCampusFormSubmit()
                } else if (this.dialogMark == 'edit') {
                    this.editCampusAction();
                }
            },
            addCampusFormSubmit() {
                _log('校区表单提交', this.addCampusForm);
                addCampus(this.addCampusForm).then(response => {
                    const data = response.data;
                    console.log('addCampus', data);
                    if (data.ret === 0) {
                        this.$message({
                            message: '校区创建成功',
                            type: 'success'
                        });
                        this.dialogVisible = false;
                        this.queryCampusAction();
                    }

                }).catch(err => {
                    console.error(err);
                })

            },
            editCampusClick(scope) {
                this.dialogMark = "edit"
                this.addCampusForm = scope.row
                this.dialogVisible = true;
            },
            editCampusAction() {
                editCampus(this.addCampusForm).then(response => {
                    const data = response.data;
                    console.log('editCampus', data);
                    if (data.ret === 0) {
                        this.$message({
                            message: '校区修改成功',
                            type: 'success'
                        });
                        this.dialogVisible = false;
                        this.queryCampusAction();
                    }

                }).catch(err => {
                    console.error(err);
                })
            },
            delCampusBtnClick() {
                var ids = [];
                this.multipleSelection.forEach((item, i) => {
                    ids.push(item.campusId);
                });
								if (ids.length==0){
									this.$message({
										message: '请选择一条记录',
										type: 'warning'
									});
									return;
								}
                this.delCampusAction(ids)
            },
            delCampusClick(scope) {
                const ids = scope.row.campusId;
                this.delCampusAction([ids])
            },
            delCampusAction(ids) {
                console.log('要删除的id', ids);
                this.$confirm('此操作将删除这条记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    delCampus({
                        ids: ids
                    }).then(response => {
                        const data = response.data;
                        console.log('delCampus', data);
                        if (data.ret === 0) {
                            this.$message({
                                message: '校区删除成功',
                                type: 'success'
                            });
                            this.dialogVisible = false;
                            this.queryCampusAction();
                        }

                    }).catch(err => {
                        console.error(err);
                    })
                }).catch(() => {

                });

            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                _log('选中的校区列表', val)
            },
			testClick(){
				let loadingInstance = Loading.service({
				  lock: true,
				  text: '正在加载...', 
				  background: 'rgba(0, 0, 0, 0.5)'
				});
				setTimeout(()=>{
					loadingInstance.close()
				},1000)
			}
        }
    }
</script>

<style>
    .el-header {
        line-height: 60px;
    }
</style>
