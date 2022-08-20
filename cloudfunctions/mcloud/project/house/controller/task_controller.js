/**
 * Notes: 健康监测模块控制器
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2022-08-12 04:00:00 
 */

const BaseProjectController = require('./base_project_controller.js');
const TaskService = require('../service/task_service.js');
const contentCheck = require('../../../framework/validate/content_check.js');
const timeUtil = require('../../../framework/utils/time_util.js');

class TaskController extends BaseProjectController {

	async getTaskCountByType() {

		// 数据校验 
		//let rules = {};

		// 取得数据
		//let input = this.validateData(rules);

		let service = new TaskService();
		let result = await service.getTaskCountByType(this._userId);

		return result;

	}

	async getTaskDetail() {

		// 数据校验 
		let rules = {
			id: 'id|must',
		};

		// 取得数据
		let input = this.validateData(rules);


		let service = new TaskService();
		let result = await service.getTaskDetail(this._userId, input.id);

		if (result) {
			result.TASK_LAST_TIME = timeUtil.timestamp2Time(result.TASK_LAST_TIME, 'Y-M-D h:m');
		}

		return result;

	}

	/** 发布 */
	async insertTask() {

		// 数据校验 
		let rules = {
			forms: 'array|name=表单',
		};

		// 取得数据
		let input = this.validateData(rules);

		// 内容审核
		await contentCheck.checkTextMultiAdmin(input);

		let service = new TaskService();
		let result = await service.insertTask(this._userId, input);

		return result;

	}

	/** 编辑 */
	async editTask() {

		let rules = {
			id: 'must|id',
			forms: 'array|name=表单',
		};

		// 取得数据
		let input = this.validateData(rules);

		// 内容审核
		await contentCheck.checkTextMultiAdmin(input);

		let service = new TaskService();
		let result = service.editTask(this._userId, input);

		return result;
	}

	/**
	 * 更新富文本信息 
	 */
	async updateTaskForms() {

		// 数据校验
		let rules = {
			id: 'must|id',
			hasImageForms: 'array'
		};

		// 取得数据
		let input = this.validateData(rules);

		// 内容审核
		await contentCheck.checkTextMultiAdmin(input);

		let service = new TaskService();
		return await service.updateTaskForms(input);
	}


	/** 删除 */
	async delTask() {

		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new TaskService();
		await service.delTask(this._userId, input.id);

	}

	/** 我的列表 */
	async getMyTaskList() {

		// 数据校验
		let rules = {
			search: 'string|min:1|max:30|name=搜索条件',
			sortType: 'string|name=搜索类型',
			sortVal: 'name=搜索类型值',
			orderBy: 'object|name=排序',
			page: 'must|int|default=1',
			size: 'int',
			isTotal: 'bool',
			oldTotal: 'int',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new TaskService();
		let result = await service.getMyTaskList(this._userId, input);

		// 数据格式化
		let list = result.list; 

		for (let k = 0; k < list.length; k++) {
			list[k].TASK_ADD_TIME = timeUtil.timestamp2Time(list[k].TASK_ADD_TIME, 'Y-M-D h:m');
		}

		result.list = list;

		return result;

	}

}

module.exports = TaskController;