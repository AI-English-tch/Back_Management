<template>
	<el-drawer v-model="visible" title="日志详情" size="50%">
		<el-descriptions :column="1">
			<el-descriptions-item :label="$t('syslog.title')">{{ data.title }}</el-descriptions-item>
			<el-descriptions-item :label="$t('syslog.remoteAddr')">{{ data.remoteAddr }}</el-descriptions-item>
			<el-descriptions-item :label="$t('syslog.method')">{{ data.method }}</el-descriptions-item>
			<el-descriptions-item :label="$t('syslog.serviceId')">{{ data.serviceId }}</el-descriptions-item>
			<el-descriptions-item :label="$t('syslog.time')">{{ data.time }}</el-descriptions-item>
			<el-descriptions-item :label="$t('syslog.createTime')">{{ data.createTime }}</el-descriptions-item>
			<el-descriptions-item :label="$t('syslog.requestUri')">{{ data.requestUri }}</el-descriptions-item>
			<el-descriptions-item :label="$t('syslog.createBy')">{{ data.createBy }}</el-descriptions-item>
			<el-descriptions-item :label="$t('syslog.exception')">
				<highlightjs ref="highlight" v-if="data.exception" autodetect :code="data.exception" />
			</el-descriptions-item>
		</el-descriptions>
	</el-drawer>
</template>

<script setup lang="ts" name="log-detail">
const visible = ref(false);

const data = reactive({} as any);
const highlight = ref();

const openDialog = (row: any) => {
	visible.value = true;
	Object.assign(data, row);
};

// 暴露变量
defineExpose({
	openDialog,
});
</script>
