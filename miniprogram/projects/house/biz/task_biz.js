/**
 * Notes: 登记模块后台管理模块业务逻辑
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2022-06-24 07:48:00 
 */

const BaseBiz = require('../../../comm/biz/base_biz.js');
const projectSetting = require('../public/project_setting.js');
const pageHelper = require('../../../helper/page_helper.js');
const cloudHelper = require('../../../helper/cloud_helper.js');

class TaskBiz extends BaseBiz {
 

	static initFormData(id = '',  ) {
		return {
			id,
			fields: projectSetting.TASK_FIELDS ,
		}
	}


	static async delTask(id, callback) {
		let cb = async () => {
			try {
				let params = {
					id
				}
				let opts = {
					title: '删除中'
				}

				await cloudHelper.callCloudSumbit('task/del', params, opts).then(res => {
					pageHelper.showSuccToast('删除成功', 1500, callback);
				});
			} catch (err) {
				console.log(err);
			}
		}

		pageHelper.showConfirm('确认删除? 删除不可恢复', cb);
	}
}

TaskBiz.CHECK_FORM = {
	forms: 'formForms|array',
};

module.exports = TaskBiz;