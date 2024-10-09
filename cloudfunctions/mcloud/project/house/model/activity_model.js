/**
 * Notes: 活动实体
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2022-06-23 19:20:00 
 */

const BaseProjectModel = require('./base_project_model.js');

class ActivityModel extends BaseProjectModel {

}

// 集合名
ActivityModel.CL = BaseProjectModel.C('activity');

ActivityModel.DB_STRUCTURE = {
	_pid: 'string|true',
	ACTIVITY_ID: 'string|true',

	ACTIVITY_TITLE: 'string|true|comment=标题',
	ACTIVITY_STATUS: 'int|true|default=1|comment=状态 0=未启用,1=使用中',

	ACTIVITY_CATE_ID: 'string|true|default=0|comment=分类',
	ACTIVITY_CATE_NAME: 'string|false|comment=分类冗余',

	ACTIVITY_CANCEL_SET: 'int|true|default=1|comment=取消设置 0=不允,1=允许,2=仅截止前可取消',
	ACTIVITY_CHECK_SET: 'int|true|default=0|comment=审核 0=不需要审核,1=需要审核', 
	ACTIVITY_IS_MENU: 'int|true|default=1|comment=是否公开展示名单',

	ACTIVITY_MAX_CNT: 'int|true|default=20|comment=人数上限 0=不限',
	ACTIVITY_START: 'int|false|comment=活动开始时间',
	ACTIVITY_END: 'int|false|comment=活动截止时间',
	ACTIVITY_STOP: 'int|true|default=0|comment=报名截止时间 0=永不过期',

	ACTIVITY_ORDER: 'int|true|default=9999',
	ACTIVITY_VOUCH: 'int|true|default=0',

	ACTIVITY_FORMS: 'array|true|default=[]',
	ACTIVITY_OBJ: 'object|true|default={}',

	ACTIVITY_JOIN_FORMS: 'array|true|default=[]',

	ACTIVITY_ADDRESS: 'string|false|comment=详细地址',
	ACTIVITY_ADDRESS_GEO: 'object|false|comment=详细地址坐标参数',

	ACTIVITY_QR: 'string|false',
	ACTIVITY_VIEW_CNT: 'int|true|default=0',
	ACTIVITY_JOIN_CNT: 'int|true|default=0',

	ACTIVITY_ADD_TIME: 'int|true',
	ACTIVITY_EDIT_TIME: 'int|true',
	ACTIVITY_ADD_IP: 'string|false',
	ACTIVITY_EDIT_IP: 'string|false',
};

// 字段前缀
ActivityModel.FIELD_PREFIX = "ACTIVITY_";

/**
 * 状态 0=未启用,1=使用中 
 */
ActivityModel.STATUS = {
	UNUSE: 0,
	COMM: 1
};



module.exports = ActivityModel;