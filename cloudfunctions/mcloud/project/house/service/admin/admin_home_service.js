/**
 * Notes: 后台HOME/登录模块 
 * Date: 2021-06-15 07:48:00 
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 */

const BaseProjectAdminService = require('./base_project_admin_service.js');
const UserModel = require('../../model/user_model.js'); 
const NewsModel = require('../../model/news_model.js'); 
const VoteModel = require('../../model/vote_model.js');
const ActivityModel = require('../../model/activity_model.js'); 
const TaskModel = require('../../model/task_model.js'); 
const constants = require('../../public/constants.js');
const setupUtil = require('../../../../framework/utils/setup/setup_util.js');

class AdminHomeService extends BaseProjectAdminService {

	/**
	 * 首页数据归集
	 */
	async adminHome() {
		let where = {};

		let userCnt = await UserModel.count(where);
		let newsCnt = await NewsModel.count(where);   
		let activityCnt = await ActivityModel.count(where);  
		let voteCnt = await VoteModel.count(where);  
		let taskCnt = await TaskModel.count(where);  
		return [
			{ title: '用户数', cnt: userCnt },
			{ title: '资讯数', cnt: newsCnt },   
			{ title: '活动数', cnt: activityCnt },   
			{ title: '投票项目', cnt: voteCnt },   
			{ title: '报事报修', cnt: taskCnt },   
		]
	}

	// 用户数据清理  
	async clearUserData(userId) {

	}


	//##################首页推荐
	// 首页推荐清理
	async clearVouchData() {
		this.AppError('该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}


	/**添加首页推荐 */
	async updateHomeVouch(node) {
		this.AppError('该功能暂不开放，如有需要请加作者微信：cclinux0730');

	}

	/**删除推荐数据 */
	async delHomeVouch(id) {
		this.AppError('该功能暂不开放，如有需要请加作者微信：cclinux0730'); 
	}
}

module.exports = AdminHomeService;