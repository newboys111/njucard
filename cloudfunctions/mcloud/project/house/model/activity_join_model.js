/**
 * Notes: 活动报名实体
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2022-07-01 19:20:00 
 */


const BaseProjectModel = require('./base_project_model.js');

class ActivityJoinModel extends BaseProjectModel {

}

// 集合名
ActivityJoinModel.CL = BaseProjectModel.C('activity_join');

ActivityJoinModel.DB_STRUCTURE = {
	_pid: 'string|true',
	ACTIVITY_JOIN_ID: 'string|true',
	ACTIVITY_JOIN_ACTIVITY_ID: 'string|true|comment=报名PK',

	ACTIVITY_JOIN_IS_ADMIN: 'int|true|default=0|comment=是否管理员添加 0/1',

	ACTIVITY_JOIN_CODE: 'string|true|comment=核验码15位',
	ACTIVITY_JOIN_IS_CHECKIN: 'int|true|default=0|comment=是否签到 0/1 ',
	ACTIVITY_JOIN_CHECKIN_TIME: 'int|false|default=0|签到时间',

	ACTIVITY_JOIN_USER_ID: 'string|true|comment=用户ID',


	ACTIVITY_JOIN_FORMS: 'array|true|default=[]|comment=表单',

	ACTIVITY_JOIN_STATUS: 'int|true|default=1|comment=状态  0=待审核 1=报名成功, 99=审核未过',
	ACTIVITY_JOIN_REASON: 'string|false|comment=审核拒绝或者取消理由',

	ACTIVITY_JOIN_ADD_TIME: 'int|true',
	ACTIVITY_JOIN_EDIT_TIME: 'int|true',
	ACTIVITY_JOIN_ADD_IP: 'string|false',
	ACTIVITY_JOIN_EDIT_IP: 'string|false',
};

// 字段前缀
ActivityJoinModel.FIELD_PREFIX = "ACTIVITY_JOIN_";

/**
 * 状态 0=待审核 1=报名成功, 99=审核未过
 */
ActivityJoinModel.STATUS = {
	WAIT: 0,
	SUCC: 1,
	ADMIN_CANCEL: 99
};

ActivityJoinModel.STATUS_DESC = {
	WAIT: '待审核',
	SUCC: '成功',
	ADMIN_CANCEL: '审核未过'
};


module.exports = ActivityJoinModel;