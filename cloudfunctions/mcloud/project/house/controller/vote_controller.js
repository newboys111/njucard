/**
 * Notes: 投票模块控制器
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2022-07-05 04:00:00 
 */

const BaseProjectController = require('./base_project_controller.js');
const VoteService = require('../service/vote_service.js');
const timeUtil = require('../../../framework/utils/time_util.js');

class VoteController extends BaseProjectController {

	_getTimeShow(start, end) {
		let startDay = timeUtil.timestamp2Time(start, 'M月D日');
		let startTime = timeUtil.timestamp2Time(start, 'h:m');
		let week = timeUtil.week(timeUtil.timestamp2Time(start, 'Y-M-D'));

		if (end) {
			let endDay = timeUtil.timestamp2Time(end, 'M月D日');
			let endTime = timeUtil.timestamp2Time(end, 'h:m');

			if (startDay != endDay)
				return `${startDay} ${startTime} ${week}～${endDay} ${endTime}`;
			else
				return `${startDay} ${startTime}～${endTime} ${week}`;
		}
		else
			return `${startDay} ${startTime} ${week}`;
	}

	/** 列表 */
	async getVoteList() {

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

		let service = new VoteService();
		let result = await service.getVoteList(input);

		// 数据格式化
		let list = result.list;

		for (let k = 0; k < list.length; k++) {
			list[k].start = this._getTimeShow(list[k].VOTE_START);
			list[k].end = this._getTimeShow(list[k].VOTE_END);
			list[k].statusDesc = service.getVoteStatusDesc(list[k]);

			if (list[k].VOTE_OBJ && list[k].VOTE_OBJ.desc)
				delete list[k].VOTE_OBJ.desc;
		}

		return result;

	}


	/** 浏览详细 */
	async viewVote() {
		// 数据校验
		let rules = {
			id: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new VoteService();
		let vote = await service.viewVote(this._userId, input.id);

		if (vote) {
			vote.time = this._getTimeShow(vote.VOTE_START, vote.VOTE_END);
			vote.statusDesc = service.getVoteStatusDesc(vote);
			vote = service.fmtVoteItem(vote);
		}

		return vote;
	}

	/** 投票提交 */
	async doVote() {
		// 数据校验
		let rules = {
			voteId: 'must|id',
			selected: 'must|array',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new VoteService();
		return await service.doVote(this._userId, input.voteId, input.selected);
	}


	/** 投票取消*/
	async cancelMyVote() {
		// 数据校验
		let rules = {
			voteId: 'must|id',
		};

		// 取得数据
		let input = this.validateData(rules);

		let service = new VoteService();
		return await service.cancelMyVote(this._userId, input.voteId);
	}


	/** 我的投票列表 */
	async getMyVoteList() {

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

		let service = new VoteService();
		let result = await service.getMyVoteList(this._userId, input);

		// 数据格式化
		let list = result.list;
		// 显示转换
		for (let k = 0; k < list.length; k++) {
			list[k].VOTE_JOIN_ADD_TIME = timeUtil.timestamp2Time(list[k].VOTE_JOIN_ADD_TIME);
			list[k].VOTE_JOIN_ITEM_LABEL = list[k].VOTE_JOIN_ITEM_LABEL.join('，');
		}
		result.list = list;

		return result;

	}
}

module.exports = VoteController;