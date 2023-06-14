<template>
  <div class="layout-padding">
    <div class="layout-padding-auto layout-padding-view">
      <el-row v-show="showSearch">
        <el-form :model="state.queryForm" ref="queryRef" :inline="true" @keyup.enter="getDataList">
      <el-form-item :label="$t('words.word')" prop="word" >
        <el-input :placeholder="t('words.inputWordTip')" v-model="state.queryForm.word"
          style="max-width: 180px" />
      </el-form-item>
          <el-form-item>
            <el-button formDialogRef icon="search" type="primary" @click="getDataList">
              {{ $t('common.queryBtn') }}
            </el-button>
            <el-button icon="Refresh" formDialogRef @click="resetQuery">{{ $t('common.resetBtn') }}</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row>
        <div class="mb8" style="width: 100%">
          <el-button formDialogRef icon="folder-add" type="primary" class="ml10" @click="formDialogRef.openDialog()"
            v-auth="'bridge_words_add'">
            {{ $t('common.addBtn') }}
          </el-button>
          <el-button plain formDialogRef :disabled="multiple" icon="Delete" type="primary" class="ml10"
            v-auth="'bridge_words_del'" @click="handleDelete(selectObjs)">
            {{ $t('common.delBtn') }}
          </el-button>
          <right-toolbar v-model:showSearch="showSearch" 	:export="'bridge_words_export'"
						@exportExcel="exportExcel" class="ml10" style="float: right;margin-right: 20px"
            @queryTable="getDataList"></right-toolbar>
        </div>
      </el-row>
      <el-table :data="state.dataList" v-loading="state.loading" style="width: 100%"
        @selection-change="handleSelectionChange" @sort-change="sortChangeHandle">
        <el-table-column type="selection" width="40" align="center" />
        <el-table-column type="index" :label="t('words.index')" width="40" />
          <el-table-column prop="word" :label="t('words.word')"  show-overflow-tooltip/>
          <el-table-column prop="mean" :label="t('words.mean')"  show-overflow-tooltip/>
          <el-table-column prop="tags" :label="t('words.tags')"  show-overflow-tooltip/>
        <el-table-column :label="$t('common.action')" width="150">
          <template #default="scope">
            <el-button icon="edit-pen" text type="primary" v-auth="'bridge_words_edit'"
              @click="formDialogRef.openDialog(scope.row.id)">{{ $t('common.editBtn') }}</el-button>
            <el-button icon="delete" text type="primary" v-auth="'bridge_words_del'" @click="handleDelete([scope.row.id])">{{
              $t('common.delBtn')
            }}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" v-bind="state.pagination" />
    </div>

    <!-- 编辑、新增  -->
    <form-dialog ref="formDialogRef" @refresh="getDataList(false)" />
  </div>
</template>

<script setup lang="ts" name="systemGptWords">
import { BasicTableProps, useTable } from "/@/hooks/table";
import { fetchList, delObjs } from "/@/api/bridge/words";
import { useMessage, useMessageBox } from "/@/hooks/message";
import { useDict } from '/@/hooks/dict';
import { useI18n } from "vue-i18n";

// 引入组件
const FormDialog = defineAsyncComponent(() => import('./form.vue'));
const { t } = useI18n()
// 定义查询字典

// 定义变量内容
const formDialogRef = ref()
// 搜索变量
const queryRef = ref()
const showSearch = ref(true)
// 多选变量
const selectObjs = ref([]) as any
const multiple = ref(true)

const state: BasicTableProps = reactive<BasicTableProps>({
  queryForm: {},
  pageList: fetchList
})

//  table hook
const {
  getDataList,
  currentChangeHandle,
  sizeChangeHandle,
  sortChangeHandle,
  downBlobFile
} = useTable(state)

// 清空搜索条件
const resetQuery = () => {
  // 清空搜索条件
  queryRef.value?.resetFields()
  // 清空多选
  selectObjs.value = []
  getDataList()
}

// 导出excel
const exportExcel = () => {
  downBlobFile('/bridge/words/export', state.queryForm, 'words.xlsx')
}

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
		await delObjs(ids);
		getDataList();
		useMessage().success(t('common.delSuccessText'));
	} catch (err: any) {
		useMessage().error(err.msg);
	}
};
</script>