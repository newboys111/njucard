/**
 * Notes: 健康监测控制模块
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2022-08-13 10:20:00 
 */

const BaseProjectAdminController = require('./base_project_admin_controller.js');

const AdminTaskService = require('../../service/admin/admin_task_service.js');
const TaskService = require('../../service/task_service.js');
const timeUtil = require('../../../../framework/utils/time_util.js');

class AdminTaskController extends BaseProjectAdminController {


	/** 信息 */
	async getTaskDetail() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new TaskService();
		let task = await service.getTaskDetail('', input.id, true);

		if (task) {
			// 显示转换  
			task.TASK_ADD_TIME = timeUtil.timestamp2Time(task.TASK_ADD_TIME);
		}

		return task;
	}


	/** 列表 */
	async getAdminTaskList() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			search: 'string|min:1|max:30|name=搜索条件',
			sortType: 'string|name=搜索类型',
			sortVal: 'name=搜索类型值',
			orderBy: 'object|name=排序',
			whereEx: 'object|name=附加查询条件',
			page: 'must|int|default=1',
			size: 'int',
			isTotal: 'bool',
			oldTotal: 'int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminTaskService();
		let result = await service.getAdminTaskList(input);

		// 数据格式化
		let list = result.list;
		for (let k = 0; k < list.length; k++) {
			list[k].TASK_ADD_TIME = timeUtil.timestamp2Time(list[k].TASK_ADD_TIME);
			list[k].TASK_LAST_TIME = timeUtil.timestamp2Time(list[k].TASK_LAST_TIME);
		}
		result.list = list;
		return result;
	}

	/** 删除 */
	async delTask() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new TaskService();
		await service.delTask('', input.id, true);

	}

	/** 状态修改 */
	async statusTask() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			id: 'must|id',
			status: 'must|int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminTaskService();
		return await service.statusTask(input.id, input.status);
	}

	/************** 数据导出 BEGIN ********************* */
	/** 当前是否有导出文件生成 */
	async taskDataGet() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			isDel: 'int|must', //是否删除已有记录
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminTaskService();

		if (input.isDel === 1)
			await service.deleteTaskDataExcel(); //先删除 

		return await service.getTaskDataURL();
	}

	/** 导出数据 */
	async taskDataExport() {
		await this.isAdmin();

		// 数据校验
		let rules = {
			condition: 'string|name=导出条件',
			fields: 'array',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminTaskService();
		return await service.exportTaskDataExcel(input.condition, input.fields);
	}

	/** 删除导出的数据 */
	async taskDataDel() {
		await this.isAdmin();

		// 数据校验
		let rules = {};

		// 取得数据
		let input = this.validateData(rules);

		let service = new AdminTaskService();
		return await service.deleteTaskDataExcel();
	}
}

module.exports = AdminTaskController;