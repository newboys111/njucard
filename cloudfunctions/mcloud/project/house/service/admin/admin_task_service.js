/**
 * Notes: 报修管理
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2022-08-22  07:48:00 
 */

const BaseProjectAdminService = require('./base_project_admin_service.js');

const util = require('../../../../framework/utils/util.js');
const exportUtil = require('../../../../framework/utils/export_util.js');
const timeUtil = require('../../../../framework/utils/time_util.js');
const dataUtil = require('../../../../framework/utils/data_util.js');
const TaskModel = require('../../model/task_model.js');
const UserModel = require('../../model/user_model.js');

// 导出数据KEY
const EXPORT_TASK_DATA_KEY = 'EXPORT_TASK_DATA';

class AdminTaskService extends BaseProjectAdminService {


	/** 取得分页列表 */
	async getAdminTaskList({
		search, // 搜索条件
		sortType, // 搜索菜单
		sortVal, // 搜索菜单
		orderBy, // 排序
		whereEx, //附加查询条件 
		page,
		size,
		oldTotal = 0
	}) {

		orderBy = orderBy || {
			TASK_ADD_TIME: 'desc'
		};
		let fields = 'TASK_STATUS,TASK_OBJ,TASK_ADD_TIME,TASK_LAST_TIME';


		let where = {};
		where.and = {
			_pid: this.getProjectId(), //复杂的查询在此处标注PID  
		};

		if (util.isDefined(search) && search) {
			where.or = [
				{ ['TASK_OBJ.title']: ['like', search] },
				{ ['TASK_OBJ.person']: ['like', search] },
				{ ['TASK_OBJ.phone']: ['like', search] },
				{ ['TASK_OBJ.building']: ['like', search] },
			];

		} else if (sortType && util.isDefined(sortVal)) {
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
					where.and['TASK_STATUS'] = Number(sortVal);
					break;
				}
				case 'sort': {
					orderBy = this.fmtOrderBySort(sortVal, 'TASK_ADD_TIME');
					break;
				}
			}
		}

		let result = await TaskModel.getList(where, fields, orderBy, page, size, true, oldTotal, false);


		// 为导出增加一个参数condition
		result.condition = encodeURIComponent(JSON.stringify(where));

		return result;
	}

	/**修改状态 */
	async statusTask(id, status) {
		this.AppError('该功能暂不开放，如有需要请加作者微信：cclinux0730');
	}

	// #####################导出数据

	/**获取数据 */
	async getTaskDataURL() {
		return await exportUtil.getExportDataURL(EXPORT_TASK_DATA_KEY);
	}

	/**删除数据 */
	async deleteTaskDataExcel() {
		return await exportUtil.deleteDataExcel(EXPORT_TASK_DATA_KEY);
	}

	/**导出数据 */
	async exportTaskDataExcel(condition, fields) {

		this.AppError('该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}

}

module.exports = AdminTaskService;