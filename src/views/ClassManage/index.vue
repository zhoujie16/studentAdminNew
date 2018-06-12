<!--班级管理-->
<template>
    <div class="container">
        <el-header>班级管理</el-header>
        <el-main>
            <el-form :model="queryClassForm" :inline="true" size="small">
                <el-form-item label="校区">
                    <el-select v-model="queryClassForm.campusId" placeholder="请选择校区">
                        <el-option label="全部" value=""></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="学届">
                    <el-select v-model="queryClassForm.gradeYear" placeholder="请选择学届">
                        <el-option label="全部" value=""></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="班级(班)">
                    <el-input v-model="queryClassForm.className"></el-input>
                </el-form-item>
                <el-form-item label="班主任">
                    <el-input v-model="queryClassForm.headTeacherName"></el-input>
                </el-form-item>
                <el-form-item size="small">
                    <el-button type="primary" @click="queryClassAction">查询</el-button>
                    <el-button type="success" @click="dialogVisible = true">新增</el-button>
                    <el-button type="danger" @click="delClassAction">删除</el-button>
                </el-form-item>
            </el-form>
            <el-table @selection-change="handleSelectionChange" height="400" :data="classData" border stripe size="small">
                <el-table-column type="selection" width="40"></el-table-column>
                <el-table-column label="操作" width="50">
                    <template slot-scope="scope">
                        <i class="el-icon-delete"></i>
                        <i class="el-icon-delete"></i>
                    </template>
                </el-table-column>
                <el-table-column prop="campusId" label="所属校区" width=""></el-table-column>
                <el-table-column prop="gradeYear" label="学届" width=""></el-table-column>
                <el-table-column prop="className" label="班级" width=""></el-table-column>
                <el-table-column prop="headTeacherName" label="班主任" width=""></el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 40]" :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper" :total="400">
                </el-pagination>
            </div>
        </el-main>
        <!--新增编辑框-->
        <el-dialog title="添加记录" :visible.sync="dialogVisible">
            <el-form :model="addClassForm" label-width="100px" label-position="right" size="small">
                <el-form-item label="所属校区">
                    <el-select v-model="addClassForm.campusId" placeholder="请选择校区">
                        <el-option label="全部" value=""></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="学届">
                    <el-select v-model="addClassForm.gradeYear" placeholder="请选择学届">
                        <el-option label="全部" value=""></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="班级">
                    <el-input v-model="addClassForm.className"></el-input>
                </el-form-item>
                <el-form-item label="班主任">
                    <el-input v-model="addClassForm.headTeacherName"></el-input>
                </el-form-item>
                <el-form-item label="班级寄语">
                    <el-input type="textarea" v-model="addClassForm.headTeacherName"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogVisible = false">取 消</el-button>
                <el-button size="small" type="primary" @click="addClassAction">提 交</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                dialogVisible: false,
                // 查询班级
                queryClassForm: {
                    "pageNum": 1,
                    "pageSize": 20,
                    "campusId": 2,
                    "gradeYear": 1999,
                    "className": "103班",
                    "headTeacherName": "陈老师"
                },
                // 新增班级
                addClassForm: {
                    "startGrade": "",
                    "endGrade": ""
                },
                // 删除班级
                delClassForm: {

                },
                // 选中的学届
                multipleSelection: [],
                classData: [{
                    "pageNum": 1,
                    "pageSize": 20,
                    "campusId": 2,
                    "gradeYear": 1999,
                    "className": "103班",
                    "headTeacherName": "陈老师"
                }, {
                    "pageNum": 1,
                    "pageSize": 20,
                    "campusId": 2,
                    "gradeYear": 1999,
                    "className": "103班",
                    "headTeacherName": "陈老师"
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
            handleSelectionChange(val) {
                this.multipleSelection = val;
                _log('选中的学届列表', val)
            },
            // 查询学届
            queryClassAction() {
                _log('查询学届');
            },
            // 新增学届
            addClassAction() {
                _log('新增学届');
            },
            // 删除学届
            delClassAction() {
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
