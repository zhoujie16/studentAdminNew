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
            <el-form :model="queryForm" :inline="true" size="small">
                <el-form-item label="系统账号">
                    <el-select v-model="queryForm.campusId" placeholder="请选择">
                        <el-option label="全部" :value="null"></el-option>
                        <!--<el-option v-for="(item,i) in campusList" :label="item.campusName" :value="item.campusId"></el-option>-->
                    </el-select>
                </el-form-item>
                <el-form-item label="账号状态">
                    <el-select v-model="queryForm.gradeYear" placeholder="请选择">
                        <el-option label="全部" :value="null"></el-option>
                        <!--<el-option v-for="(item,i) in gradeList" :label="item.gradeName" :value="item.gradeYear"></el-option>-->
                    </el-select>
                </el-form-item>
                queryForm
                <el-input v-model="queryStudentForm.className"></el-input>
                </el-form-item>

                <el-form-item size="small">
                    <el-button type="primary" @click="queryBtnClick">查询</el-button>
                    <el-button type="success" @click="addBtnClick">新增</el-button>
                    <el-button type="danger" @click="delBtnClick">删除</el-button>
                </el-form-item>
            </el-form>
            <el-table @selection-change="handleSelectionChange" height="400" :data="dataList" border stripe size="small">
                <el-table-column type="selection" width="40"></el-table-column>
                <el-table-column label="操作" width="80">
                    <template slot-scope="scope">
                        <el-button @click="delTableClick(scope)" class="icon-btn-edit" style="" type="primary" size="mini" icon="el-icon-edit"></el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="campusName" label="所属校区" width=""></el-table-column>
                <el-table-column prop="gradeName" label="学届" width=""></el-table-column>
                <el-table-column prop="className" label="班级" width=""></el-table-column>
                <el-table-column prop="stuName" label="姓名" width=""></el-table-column>
                <el-table-column label="状态" width="">
                    <template slot-scope="scope">
                        {{scope.row.activeStatus==1?'已激活':'未激活'}}
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
        <!--<el-dialog :title="dialogMark=='add'?'添加记录':'编辑记录'" :visible.sync="dialogVisible">
            <el-form :model="editStudentForm" ref="editStudentForm" label-width="100px" label-position="right" size="small">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="所属校区">
                            <el-select @change="editCampusChange" v-model="editStudentForm.campusName" placeholder="请选择校区">
                                <el-option v-for="(item,i) in campusList" :label="item.campusName" :value="item.campusName"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="学届">
                            <el-select @change="editGradeChange" v-model="editStudentForm.gradeYear" placeholder="请选择学届">
                                <el-option v-for="(item,i) in gradeList" :label="item.gradeName" :value="item.gradeYear"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="班级">
                            <el-select v-model="editStudentForm.classId" placeholder="请选择班级">
                                <el-option v-for="(item,i) in classList" :label="item.className" :value="item.classId"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="姓名">
                            <el-input v-model="editStudentForm.stuName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="性别">
                            <el-select v-model="editStudentForm.sex" placeholder="请选择学届">
                                <el-option label="女" :value="0"></el-option>
                                <el-option label="男" :value="1"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="外号">
                            <el-input v-model="editStudentForm.nickname"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="手机">
                            <el-input disabled v-model="editStudentForm.txt"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="邮箱">
                            <el-input disabled v-model="editStudentForm.txt"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="工作单位">
                            <el-input disabled type="textarea" v-model="editStudentForm.txt"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="居住地址">
                            <el-input disabled type="textarea" v-model="editStudentForm.txt"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="教育经历">
                            <el-input disabled type="textarea" v-model="editStudentForm.txt"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="工作经验">
                            <el-input disabled type="textarea" v-model="editStudentForm.txt"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogVisible = false">取 消</el-button>
                <el-button size="small" type="primary" @click="submitBtnClick">提 交</el-button>
            </span>
        </el-dialog>-->
    </div>
</template>

<script>
    import axios from 'axios'
    import data from '@/api/user';
    export default {
        data() {
            return {
                dialogVisible: false,
                dialogMark: "",
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

        },
        methods: {
            queryBtnClick() {

            },
            addBtnClick() {

            },
            delBtnClick() {

            },
			delTableClick(){
				
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
				this.queryStudentForm.pageNum = val;
				this.queryAction();
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
				_log('选中的', val)
			},
			queryAction(){
				
			}
        }
    }
</script>

<style>

</style>
