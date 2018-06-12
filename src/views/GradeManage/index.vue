<!--学届管理-->
<template>
    <div class="container">
        <el-header>学届管理</el-header>
        <el-main>
            <el-form :model="queryGradeForm" :inline="true" size="small">
                <el-form-item label="开始学届">
					<el-date-picker v-model="queryGradeForm.startGrade" type="year" placeholder="选择年"></el-date-picker>
                </el-form-item>
                <el-form-item label="结束学届">
					<el-date-picker v-model="queryGradeForm.endGrade" type="year" placeholder="选择年"></el-date-picker>
                </el-form-item>
                <el-form-item size="small">
                    <el-button type="primary" @click="queryGradeAction">查询</el-button>
                    <el-button type="success" @click="dialogVisible = true">新增</el-button>
                    <el-button type="danger" @click="delGradeAction">删除</el-button>
                </el-form-item>
            </el-form>
            <el-table @selection-change="handleSelectionChange" height="400" :data="campusData" border stripe size="small">
                <el-table-column type="selection" width="40"></el-table-column>
                <el-table-column label="操作" width="50">
                    <template slot-scope="scope">
                        <i class="el-icon-delete"></i>
                    </template>
                </el-table-column>
                <el-table-column prop="gradeName" label="学届名称" width=""></el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 40]"
                    :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
                </el-pagination>
            </div>
        </el-main>
        <el-dialog title="添加记录" :visible.sync="dialogVisible">
            <el-form :model="addGradeForm" label-width="100px" :inline="true" label-position="right" size="small">
                <el-form-item label="学届开始">
                    <el-date-picker v-model="addGradeForm.startGrade" type="year" placeholder="选择年"></el-date-picker>
                </el-form-item>
                <el-form-item label="学届结束">
                    <el-date-picker v-model="addGradeForm.endGrade" type="year" placeholder="选择年"></el-date-picker>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogVisible = false">取 消</el-button>
                <el-button size="small" type="primary" @click="addGradeAction">提 交</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                dialogVisible: false,
                // 查询学届
                queryGradeForm: {
                    "startGrade": "",
                    "endGrade": ""
                },
                // 新增学届
                addGradeForm: {
                    "startGrade": "",
                    "endGrade": ""
                },
                // 删除学届
                delGradeForm: {

                },
				// 选中的学届
				multipleSelection:[],
                campusData: [{
                    "gradeName": "2009"
                }, {
                    "gradeName": "2009"
                }, {
                    "gradeName": "2009"
                }, {
                    "gradeName": "2009"
                }, {
                    "gradeName": "2009"
                }]

            }
        },
        methods: {
			// 每页显示条数改变触发
            handleSizeChange(val) {
                console.log(`SizeChange 每页 ${val} 条`);
            },
			// 当前页改变触发
            handleCurrentChange(val) {
                console.log(`CurrentChange 当前页: ${val}`);
            },
			handleSelectionChange(val){
				this.multipleSelection = val;
				_log('选中的学届列表',val)
			},
            // 查询学届
            queryGradeAction() {
                _log('查询学届');
            },
            // 新增学届
            addGradeAction() {
                _log('新增学届');
            },
            // 删除学届
            delGradeAction() {
                _log('删除学届');
            }

        },
    }
</script>

<style>
    .el-header {
        line-height: 60px;
    }
</style>
