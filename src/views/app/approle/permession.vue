<template>
	<div class="system-role-dialog-container">
		<el-dialog :title="state.dialog.title" v-model="state.dialog.isShowDialog" :close-on-click-modal="false" draggable>
			<el-tree
				ref="menuTree"
				:data="state.treeData"
				:default-checked-keys="state.checkedKeys"
				:check-strictly="false"
				:props="state.defaultProps"
				class="filter-tree"
				node-key="id"
				highlight-current
				show-checkbox
				default-expand-all
			/>

			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel">取 消</el-button>
					<el-button type="primary" @click="onSubmit">{{ state.dialog.submitTxt }}</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="role-permession">
import { fetchRoleTree, permissionUpd } from '/@/api/app/approle';
import { pageList } from '/@/api/app/appmenu';
import { useMessage } from '/@/hooks/message';
import { Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import other from '/@/utils/other';

const { t } = useI18n();

const menuTree = ref();

const state = reactive({
	checkedKeys: [] as any[],
	treeData: [] as any[],
	defaultProps: {
		label: 'name',
		value: 'id',
	},
	roleId: '',
	dialog: {
		isShowDialog: false,
		title: '分配权限',
		submitTxt: '更新',
	},
});

const checkedKeys: Ref<any[]> = ref([]);

// 打开弹窗
const openDialog = (row: any) => {
	state.checkedKeys = [];
	state.treeData = [];
	checkedKeys.value = [];
	state.roleId = row.roleId;
	fetchRoleTree(row.roleId)
		.then((res) => {
			checkedKeys.value = res.data;
			return pageList();
		})
		.then((r) => {
			state.treeData = r.data;
			state.checkedKeys = other.resolveAllEunuchNodeId(state.treeData, checkedKeys.value, []);
		});
	state.dialog.isShowDialog = true;
};

// 关闭弹窗
const closeDialog = () => {
	state.dialog.isShowDialog = false;
};

// 取消
const onCancel = () => {
	closeDialog();
};

const onSubmit = () => {
	const menuIds = menuTree.value.getCheckedKeys().join(',').concat(',').concat(menuTree.value.getHalfCheckedKeys().join(','));
	permissionUpd(state.roleId, menuIds).then(() => {
		state.dialog.isShowDialog = false;
		useMessage().success(t('common.editSuccessText'));
	});
};

// 暴露变量
defineExpose({
	openDialog,
});
</script>

<style scoped></style>
