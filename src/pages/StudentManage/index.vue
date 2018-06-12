<!--校友管理-->
<template>
	<div class="container">
		<el-header>校友管理</el-header>
		<el-main>
			<el-form :model="queryStudentForm" :inline="true" size="small">
				<el-form-item label="校区">
					<el-select v-model="queryStudentForm.campusId" placeholder="请选择校区">
						<el-option label="全部" :value="null"></el-option>
						<el-option v-for="(item,i) in campusList" :label="item.campusName" :value="item.campusId"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="学届">
					<el-select v-model="queryStudentForm.gradeYear" placeholder="请选择学届">
						<el-option label="全部" :value="null"></el-option>
						<el-option v-for="(item,i) in gradeList" :label="item.gradeName" :value="item.gradeYear"></el-option>
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
					<el-button type="success" @click="addStudentBtnClick">新增</el-button>
					<el-button type="danger" @click="delStudentBtnClick">删除</el-button>
					<!--<el-button type="danger" @click="test">删除</el-button>-->
				</el-form-item>
			</el-form>
			<el-table @selection-change="handleSelectionChange" height="400" :data="tableData" border stripe size="small">
				<el-table-column type="selection" width="40"></el-table-column>
				<el-table-column label="操作" width="80">
					<template slot-scope="scope">
						<el-button @click="editStudentClick(scope)" class="icon-btn-edit" style="" type="primary" size="mini" icon="el-icon-edit"></el-button>
						<el-button @click="delStudentClick(scope)" class="icon-btn-del" type="danger" size="mini" icon="el-icon-delete"></el-button>
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
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30]" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
		</el-main>
		<!--新增编辑框-->
		<el-dialog :title="dialogMark=='add'?'添加记录':'编辑记录'" :visible.sync="dialogVisible">
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
		</el-dialog>
	</div>
</template>

<script>
	import {
		queryCampus
	} from '@/api/campus'

	import {
		queryGrade
	} from '@/api/grade'

	import {
		queryStudent,
		addStudent,
		editStudent,
		delStudent
	} from '@/api/student'
	import {
		queryClass
	} from '@/api/class'
	export default {
		data() {
			return {
				dialogVisible: false,
				dialogMark: "",
				// 查询
				queryStudentForm: {
					"pageNum": 1,
					"pageSize": 10,
					"campusId": null,
					"gradeYear": null,
					"className": null,
					"activeStatus": null,
					"stuName": null
				},
				// 新增校友
				editStudentForm: {
					txt: null,
					campusId: null,
					gradeYear: null,
					classId: null,
					stuName: null,
					sex: null,
					activeStatus: null,
					nickname: null
				},
				// 选中的
				multipleSelection: [],
				//分页相关
				dataList: [],
				total: 0,
				curPage: 1,
				pageSize: 10,
				//选项相关
				campusList: [],
				gradeList: [],
				classList: [],
			}
		},
		computed: {
			tableData() {
				//return this.dataList.slice(this.curPage * this.pageSize - this.pageSize, this.curPage * this.pageSize)
				return this.dataList
			}
		},
		watch: {

		},
		mounted() {
			//查询校区
			queryCampus().then(response => {
				const data = response.data;
				if(data.ret === 0) {
					console.log('查询校区', data);
					this.campusList = data.dataList
				}
			})

			//查询学届
			queryGrade(this.queryGradeForm).then(response => {
				console.log('查询学届', response.data);
				const data = response.data;
				if(data.ret === 0) {
					this.gradeList = data.dataList;
				}
			})

			this.queryStudentAction();
		},
		methods: {
			// 每页显示条数改变触发
			handleSizeChange(val) {
				console.log(`SizeChange 每页 ${val} 条`);
				this.queryStudentForm.pageSize = val;
				this.queryStudentAction();
			},
			// 当前页改变触发
			handleCurrentChange(val) {
				console.log(`CurrentChange 当前页: ${val}`);
				this.queryStudentForm.pageNum = val;
				this.queryStudentAction();
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
				_log('选中的', val)
			},
			// 查询
			queryStudentAction() {
				queryStudent(this.queryStudentForm).then(response => {
					console.log('查询', this.queryStudentForm, response.data);
					const data = response.data;
					if(data.ret === 0) {
						this.dataList = data.dataList;
						this.total = data.totalCount;
					}
				})
			},
			// 新增
			addStudentBtnClick() {
				this.dialogVisible = true;
				this.dialogMark = 'add';
				this.editStudentForm = {
					txt: null,
					campusId: null,
					gradeYear: null,
					classId: null,
					stuName: null,
					sex: null,
					activeStatus: null,
					nickname: null
				};
			},
			addStudentAction() {
				console.log('添加', this.editStudentForm)
				addStudent(this.editStudentForm).then(response => {
					const data = response.data;
					console.log('添加', data);
					if(data.ret === 0) {
						this.$message({
							message: '添加校友成功',
							type: 'success'
						});
						this.dialogVisible = false;
						this.queryStudentAction();
					}

				})
			},
			// 编辑
			editStudentClick(scope) {
				this.dialogVisible = true;
				this.dialogMark = 'edit';
				this.editStudentForm = scope.row;
				this.queryClassOption();
			},
			editStudentAction() {
				console.log(this.editStudentForm,this.campusList);
				this.campusList.forEach((item,i)=>{
					if (item.campusName == this.editStudentForm.campusName) {
						console.log('xsss')
						this.editStudentForm.campusId = item.campusId;
					}
				});
				var params = {
					stuId : this.editStudentForm.stuId,
					campusId : this.editStudentForm.campusId,
					gradeYear : this.editStudentForm.gradeYear,
					classId : this.editStudentForm.classId,
					stuName : this.editStudentForm.stuName,
					sex : this.editStudentForm.sex,
					activeStatus : this.editStudentForm.activeStatus,
					nickname : this.editStudentForm.nickname,
					
				}
				editStudent(params).then(response => {
					const data = response.data;
					console.log('添加校友', data);
					if(data.ret === 0) {
						this.$message({
							message: '编辑成功',
							type: 'success'
						});
						this.dialogVisible = false;
						this.queryStudentAction();
					}
				})
			},
			// 删除
			delStudentBtnClick() {
				var ids = [];
				this.multipleSelection.forEach((item, i) => {
					ids.push(item.stuId);
				});
				if(ids.length == 0) {
					this.$message({
						message: '请选择一条记录',
						type: 'warning'
					});
					return;
				}
				this.delStudentAction(ids)
			},
			delStudentClick(scope) {
				const ids = scope.row.stuId;
				this.delStudentAction([ids])
			},
			delStudentAction(ids) {
				console.log('要删除的id', ids);
				this.$confirm('此操作将删除这条记录, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					delStudent({
						ids: ids
					}).then(response => {
						const data = response.data;
						console.log('delStudent', data);
						if(data.ret === 0) {
							this.$message({
								message: '校友删除成功',
								type: 'success'
							});
							this.dialogVisible = false;
							this.queryStudentAction();
						}

					})
				})
			},
			submitBtnClick(formName) {
				console.log(this.dialogMark)
				if(this.dialogMark == 'add') {
					this.addStudentAction()
				} else if(this.dialogMark == 'edit') {
					this.editStudentAction();
				}
				return;
				this.$refs[formName].validate((valid) => {
					if(valid) {
						if(this.dialogMark == 'add') {
							this.addStudentAction()
						} else if(this.dialogMark == 'edit') {
							this.editStudentAction();
						}
					}
				});
				return;

			},
			editCampusChange(val) {
				console.log('校区改变')
				this.editStudentForm.classId = null;
				if(this.editStudentForm.gradeYear) {
					this.queryClassOption();
				}

			},
			editGradeChange(val) {
				console.log('学届改变')
				this.editStudentForm.classId = null;
				if(this.editStudentForm.campusName) {
					this.queryClassOption();
				}
			},
			queryClassOption() {
				var  params = {
					campusId: this.editStudentForm.campusId,
					gradeYear: this.editStudentForm.gradeYear
				}
				this.campusList.forEach((item,i)=>{
					if (item.campusName == this.editStudentForm.campusName) {
						console.log('xsss')
						params.campusId = item.campusId;
					}
				});
				//查询班级
				queryClass(params).then(response => {
					const data = response.data;
					console.log('查询班级', data)
					if(data.ret === 0) {
						this.classList = data.dataList;
						console.log(this.classList)
					}
				});
			},
			test() {

				for(let i = 0; i < 100; i++) {
					addStudent({
						txt: null,
						campusId: 7,
						gradeYear: 1991,
						classId: 21,
						stuName: '测试姓名'+i,
						sex: 0,
						activeStatus: null,
						nickname: '测试外号'+i
					}).then(response => {
						const data = response.data;
						console.log('添加', data);
						if(data.ret === 0) {
							console.log('添加1条记录成功')
						}

					})
				}
			}

		},
	}
</script>

<style>
	.el-header {
		line-height: 60px;
	}
</style>