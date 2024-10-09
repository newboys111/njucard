/**
 * Notes: 投票实体
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2022-07-05 19:20:00 
 */

const BaseProjectModel = require('./base_project_model.js');

class VoteModel extends BaseProjectModel {

}

// 集合名
VoteModel.CL = BaseProjectModel.C('vote');

VoteModel.DB_STRUCTURE = {
	_pid: 'string|true',
	VOTE_ID: 'string|true',

	VOTE_TITLE: 'string|true|comment=标题',
	VOTE_STATUS: 'int|true|default=1|comment=状态 0=未启用,1=使用中',

	VOTE_CATE_ID: 'string|true|default=0|comment=分类',
	VOTE_CATE_NAME: 'string|false|comment=分类冗余',

	VOTE_CANCEL_SET: 'int|true|default=1|comment=取消设置 0=不允,1=允许,2=仅截止前可取消',

	VOTE_START: 'int|true|comment=开始时间',
	VOTE_END: 'int|true|comment=截止时间',

	VOTE_ORDER: 'int|true|default=9999',
	VOTE_VOUCH: 'int|true|default=0',

	VOTE_ITEM: 'array|false|default=[]|comment=投票项目 [{label=名称,cnt=数量}]',
	VOTE_TYPE: 'int|true|default=0|comment=形态 0-单选 1=多选',
	VOTE_USER: 'array|false|default=[]|comment=投票用户[{id,time,selected}]',

	VOTE_FORMS: 'array|true|default=[]',
	VOTE_OBJ: 'object|true|default={}',

	VOTE_QR: 'string|false',
	VOTE_VIEW_CNT: 'int|true|default=0',
	VOTE_USER_CNT: 'int|true|default=0',
	VOTE_CNT: 'int|true|default=0',

	VOTE_ADD_TIME: 'int|true',
	VOTE_EDIT_TIME: 'int|true',
	VOTE_ADD_IP: 'string|false',
	VOTE_EDIT_IP: 'string|false',
};

// 字段前缀
VoteModel.FIELD_PREFIX = "VOTE_";

/**
 * 状态 0=未启用,1=使用中 
 */
VoteModel.STATUS = {
	UNUSE: 0,
	COMM: 1
};



module.exports = VoteModel;