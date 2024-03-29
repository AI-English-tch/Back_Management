<template>
	<div class="layout-padding">
		<el-card class="layout-padding-auto" shadow="hover">
			<el-row class="ml10" v-show="showSearch">
				<el-form :inline="true" :model="state.queryForm" @keyup.enter="getDataList" ref="queryRef">
					<el-form-item :label="$t('model.category')" prop="category">
						<el-input :placeholder="$t('model.inputCategoryTip')" style="max-width: 180px" v-model="state.queryForm.category" />
					</el-form-item>
					<el-form-item>
						<el-button @click="getDataList" icon="search" type="primary" v-auth="'oa_model_view'">
							{{ $t('common.queryBtn') }}
						</el-button>
						<el-button @click="resetQuery" icon="Refresh">{{ $t('common.resetBtn') }}</el-button>
					</el-form-item>
				</el-form>
			</el-row>
			<el-row>
				<div class="mb8" style="width: 100%">
					<el-button @click="formDialogRef.openDialog()" class="ml10" icon="folder-add" type="primary" v-auth="'oa_model_add'">
						{{ $t('common.addBtn') }}
					</el-button>
					<el-button :disabled="multiple" @click="handleDelete(selectObjs)" class="ml10" icon="Delete" type="primary" v-auth="'oa_model_del'">
						{{ $t('common.delBtn') }}
					</el-button>
					<right-toolbar
						@queryTable="getDataList"
						class="ml10"
						style="float: right; margin-right: 20px"
						v-model:showSearch="showSearch"
					></right-toolbar>
				</div>
			</el-row>
			<el-table
				:data="state.dataList"
				@selection-change="handleSelectionChange"
				style="width: 100%"
				v-loading="state.loading"
				border
				:cell-style="tableStyle.cellStyle"
				:header-cell-style="tableStyle.headerCellStyle"
			>
				<el-table-column align="center" type="selection" width="40" />
				<el-table-column :label="$t('model.index')" type="index" width="60" />
				<el-table-column :label="$t('model.name')" prop="name" show-overflow-tooltip></el-table-column>
				<el-table-column :label="$t('model.key')" prop="key" show-overflow-tooltip></el-table-column>
				<el-table-column :label="$t('model.category')" prop="category" show-overflow-tooltip></el-table-column>
				<el-table-column :label="$t('model.version')" prop="version" show-overflow-tooltip></el-table-column>
				<el-table-column :label="$t('model.createTime')" prop="createTime" show-overflow-tooltip></el-table-column>
				<el-table-column :label="$t('model.lastUpdateTime')" prop="lastUpdateTime" show-overflow-tooltip></el-table-column>
				<el-table-column :label="$t('common.action')" width="250">
					<template #default="scope">
						<el-button icon="picture" @click="handleView(scope.row.id)" text type="primary" v-auth="'oa_model_view'">模型图 </el-button>
						<el-button icon="video-play" @click="handleDeploy(scope.row.id)" text type="primary" v-auth="'oa_model_add'"> 部署 </el-button>
						<el-button icon="delete" @click="handleDelete([scope.row.id])" text type="primary" v-auth="'oa_model_del'"
							>{{ $t('common.delBtn') }}
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<pagination @current-change="currentChangeHandle" @size-change="sizeChangeHandle" v-bind="state.pagination" />
		</el-card>

		<form-dialog @refresh="getDataList()" ref="formDialogRef" />
	</div>
</template>

<script lang="ts" name="model" setup>
import { BasicTableProps, useTable } from '/@/hooks/table';
import { delObj, deploy, fetchList } from '/@/api/oa/model';
import { useMessage, useMessageBox } from '/@/hooks/message';
import { useI18n } from 'vue-i18n';

// 引入组件
const FormDialog = defineAsyncComponent(() => import('./form.vue'));
const { t } = useI18n();
const router = useRouter();

// 定义变量内容
const formDialogRef = ref();
const queryRef = ref();
const showSearch = ref(true);
// 多选rows
const selectObjs = ref([]) as any;

// 是否可以多选
const multiple = ref(true);

const state: BasicTableProps = reactive<BasicTableProps>({
	queryForm: {
		category: '',
	},
	pageList: fetchList, // H
});

//  table hook
const { getDataList, currentChangeHandle, sizeChangeHandle, tableStyle } = useTable(state);

// 清空搜索条件
const resetQuery = () => {
	queryRef.value.resetFields();
	getDataList();
};

// 多选事件
const handleSelectionChange = (objs: any) => {
	selectObjs.value.push(...objs.map((val: any) => val.id));
	multiple.value = !objs.length;
};

// 删除操作
const handleDelete = async (ids: string[]) => {
	try {
		await useMessageBox().confirm(t('common.delConfirmText'));
	} catch {
		return;
	}

	try {
		await delObj(ids);
		getDataList();
		useMessage().success(t('common.delSuccessText'));
	} catch (err: any) {
		useMessage().error(err.msg);
	}
};
const handleDeploy = (id: string) => {
	deploy(id).then(() => {
		useMessage().success(t('common.optSuccessText'));
	});
};

const handleView = (id: string) => {
	router.push({
		path: '/oa/model/detail',
		query: { id: id },
	});
};
</script>
