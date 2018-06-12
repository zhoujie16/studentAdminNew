<!--校友管理-->
<template>
    <div class="container">
        <el-header>校友管理</el-header>
        <el-main>
            <el-form :model="queryStudentForm" :inline="true" size="small">
                <el-form-item label="校区">
                    <el-select v-model="queryStudentForm.campusId" placeholder="请选择校区">
                        <el-option label="全部" value=""></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="学届">
                    <el-select v-model="queryStudentForm.gradeYear" placeholder="请选择学届">
                        <el-option label="全部" value=""></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="班级(班)">
                    <el-input v-model="queryStudentForm.className"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="queryStudentForm.activeStatus" placeholder="请选择状态">
                        <el-option label="全部" value=""></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="校友姓名">
                    <el-input v-model="queryStudentForm.stuName"></el-input>
                </el-form-item>
                <el-form-item size="small">
                    <el-button type="primary" @click="queryStudentAction">查询</el-button>
                    <el-button type="success" @click="dialogVisible = true">新增</el-button>
                    <el-button type="danger" @click="delStudentAction">删除</el-button>
                </el-form-item>
            </el-form>
            <el-table @selection-change="handleSelectionChange" height="400" :data="studentData" border stripe size="small">
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
                <el-table-column prop="stuName" label="姓名" width=""></el-table-column>
                <el-table-column prop="activeStatus" label="状态" width=""></el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30, 40]" :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper" :total="400">
                </el-pagination>
            </div>
        </el-main>
        <!--新增编辑框-->
        <el-dialog title="添加记录" :visible.sync="dialogVisible">
            <el-form :model="addStudentForm" label-width="100px" label-position="right" size="small">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="所属校区">
                            <el-select v-model="addStudentForm.sel" placeholder="请选择校区">
                                <el-option label="全部" value=""></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="学届">
                            <el-select v-model="addStudentForm.sel" placeholder="请选择学届">
                                <el-option label="全部" value=""></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="班级">
                            <el-select v-model="addStudentForm.sel" placeholder="请选择班级">
                                <el-option label="全部" value=""></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="姓名">
                            <el-input v-model="addStudentForm.txt"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="性别">
                            <el-select v-model="addStudentForm.sel" placeholder="请选择学届">
                                <el-option label="全部" value=""></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="外号">
                            <el-input v-model="addStudentForm.txt"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="手机">
                            <el-input v-model="addStudentForm.txt"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="邮箱">
                            <el-input v-model="addStudentForm.txt"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="工作单位">
                            <el-input type="textarea" v-model="addStudentForm.txt"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="居住地址">
                            <el-input type="textarea" v-model="addStudentForm.txt"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="教育经历">
                            <el-input type="textarea" v-model="addStudentForm.txt"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="工作经验">
                            <el-input type="textarea" v-model="addStudentForm.txt"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogVisible = false">取 消</el-button>
                <el-button size="small" type="primary" @click="addStudentAction">提 交</el-button>
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
                queryStudentForm: {
                    "pageNum": 1,
                    "pageSize": 20,
                    "campusId": 2,
                    "gradeYear": 1999,
                    "className": "103班",
                    "activeStatus": 0,
                    "stuName": "张三"
                },
                // 新增校友
                addStudentForm: {
                    "txt": "",
                    "sel": ""
                },
                // 删除校友
                delStudentForm: {

                },
                // 选中的学届
                multipleSelection: [],
                studentData: [{
                    "pageNum": 1,
                    "pageSize": 20,
                    "campusId": 2,
                    "gradeYear": 1999,
                    "className": "103班",
                    "activeStatus": 0,
                    "stuName": "张三"
                }, {
                    "pageNum": 1,
                    "pageSize": 20,
                    "campusId": 2,
                    "gradeYear": 1999,
                    "className": "103班",
                    "activeStatus": 0,
                    "stuName": "张三"
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
            queryStudentAction() {
                _log('查询学届');
            },
            // 新增学届
            addStudentAction() {
                _log('新增学届');
            },
            // 删除学届
            delStudentAction() {
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
