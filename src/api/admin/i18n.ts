import request from '/@/utils/request';

export function fetchList(query?: Object) {
	return request({
		url: '/admin/i18n/page',
		method: 'get',
		params: query,
	});
}

export function addObj(obj?: Object) {
	return request({
		url: '/admin/i18n',
		method: 'post',
		data: obj,
	});
}

export function getObj(id?: string) {
	return request({
		url: '/admin/i18n/details/' + id,
		method: 'get',
	});
}

export function getObjDetails(obj?: object) {
	return request({
		url: '/admin/i18n/details/',
		method: 'get',
		params: obj,
	});
}

export function delObj(ids?: object) {
	return request({
		url: '/admin/i18n',
		method: 'delete',
		data: ids,
	});
}

export function putObj(obj?: Object) {
	return request({
		url: '/admin/i18n',
		method: 'put',
		data: obj,
	});
}

export function info() {
	return request({
		url: '/admin/i18n/info',
		method: 'get',
	});
}

export function refreshCache() {
	return request({
		url: '/admin/i18n/sync',
		method: 'put',
	});
}

export function validateName(rule: any, value: any, callback: any, isEdit: boolean) {
	if (isEdit) {
		return callback();
	}

	getObjDetails({ name: value }).then((response) => {
		const result = response.data;
		if (result !== null) {
			callback(new Error('国际化编码已经存在'));
		} else {
			callback();
		}
	});
}

export function validateZhCn(rule: any, value: any, callback: any, isEdit: boolean) {
	if (isEdit) {
		return callback();
	}

	getObjDetails({ zhCn: value }).then((response) => {
		const result = response.data;
		if (result !== null) {
			callback(new Error('国际化中文已经存在'));
		} else {
			callback();
		}
	});
}

export function validateEn(rule: any, value: any, callback: any, isEdit: boolean) {
	if (isEdit) {
		return callback();
	}

	getObjDetails({ en: value }).then((response) => {
		const result = response.data;
		if (result !== null) {
			callback(new Error('国际化英文已经存在'));
		} else {
			callback();
		}
	});
}
