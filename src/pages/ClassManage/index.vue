<!--班级管理-->
<template>
	<div class="container">
		<el-header>班级管理</el-header>
		<el-main>
			<el-form :model="queryClassForm" :inline="true" size="small">
				<el-form-item label="校区">
					<el-select v-model="queryClassForm.campusId" placeholder="请选择校区">
						<el-option label="全部" :value="null"></el-option>
						<el-option v-for="(item,i) in campusList" :label="item.campusName" :value="item.campusId"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="学届">
					<el-select v-model="queryClassForm.gradeId" placeholder="请选择学届">
						<el-option label="全部" :value="null"></el-option>
						<el-option v-for="(item,i) in gradeList" :label="item.gradeName" :value="item.gradeId"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="班级(班)">
					<el-input v-model="queryClassForm.className"></el-input>
				</el-form-item>
				<el-form-item label="班主任">
					<el-input v-model="queryClassForm.tchName"></el-input>
				</el-form-item>
				<el-form-item size="small">
					<el-button type="primary" @click="queryClassAction">查询</el-button>
					<el-button type="success" @click="addClassBtnClick">新增</el-button>
					<el-button type="danger" @click="delClassBtnClick">删除</el-button>
				</el-form-item>
			</el-form>
			<el-table @selection-change="handleSelectionChange" height="400" :data="tableData" border stripe size="small">
				<el-table-column type="selection" width="40"></el-table-column>
				<el-table-column label="操作" width="80">
					<template slot-scope="scope">
						<el-button @click="editClassClick(scope)" class="icon-btn-edit" style="" type="primary" size="mini" icon="el-icon-edit"></el-button>
						<el-button @click="delClassClick(scope)" class="icon-btn-del" type="danger" size="mini" icon="el-icon-delete"></el-button>
					</template>
				</el-table-column>
				<el-table-column prop="campusId" label="所属校区" width=""></el-table-column>
				<el-table-column prop="gradeId" label="学届" width=""></el-table-column>
				<el-table-column prop="className" label="班级" width=""></el-table-column>
				<el-table-column prop="tchName" label="班主任" width=""></el-table-column>
			</el-table>
			<div class="pagination" style="margin-top: 10px;">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
		</el-main>
		<!--新增编辑框-->
		<el-dialog :title="dialogMark=='add'?'添加班级':'编辑班级'" :visible.sync="dialogVisible">
			<el-form :model="editClassForm" ref="editClassForm" label-width="100px" label-position="right" size="small">
				<el-form-item label="所属校区">
					<el-select v-model="editClassForm.campusId" placeholder="请选择校区">
						<el-option label="全部" :value="null"></el-option>
						<el-option v-for="(item,i) in campusList" :label="item.campusName" :value="item.campusId"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="学届">
					<el-select v-model="editClassForm.gradeId" placeholder="请选择学届">
						<el-option label="全部" :value="null"></el-option>
						<el-option v-for="(item,i) in gradeList" :label="item.gradeName" :value="item.gradeId"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="班级" prop="className" :rules="[{ required: true, message: '班级不能为空'}]">
					<el-input placeholder="必填" v-model="editClassForm.className"></el-input>
				</el-form-item>
				<el-form-item label="班主任">
					<el-input v-model="editClassForm.tchName"></el-input>
				</el-form-item>
				<el-form-item label="班级寄语">
					<el-input type="textarea" v-model="editClassForm.message"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogVisible = false">取 消</el-button>
                <el-button size="small" type="primary" @click="submitBtnClick('editClassForm')">提 交</el-button>
            </span>
		</el-dialog>
	</div>
</template>

<script>
	import {
		queryClass,
		addClass,
		editClass,
		delClass
	} from '@/api/class'

	import {
		queryCampus
	} from '@/api/campus'

	import {
		queryGrade
	} from '@/api/grade'
	export default {
		data() {
			return {
				dialogVisible: false,
				dialogMark: "",
				// 查询
				queryClassForm: {
					"campusId": null,
					"gradeId": null,
					"className": null,
					"tchName": null
				},
				// 新增 编辑
				editClassForm: {
					"campusId": "",
					"gradeId": "",
					"className": "",
					"tchName": "",
					"message": ""
				},
				// 删除班级
				delClassForm: {

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
			}
		},
		computed: {
			tableData() {
				return this.dataList.slice(this.curPage * this.pageSize - this.pageSize, this.curPage * this.pageSize)
			}
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
			this.queryClassAction();
		},
		methods: {
			// 每页显示条数改变触发
			handleSizeChange(val) {
				console.log(`SizeChange 每页 ${val} 条`);
				this.pageSize = val;
			},
			// 当前页改变触发
			handleCurrentChange(val) {
				console.log(`CurrentChange 当前页: ${val}`);
				this.curPage = val;
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
				_log('选中的列表', val)
			},
			// 查询
			queryClassAction() {
				queryClass(this.queryClassForm).then(response => {
					console.log('查询班级', this.queryClassForm, response.data);
					const data = response.data;
					if(data.ret === 0) {
						this.dataList = data.dataList;
						this.total = data.dataList.length;
					}
				})
			},
			// 新增
			addClassBtnClick() {
				this.dialogVisible = true;
				this.dialogMark = 'add';
				this.editClassForm = {
					"campusId": "",
					"gradeId": "",
					"className": "",
					"tchName": "",
					"message": ""
				};
			},
			addClassAction() {
				console.log('添加班级', this.editClassForm)
				addClass(this.editClassForm).then(response => {
					const data = response.data;
					console.log('添加班级', data);
					if(data.ret === 0) {
						this.$message({
							message: '班级添加成功',
							type: 'success'
						});
						this.dialogVisible = false;
						this.queryClassAction();
					}

				})
			},
			// 编辑
			editClassClick(scope) {
				this.dialogVisible = true;
				this.dialogMark = 'edit';
				this.editClassForm = scope.row;
			},
			editClassAction() {
				editClass(this.editClassForm).then(response => {
					const data = response.data;
					console.log('添加班级', data);
					if(data.ret === 0) {
						this.$message({
							message: '编辑成功',
							type: 'success'
						});
						this.dialogVisible = false;
						this.queryClassAction();
					}

				})
			},
			// 删除
			delClassBtnClick() {
				var ids = [];
				this.multipleSelection.forEach((item, i) => {
					ids.push(item.classId);
				});
				if(ids.length == 0) {
					this.$message({
						message: '请选择一条记录',
						type: 'warning'
					});
					return;
				}
				this.delClassAction(ids)
			},
			delClassClick(scope) {
				const ids = scope.row.classId;
				this.delClassAction([ids])
			},
			delClassAction(ids) {
				console.log('要删除的id', ids);
				this.$confirm('此操作将删除这条记录, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					delClass({
						ids: ids
					}).then(response => {
						const data = response.data;
						console.log('delClass', data);
						if(data.ret === 0) {
							this.$message({
								message: '班级删除成功',
								type: 'success'
							});
							this.dialogVisible = false;
							this.queryClassAction();
						}

					})
				})
			},
			submitBtnClick(formName) {
				console.log(this.dialogMark)
				this.$refs[formName].validate((valid) => {
					if(valid) {
						if(this.dialogMark == 'add') {
							this.addClassAction()
						} else if(this.dialogMark == 'edit') {
							this.editClassAction();
						}
					}
				});
				return;

			},

		},
	}
</script>

<style>
	.el-header {
		line-height: 60px;
	}
</style>