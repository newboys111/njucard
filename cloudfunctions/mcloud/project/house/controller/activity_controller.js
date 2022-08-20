/**
 * Notes: 活动模块控制器
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2022-06-23 04:00:00 
 */

const BaseProjectController = require('./base_project_controller.js');
const ActivityService = require('../service/activity_service.js');
const timeUtil = require('../../../framework/utils/time_util.js');

class ActivityController extends BaseProjectController {

	_getTimeShow(start, end) {
		let startDay = timeUtil.timestamp2Time(start, 'M月D日');
		let startTime = timeUtil.timestamp2Time(start, 'h:m');
		let endDay = timeUtil.timestamp2Time(end, 'M月D日');
		let endTime = timeUtil.timestamp2Time(end, 'h:m');
		let week = timeUtil.week(timeUtil.timestamp2Time(start, 'Y-M-D'));
		if (startDay != endDay)
			return `${startDay} ${startTime} ${week}～${endDay} ${endTime}`;
		else
			return `${startDay} ${startTime}～${endTime} ${week}`;
	}

	/** 列表 */
	async getActivityList() {

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

		let service = new ActivityService();
		let result = await service.getActivityList(input);

		// 数据格式化
		let list = result.list;

		for (let k = 0; k < list.length; k++) {
			list[k].time = this._getTimeShow(list[k].ACTIVITY_START, list[k].ACTIVITY_END);
			list[k].statusDesc = service.getJoinStatusDesc(list[k]);

			if (list[k].ACTIVITY_OBJ && list[k].ACTIVITY_OBJ.desc)
				delete list[k].ACTIVITY_OBJ.desc;
		}

		return result;

	}


	/** 浏览详细 */
	async viewActivity() {
		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new ActivityService();
		let activity = await service.viewActivity(this._userId, input.id);

		if (activity) {
			activity.stop = timeUtil.timestamp2Time(activity.ACTIVITY_STOP, 'Y-M-D h:m');
			activity.time = this._getTimeShow(activity.ACTIVITY_START, activity.ACTIVITY_END);
			activity.statusDesc = service.getJoinStatusDesc(activity);
		}

		return activity;
	}


	/** 我的活动报名列表 */
	async getMyActivityJoinList() {

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

		let service = new ActivityService();
		let result = await service.getMyActivityJoinList(this._userId, input);

		// 数据格式化
		let list = result.list;


		for (let k = 0; k < list.length; k++) {
			list[k].time = this._getTimeShow(list[k].activity.ACTIVITY_START, list[k].activity.ACTIVITY_END);

			list[k].ACTIVITY_JOIN_ADD_TIME = timeUtil.timestamp2Time(list[k].ACTIVITY_JOIN_ADD_TIME, 'Y-M-D h:m');
		}

		result.list = list;

		return result;

	}

	/** 我的报名详情 */
	async getMyActivityJoinDetail() {
		// 数据校验
		let rules = {
			activityJoinId: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new ActivityService();
		let activityJoin = await service.getMyActivityJoinDetail(this._userId, input.activityJoinId);
		if (activityJoin) {
			activityJoin.ACTIVITY_JOIN_ADD_TIME = timeUtil.timestamp2Time(activityJoin.ACTIVITY_JOIN_ADD_TIME);
			activityJoin.ACTIVITY_JOIN_CHECKIN_TIME = timeUtil.timestamp2Time(activityJoin.ACTIVITY_JOIN_CHECKIN_TIME);
			activityJoin.time = this._getTimeShow(activityJoin.activity.ACTIVITY_START, activityJoin.activity.ACTIVITY_END);
		}
		return activityJoin;

	}

	/**  报名前获取关键信息 */
	async detailForActivityJoin() {
		// 数据校验
		let rules = {
			activityId: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new ActivityService();
		let meet = await service.detailForActivityJoin(this._userId, input.activityId);

		if (meet) {
			// 显示转换  
		}

		return meet;
	}

	/** 报名提交 */
	async activityJoin() {
		// 数据校验
		let rules = {
			activityId: 'must|id',
			forms: 'must|array',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new ActivityService();
		return await service.activityJoin(this._userId, input.activityId, input.forms);
	}

	/** 报名取消*/
	async cancelMyActivityJoin() {
		// 数据校验
		let rules = {
			activityJoinId: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new ActivityService();
		return await service.cancelMyActivityJoin(this._userId, input.activityJoinId);
	}


	/** 自助签到*/
	async myJoinSelf() {
		// 数据校验
		let rules = {
			activityId: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new ActivityService();
		return await service.myJoinSelf(this._userId, input.activityId);
	}

	/** 按天获取报名项目 */
	async getActivityListByDay() {

		// 数据校验
		let rules = {
			day: 'must|date|name=日期',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new ActivityService();
		let list = await service.getActivityListByDay(input.day);
		return list;


	}

	/** 获取从某天开始可报名的日期 */
	async getActivityHasDaysFromDay() {

		// 数据校验
		let rules = {
			day: 'must|date|name=日期',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new ActivityService();
		let list = await service.getActivityHasDaysFromDay(input.day);
		return list;

	}

}

module.exports = ActivityController;