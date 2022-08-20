/**
 * Notes: 业务基类 
 * Date: 2021-03-15 04:00:00 
 */

const dbUtil = require('../../../framework/database/db_util.js');
const util = require('../../../framework/utils/util.js');
const AdminModel = require('../../../framework/platform/model/admin_model.js');
const NewsModel = require('../model/news_model.js');
const ActivityModel = require('../model/activity_model.js');
const VoteModel = require('../model/vote_model.js');
const BaseService = require('../../../framework/platform/service/base_service.js');

class BaseProjectService extends BaseService {
	getProjectId() {
		return util.getProjectId();
	}

	async initSetup() {
		let F = (c) => 'bx_' + c;
		const INSTALL_CL = 'setup_house';
		const COLLECTIONS = ['setup', 'admin', 'log', 'task', 'news', 'fav', 'user', 'activity', 'activity_join', 'vote', 'vote_join'];
		const CONST_PIC = '/images/cover.gif';

		const NEWS_CATE = '1=物业公告,2=小区规约,3=业委会,4=房屋租售';
		const VOTE_CATE = '1=业主投票';
		const ACTIVITY_CATE = '1=公益活动,2=室内活动,3=户外活动,4=其他活动';


		if (await dbUtil.isExistCollection(F(INSTALL_CL))) {
			return;
		}

		console.log('### initSetup...');

		let arr = COLLECTIONS;
		for (let k = 0; k < arr.length; k++) {
			if (!await dbUtil.isExistCollection(F(arr[k]))) {
				await dbUtil.createCollection(F(arr[k]));
			}
		}

		if (await dbUtil.isExistCollection(F('admin'))) {
			let adminCnt = await AdminModel.count({});
			if (adminCnt == 0) {
				let data = {};
				data.ADMIN_NAME = 'admin';
				data.ADMIN_PASSWORD = 'e10adc3949ba59abbe56e057f20f883e';
				data.ADMIN_DESC = '超管';
				data.ADMIN_TYPE = 1;
				await AdminModel.insert(data);
			}
		}


		if (await dbUtil.isExistCollection(F('news'))) {
			let newsCnt = await NewsModel.count({});
			if (newsCnt == 0) {
				let newsArr = NEWS_CATE.split(',');
				for (let j in newsArr) {
					let title = newsArr[j].split('=')[1];
					let cateId = newsArr[j].split('=')[0];

					let data = {};
					data.NEWS_TITLE = title + '标题1';
					data.NEWS_DESC = title + '简介1';
					data.NEWS_CATE_ID = cateId;
					data.NEWS_CATE_NAME = title;
					data.NEWS_CONTENT = [{ type: 'text', val: title + '内容1' }];
					data.NEWS_PIC = [CONST_PIC];

					await NewsModel.insert(data);
				}
			}
		}

		if (await dbUtil.isExistCollection(F('vote'))) {
			let voteCnt = await VoteModel.count({});
			if (voteCnt == 0) {
				let voteArr = VOTE_CATE.split(',');
				for (let j in voteArr) {
					let title = voteArr[j].split('=')[1];
					let cateId = voteArr[j].split('=')[0];

					let data = {};
					data.VOTE_TITLE = title + '1';
					data.VOTE_CATE_ID = cateId;
					data.VOTE_CATE_NAME = title;
					data.VOTE_START = this._timestamp;
					data.VOTE_END = this._timestamp + 86400 * 1000 * 30;
					data.VOTE_ITEM = [
						{ label: '选项1', cnt: 0 },
						{ label: '选项2', cnt: 0 },
						{ label: '选项3', cnt: 0 },
						{ label: '选项4', cnt: 0 },
						{ label: '选项5', cnt: 0 },
					]

					data.VOTE_OBJ = {
						cover: [CONST_PIC],
						desc: []
					};

					await VoteModel.insert(data);
				}
			}
		}

		if (await dbUtil.isExistCollection(F('activity'))) {
			let activityCnt = await ActivityModel.count({});
			if (activityCnt == 0) {
				let activityArr = ACTIVITY_CATE.split(',');
				for (let j in activityArr) {
					let title = activityArr[j].split('=')[1];
					let cateId = activityArr[j].split('=')[0];

					let data = {};
					data.ACTIVITY_TITLE = title + '标题1';
					data.ACTIVITY_CATE_ID = cateId;
					data.ACTIVITY_CATE_NAME = title;
					data.ACTIVITY_ADDRESS = '本小区前坪';
					data.ACTIVITY_START = this._timestamp;
					data.ACTIVITY_END = this._timestamp + 86400 * 1000 * 30;
					data.ACTIVITY_STOP = this._timestamp + 86400 * 1000 * 30;
					data.ACTIVITY_OBJ = {
						cover: [CONST_PIC],
						desc: [{ type: 'text', val: title + '活动内容1' }]
					};

					await ActivityModel.insert(data);
				}
			}
		}


		if (!await dbUtil.isExistCollection(F(INSTALL_CL))) {
			await dbUtil.createCollection(F(INSTALL_CL));
		}
	}

}

module.exports = BaseProjectService;