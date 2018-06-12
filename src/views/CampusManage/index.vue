<!--校区管理-->
<template>
    <div class="container">
        <el-header>校区管理</el-header>
        <el-main>
            <el-form size="small">
                <el-form-item size="small">
                    <el-button @click="dialogVisible = true" type="primary">新增</el-button>
                    <el-button>删除</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="campusData" @selection-change="handleSelectionChange" border stripe size="small">
                <el-table-column type="selection" width="40"></el-table-column>
                <el-table-column label="操作" width="80">
                    <template slot-scope="scope">
                        <!--<span><i class="el-icon-edit"></i></span>-->
                        <!--<span><i class="el-icon-delete"></i></span>-->
                        <el-button style="color: #409EFF;padding: 5px;background-color: initial;border: initial;" type="primary" size="mini" icon="el-icon-edit"></el-button>
                        <el-button style="color: #f56c6c;padding: 5px;background-color: initial;border: initial;"  type="danger" size="mini" icon="el-icon-delete"></el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="campusName" label="校区名称" width=""></el-table-column>
                <el-table-column prop="openDate" label="创办时间" width=""></el-table-column>
                <el-table-column prop="colseDate" label="停办时间" width=""></el-table-column>
                <el-table-column prop="leaderName" label="负责人" width=""></el-table-column>
                <el-table-column prop="seq" label="排列序号" width=""></el-table-column>
            </el-table>
        </el-main>
        <el-dialog title="添加记录" :visible.sync="dialogVisible" width="30%">
            <el-form :model="addCampusForm" label-width="100px" :inline="true" label-position="right" size="small">
                <el-form-item label="小区名称">
                    <el-input v-model="addCampusForm.campusName"></el-input>
                </el-form-item>
                <el-form-item label="创办时间">
                    <el-date-picker v-model="addCampusForm.openDate" type="date" placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="停办日期">
                    <el-date-picker v-model="addCampusForm.colseDate" type="date" placeholder="选择日期">
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
                <el-button size="small" type="primary" @click="addCampusFormSubmit">提 交</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                dialogVisible: false,
                //新增校区表单提交 
                addCampusForm: {
                    "campusName": "A校区",
                    "openDate": "1938-01-01",
                    "colseDate": "1948-01-01",
                    "leaderName": "校区负责人",
                    "seq": 1
                },
                //校区列表 
                campusData: [{
                    "campusName": "A校区",
                    "openDate": "1938-01-01",
                    "colseDate": "1948-01-01",
                    "leaderName": "校区负责人",
                    "seq": 1
                }, {
                    "campusName": "A校区",
                    "openDate": "1938-01-01",
                    "colseDate": "1948-01-01",
                    "leaderName": "校区负责人",
                    "seq": 1
                }],
                // 选中的校区列表
                multipleSelection: [],
            }
        },
        methods: {
            addCampusFormSubmit() {
                _log('添加校区表单提交', this.addCampusForm);
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                _log('选中的校区列表', val)
            }
        }
    }
</script>

<style>
    .el-header {
        line-height: 60px;
    }
</style>
