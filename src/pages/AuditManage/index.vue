<!--审核事项-->
<template>
	<div class="container">
		<el-header>审核事项</el-header>
		<el-main>
			<el-form :model="queryAuditForm" :inline="true" size="small">
				<el-form-item label="事项分类">
					<el-select v-model="queryAuditForm.auditType" placeholder="">
						<el-option label="全部" :value="null"></el-option>
						<el-option label="补录审核" :value="1"></el-option>
						<el-option label="身份审核" :value="2"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="状态审核">
					<el-select v-model="queryAuditForm.verifyResult" placeholder="">
						<el-option label="全部" :value="null"></el-option>
						<el-option label="待审核" :value="0"></el-option>
						<el-option label="审核通过" :value="1"></el-option>
						<el-option label="审核不通过" :value="2"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item size="small">
					<el-button type="primary" @click="queryAction">查询</el-button>
				</el-form-item>
			</el-form>
			<el-table @selection-change="handleSelectionChange" height="480" :data="dataList" border stripe size="small">
				<el-table-column prop="auditTypeDesc" label="事项分类" width=""></el-table-column>
				<el-table-column prop="campusName" label="所属校区" width=""></el-table-column>
				<el-table-column prop="gradeName" label="学届" width=""></el-table-column>
				<el-table-column prop="className" label="班级" width=""></el-table-column>
				<el-table-column prop="stuName" label="姓名" width=""></el-table-column>
				<el-table-column prop="verifyResultDesc" label="审核状态" width=""></el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button v-if="scope.row.verifyResultDesc=='待审核'" @click="editClick(scope)" type="danger" size="mini">审核</el-button>
						<el-button v-else @click="editClick(scope)" type="primary" size="mini">详情</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination" style="margin-top: 10px;">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 30]" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
		</el-main>

		<!--审核弹窗-->
		<el-dialog @open="switchValue=false" title="编辑记录" :visible.sync="dialogVisible">
			<el-form :model="editForm" label-width="100px" label-position="right" size="small">
				<el-row>
					<el-col :span="12">
						<el-form-item label="所属校区">
							<el-input disabled v-model="editForm.campusName"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="学届">
							<el-input disabled v-model="editForm.gradeName"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="班级">
							<el-input disabled v-model="editForm.className"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="姓名">
							<el-input disabled v-model="editForm.stuName"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="性别">
							<el-input disabled v-model="editForm.sexName"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="手机">
							<el-input disabled v-model="editForm.phone"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="审核状态">
							<el-input disabled v-model="editForm.verifyResultDesc"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="外号">
							<el-input disabled v-model="editForm.nickname"></el-input>
						</el-form-item>
					</el-col>

					<el-col :span="12">
						<el-form-item label="邮箱">
							<el-input disabled v-model="editForm.txt"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="工作单位">
							<el-input disabled v-model="editForm.txt"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="居住地址">
							<el-input disabled v-model="editForm.txt" type="textarea"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="教育经历">
							<el-input disabled v-model="editForm.txt" type="textarea"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="工作经验">
							<el-input disabled v-model="editForm.txt" type="textarea"></el-input>
						</el-form-item>
					</el-col>
					<el-col v-if="dialogMark == '待审核'" :span="24">
						<el-form-item label="审核结果">
							<el-switch v-model="switchValue" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
							<span style="margin-left: 10px;">{{ switchValue ? '通过' : '拒绝' }}</span>
						</el-form-item>
					</el-col>
					<el-col v-if="!switchValue && (editForm.verifyResultDesc == '审核未通过'||editForm.verifyResultDesc == '待审核')" :span="24">
						<el-form-item label="拒绝原因">
							<el-input :disabled="dialogMark != '待审核'" v-model="editForm.denyReason" type="textarea"></el-input>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<span slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogVisible = false">取 消</el-button>
                <el-button v-if="dialogMark == '待审核'" size="small" type="primary" @click="auditAction(editForm.eventId,editForm.denyReason)">提 交</el-button>
            </span>
		</el-dialog>
	</div>
</template>

<script>
	import { queryAudit, commitAuditPass, commitAuditDeny } from '@/api/audit'

	export default {
		data() {
			return {
				dialogVisible: false,
				dialogMark: "",
				switchValue: false,
				// 查询
				queryAuditForm: {
					pageNum: 1,
					pageSize: 10,
					verifyResult: null,
					auditType: null
				},
				// 新增
				editForm: {},
				// 删除
				delTestForm: {

				},
				// 选中的学届
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
			// 每页显示条数改变触发
			handleSizeChange(val) {
				console.log(`SizeChange 每页 ${val} 条`);
				this.queryAuditForm.pageSize = val;
				this.queryAction();
			},
			// 当前页改变触发
			handleCurrentChange(val) {
				console.log(`CurrentChange 当前页: ${val}`);
				this.queryAuditForm.pageNum = val;
				this.queryAction();
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
				_log('选中的列表', val)
			},
			// 查询
			queryAction() {
				queryAudit(this.queryAuditForm).then((response => {
					const data = response.data;
					if(data.ret === 0) {
						console.log('查询', this.queryAuditForm, '结果', data);
						this.dataList = data.dataList
						this.total = data.totalCount;
					}
				}))
			},
			editClick(scope) {
				this.dialogVisible = true;
				this.editForm = scope.row;
				this.dialogMark = this.editForm.verifyResultDesc

			},
			auditAction(eventId, denyReason) {
				console.log('审核id', eventId);

				if(this.switchValue) {
					commitAuditPass(eventId).then((response) => {
						const data = response.data;
						console.log('审核', data)
						if(data.ret === 0) {
							this.$message({
								message: '操作成功',
								type: 'success'
							});
							this.dialogVisible = false;
							this.queryAction();
						}
					});
				} else {
					commitAuditDeny(eventId, denyReason).then((response) => {
						const data = response.data;
						console.log('审核', data)
						if(data.ret === 0) {
							this.$message({
								message: '操作成功',
								type: 'success'
							});
							this.dialogVisible = false;
							this.queryAction()
						}
					});
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