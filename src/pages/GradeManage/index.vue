<!--学届管理-->
<template>
	<div class="container">
		<el-header>学届管理</el-header>
		<el-main>
			<el-form :model="queryGradeForm" :inline="true" size="small">
				<el-form-item label="开始学届">
					<el-date-picker value-format="yyyy" v-model="queryGradeForm.startGrade" type="year" placeholder="选择年"></el-date-picker>
				</el-form-item>
				<el-form-item label="结束学届">
					<el-date-picker value-format="yyyy" v-model="queryGradeForm.endGrade" type="year" placeholder="选择年"></el-date-picker>
				</el-form-item>
				<el-form-item size="small">
					<el-button type="primary" @click="queryGradeAction">查询</el-button>
					<el-button type="success" @click="addGradeBtnClick">新增</el-button>
					<el-button type="danger" @click="delGradeBtnClick">删除</el-button>
				</el-form-item>
			</el-form>
			<el-table @selection-change="handleSelectionChange" height="480" :data="tableData" border stripe size="small">
				<el-table-column type="selection" width="40"></el-table-column>
				<el-table-column label="操作" width="50">
					<template slot-scope="scope">
						<el-button @click="delGradeClick(scope)" class="icon-btn-del" type="danger" size="mini" icon="el-icon-delete"></el-button>
					</template>
				</el-table-column>
				<el-table-column prop="gradeName" label="学届名称" width=""></el-table-column>
			</el-table>
			<div class="pagination" style="margin-top: 10px;">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
		</el-main>
		<el-dialog title="添加记录" :visible.sync="dialogVisible">
			<el-form :model="editGradeForm" label-width="100px" label-position="right" size="small">
				<el-form-item label="学届开始">
					<el-date-picker value-format="yyyy" v-model="editGradeForm.startGrade" type="year" placeholder="选择年"></el-date-picker>
				</el-form-item>
				<el-form-item label="学届结束">
					<el-date-picker value-format="yyyy" v-model="editGradeForm.endGrade" type="year" placeholder="选择年"></el-date-picker>
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
	import {
		queryGrade,
		addGrade,
		editGrade,
		delGrade
	} from '@/api/grade'

	export default {
		data() {
			return {
				dialogVisible: false,
				dialogMark: "",
				// 查询学届
				queryGradeForm: {
					"startGrade": null,
					"endGrade": null
				},
				// 新增学届
				editGradeForm: {
					"startGrade": "",
					"endGrade": ""
				},
				// 选中的学届
				multipleSelection: [],
				//tableData:[],
				//分页相关
				dataList: [],
				total:0,
				curPage:1,
				pageSize:10,

			}
		},
		computed:{
			tableData(){
				return this.dataList.slice(this.curPage*this.pageSize-this.pageSize,this.curPage*this.pageSize)
			}
		},
		mounted() {
			this.queryGradeAction()
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
				_log('选中的学届列表', val)
			},
			// 查询学届
			queryGradeAction() {
				console.log('查询学届', this.queryGradeForm);
				queryGrade(this.queryGradeForm).then(response => {
					console.log('查询学届', response.data);
					const data = response.data;
					if(data.ret === 0) {
						this.dataList = data.dataList;
						this.total = data.dataList.length;
					}
				})
			},
			// 新增学届
			addGradeBtnClick() {
				this.dialogVisible = true;
				this.editGradeForm = {
					"startGrade": "",
					"endGrade": ""
				};
			},
			addGradeAction() {
				_log('新增学届', this.editGradeForm);
				addGrade(this.editGradeForm).then(response => {
					console.log('新增学届', response);
					const data = response.data;
					if(data.ret === 0) {
						this.$message({
							message: '学届添加创建成功',
							type: 'success'
						});
						this.dialogVisible = false;
						this.queryGradeAction();
					}
				})
			},
			// 删除学届
			delGradeBtnClick(){
				var ids = [];
				this.multipleSelection.forEach((item, i) => {
					ids.push(item.gradeYear);
				});
				if(ids.length == 0) {
					this.$message({
						message: '请选择一条记录',
						type: 'warning'
					});
					return;
				}
				this.delGradeAction(ids);
			},
			delGradeClick(scope){
				const ids = scope.row.gradeYear;
                this.delGradeAction([ids])
			},
			delGradeAction(ids) {
				console.log('要删除的id', ids);
                this.$confirm('此操作将删除这条记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    delGrade({
                        ids: ids
                    }).then(response => {
                        const data = response.data;
                        console.log('delGrade', data);
                        if (data.ret === 0) {
                            this.$message({
                                message: '学届删除成功',
                                type: 'success'
                            });
                            this.dialogVisible = false;
                            this.queryGradeAction();
                        }

                    })
                })
				
			}

		},
	}
</script>

<style>
	.el-header {
		line-height: 60px;
	}
</style>