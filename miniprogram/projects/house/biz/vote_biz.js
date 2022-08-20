/**
 * Notes: 投票模块业务逻辑
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2022-06-24 07:48:00 
 */

const BaseBiz = require('../../../comm/biz/base_biz.js'); 
const projectSetting = require('../public/project_setting.js');

class VoteBiz extends BaseBiz { 

	static getCateName(cateId) {
		return BaseBiz.getCateName(cateId, projectSetting.VOTE_CATE);
	}

	static getCateList() {
		return BaseBiz.getCateList(projectSetting.VOTE_CATE);
	}

	static setCateTitle() {
		return BaseBiz.setCateTitle(projectSetting.VOTE_CATE);
	} 

}

module.exports = VoteBiz;