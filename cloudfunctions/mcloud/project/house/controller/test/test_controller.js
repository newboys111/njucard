/**
 * Notes: 测试模块控制器
 * Date: 2021-03-15 19:20:00 
 */

const BaseController = require('../../controller/base_project_controller.js');
const fakerLib = require('../../../../framework/lib/faker_lib.js');

const UserModel = require('../../model/user_model.js');

const VoteModel = require('../../model/vote_model.js');
const VoteJoinModel = require('../../model/vote_join_model.js');
const VoteService = require('../../service/vote_service.js');

const ActivityModel = require('../../model/activity_model.js');
const ActivityJoinModel = require('../../model/activity_join_model.js');

class TestController extends BaseController {

	async test() {
		global.PID = 'house';
		console.log('TEST>>>>>>>');

		// this.mockActivityJoin();
		this.mockVoteJoin();
		//	this.mockUser();
	}

	async mockUser() {
		console.log('mockUser >>>>>>> Begin....');

		console.log('>>>>delete');
		let delCnt = await UserModel.del({});
		console.log('>>>>delete=' + delCnt);

		for (let k = 1; k <= 10; k++) {
			console.log('>>>>insert >' + k);

			let name = fakerLib.getName();

			let user = {};
			user.USER_MINI_OPENID = k;
			user.USER_NAME = name;
			user.USER_MOBILE = fakerLib.getMobile();

			let sex = fakerLib.getRdArr(['男', '女']);
			let house = 'W' + fakerLib.getIntBetween(1, 10) + '栋-' + fakerLib.getIntBetween(100, 300);
			user.USER_OBJ = {
				sex,
				name,
				house
			};
			user.USER_FORMS = [
				{ mark: 'sex', title: '性别', type: 'text', val: sex },
				{ mark: 'name', title: '房主姓名', type: 'text', val: name },
				{ mark: 'house', title: '楼栋房号', type: 'text', val: house },
			]

			await UserModel.insert(user);

		}

		console.log('mockUse <<<< END');
	}


	async mockActivityJoin() {
		console.log('mockActivityJoin >>>>>>> Begin....');
		let ACTIVITY_ID = '0a4ec1f9630028d91a6a705764dee5ba';

		let activity = await ActivityModel.getOne(ACTIVITY_ID);
		if (!activity) return console.error('no activity');

		let join = {};
		join.ACTIVITY_JOIN_ACTIVITY_ID = ACTIVITY_ID;
		join.ACTIVITY_JOIN_STATUS = 1;

		console.log('>>>>delete');
		let delCnt = await ActivityJoinModel.del({ ACTIVITY_JOIN_ACTIVITY_ID: ACTIVITY_ID });
		console.log('>>>>delete=' + delCnt);

		for (let k = 1; k <= 10; k++) {
			console.log('>>>>insert >' + k);
			join.ACTIVITY_JOIN_USER_ID = fakerLib.getUuid();

			join.ACTIVITY_JOIN_CODE = fakerLib.getStr(15);
			join.ACTIVITY_JOIN_ADD_TIME = fakerLib.getAddTimestamp();

			join.ACTIVITY_JOIN_FORMS = [
				{ mark: 'name', title: '姓名', type: 'text', val: fakerLib.getName() },
				{ mark: 'phone', title: '手机', type: 'mobile', val: fakerLib.getMobile() }
			];

			await ActivityJoinModel.insert(join);
		}

		console.log('>>>> STAT');
		let cnt = await ActivityJoinModel.count({
			ACTIVITY_JOIN_ACTIVITY_ID: ACTIVITY_ID
		});

		await ActivityModel.edit(ACTIVITY_ID, { ACTIVITY_JOIN_CNT: cnt, ACTIVITY_MAX_CNT: cnt + 10 });

		console.log('mockActivityJoin >>>>>>> END');
	}


	async mockVoteJoin() {
		console.log('mockVoteJoin >>>>>>> Begin....');
		let VOTE_ID = '0ab5303b6300311f175f401d0f2ed1e1';

		let vote = await VoteModel.getOne(VOTE_ID);
		if (!vote) return console.error('no vote');

		let join = {};
		join.VOTE_JOIN_VOTE_ID = VOTE_ID;

		console.log('>>>>delete');
		let delCnt = await VoteJoinModel.del({ VOTE_JOIN_VOTE_ID: VOTE_ID });
		console.log('>>>>delete=' + delCnt);


		for (let k = 1; k <= fakerLib.getIntBetween(20, 30); k++) {
			console.log('>>>>insert >' + k);
			join.VOTE_JOIN_USER_ID = fakerLib.getUuid();
			join.VOTE_JOIN_ADD_TIME = fakerLib.getAddTimestamp();


			join.VOTE_JOIN_CNT = 1;
			join.VOTE_JOIN_SELECTED = [fakerLib.getIntBetween(0, vote.VOTE_ITEM.length - 1)];

			await VoteJoinModel.insert(join);
		}

		console.log('>>>> STAT');
		let service = new VoteService();
		service.statVoteItem(VOTE_ID);

		console.log('mockVoteJoin >>>>>>> END');
	}
}

module.exports = TestController;