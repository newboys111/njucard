/**
 * Notes: 健康监测模块业务逻辑
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2022-08-12 07:48:00 
 */

const BaseProjectService = require('./base_project_service.js');
const util = require('../../../framework/utils/util.js');
const cloudUtil = require('../../../framework/cloud/cloud_util.js');
const dataUtil = require('../../../framework/utils/data_util.js');
const timeUtil = require('../../../framework/utils/time_util.js');
const TaskModel = require('../model/task_model.js');

class TaskService extends BaseProjectService {

	async getTaskCountByType(userId) {
		let status0Cnt = await TaskModel.count({ TASK_STATUS: 0, TASK_USER_ID: userId });
		let status1Cnt = await TaskModel.count({ TASK_STATUS: 1, TASK_USER_ID: userId });
		let status2Cnt = await TaskModel.count({ TASK_STATUS: 2, TASK_USER_ID: userId });
		let task = {
			status0Cnt,
			status1Cnt,
			status2Cnt
		}
		return task;
	}

	async getTaskDetail(userId, id, isAdmin = false) {
		let where = {
			_id: id
		}
		if (!isAdmin) where.TASK_USER_ID = userId;
		return await TaskModel.getOne(where);
	}


	/**添加 */
	async insertTask(userId, {
		forms
	}) {

		// 赋值 
		let data = {};
		data.TASK_USER_ID = userId;

		data.TASK_OBJ = dataUtil.dbForms2Obj(forms);
		data.TASK_FORMS = forms;

		let id = await TaskModel.insert(data);

		return {
			id
		};
	}


	/**修改 */
	async editTask(userId, {
		id,
		forms
	}) {
		// 异步处理 新旧文件
		let oldForms = await TaskModel.getOneField(id, 'TASK_FORMS');
		if (!oldForms) return;
		cloudUtil.handlerCloudFilesForForms(oldForms, forms);

		// 赋值 
		let data = {};
		data.TASK_USER_ID = userId;
		data.TASK_OBJ = dataUtil.dbForms2Obj(forms);
		data.TASK_FORMS = forms;

		await TaskModel.edit(id, data);
	}

	// 更新forms信息
	async updateTaskForms({
		id,
		hasImageForms
	}) {
		await TaskModel.editForms(id, 'TASK_FORMS', 'TASK_OBJ', hasImageForms);
	}

	/**删除数据 */
	async delTask(userId, id, isAdmin) {
		let where = {
			_id: id
		}
		if (!isAdmin) where.TASK_USER_ID = userId;

		// 异步处理 新旧文件
		let task = await TaskModel.getOne(id, 'TASK_FORMS');
		if (!task) return;
		cloudUtil.handlerCloudFilesForForms(task.TASK_FORMS, []);

		await TaskModel.del(where);

	}


	/** 取得我的 */
	async getMyTaskList(userId, {
		search, // 搜索条件
		sortType, // 搜索菜单
		sortVal, // 搜索菜单
		orderBy, // 排序 
		page,
		size,
		isTotal = true,
		oldTotal
	}) {
		orderBy = orderBy || {
			'TASK_ADD_TIME': 'desc'
		};
		let fields = '*';

		let where = {};
		where.and = {
			_pid: this.getProjectId(), //复杂的查询在此处标注PID 
			TASK_USER_ID: userId
		};

		if (util.isDefined(search) && search) {
			where.or = [{ ['TASK_OBJ.title']: ['like', search] }];
		} else if (sortType && sortVal !== '') {
			// 搜索菜单
			switch (sortType) {
				case 'level': {
					where.and['TASK_OBJ.level'] = sortVal;
					break;
				}
				case 'type': {
					where.and['TASK_OBJ.type'] = sortVal;
					break;
				}
				case 'status': { 
					where.and.TASK_STATUS = Number(sortVal);
					break;
				}
				case 'sort': {
					orderBy = this.fmtOrderBySort(sortVal, 'TASK_ADD_TIME');
					break;
				}
			}
		}
		let result = await TaskModel.getList(where, fields, orderBy, page, size, isTotal, oldTotal);

		return result;
	}

}

module.exports = TaskService;