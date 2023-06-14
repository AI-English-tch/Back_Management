<template>
    <el-dialog :title="form.id ? $t('common.editBtn') : $t('common.addBtn')" v-model="visible"
        :close-on-click-modal="false" draggable>
      <el-form ref="dataFormRef" :model="form" :rules="dataRules" label-width="90px" v-loading="loading">
        <el-row :gutter="24">
    <el-col :span="24" class="mb20">
      <el-form-item :label="t('words.word')" prop="word">
        <el-input v-model="form.word" :placeholder="t('words.inputWordTip')"/>
      </el-form-item>
      </el-col>

    <el-col :span="24" class="mb20">
      <el-form-item :label="t('words.mean')" prop="mean">
        <el-input v-model="form.mean" :placeholder="t('words.inputMeanTip')"/>
      </el-form-item>
      </el-col>

    <el-col :span="24" class="mb20">
      <el-form-item :label="t('words.tags')" prop="tags">
        <el-input type="textarea" v-model="form.tags" :placeholder="t('words.inputTagsTip')"/>
      </el-form-item>
      </el-col>

    </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="visible = false">{{ $t('common.cancelButtonText') }}</el-button>
          <el-button type="primary" @click="onSubmit" :disabled="loading">{{ $t('common.confirmButtonText') }}</el-button>
        </span>
      </template>
    </el-dialog>
</template>

<script setup lang="ts" name="GptWordsDialog">
import { useDict } from '/@/hooks/dict';
import { useMessage } from "/@/hooks/message";
import { getObj, addObj, putObj } from '/@/api/bridge/words'
import { useI18n } from "vue-i18n"
import { rule } from '/@/utils/validate';
const emit = defineEmits(['refresh']);

const { t } = useI18n();

// 定义变量内容
const dataFormRef = ref();
const visible = ref(false)
const loading = ref(false)
// 定义字典

// 提交表单数据
const form = reactive({
    word: '',
    mean: '',
    tags: '',
});

// 定义校验规则
const dataRules = ref({
        word: [{ validator: rule.letter, trigger: 'blur' }],
})

// 打开弹窗
const openDialog = (id: string) => {
  visible.value = true
  form.id = ''

  // 重置表单数据
	nextTick(() => {
		dataFormRef.value?.resetFields();
	});

  // 获取gptWords信息
  if (id) {
    form.id = id
    getgptWordsData(id)
  }
};

// 提交
const onSubmit = async () => {
	const valid = await dataFormRef.value.validate().catch(() => {});
	if (!valid) return false;

	try {
        loading.value = true;
		form.id ? await putObj(form) : await addObj(form);
		useMessage().success(t(form.id ? 'common.editSuccessText' : 'common.addSuccessText'));
		visible.value = false;
		emit('refresh');
	} catch (err: any) {
		useMessage().error(err.msg);
	} finally {
        loading.value = false;
    }
};

// 初始化表单数据
const getgptWordsData = (id: string) => {
  // 获取数据
  loading.value = true
  getObj(id).then((res: any) => {
    Object.assign(form, res.data)
  }).finally(() => {
    loading.value = false
  })
};

// 暴露变量
defineExpose({
  openDialog
});
</script>