/**
 * Notes:  健康监测实体
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2022-08-12 19:20:00 
 */


const BaseProjectModel = require('./base_project_model.js');

class TaskModel extends BaseProjectModel {

}

// 集合名
TaskModel.CL = BaseProjectModel.C('task');

TaskModel.DB_STRUCTURE = {
	_pid: 'string|true',
	TASK_ID: 'string|true',
	TASK_USER_ID: 'string|true|comment=用户ID', 

	TASK_STATUS: 'int|true|default=0|comment=状态 0=待处理,1=处理中 9=已办结',

	TASK_FORMS: 'array|true|default=[]',
	TASK_OBJ: 'object|true|default={}',

	TASK_LAST_TIME: 'int|true|default=0',

	TASK_ADD_TIME: 'int|true',
	TASK_EDIT_TIME: 'int|true',
	TASK_ADD_IP: 'string|false',
	TASK_EDIT_IP: 'string|false',
};

// 字段前缀
TaskModel.FIELD_PREFIX = "TASK_";

/**
 * 状态 0=待处理,1=处理中 9=已办结
 */
TaskModel.STATUS = {
	UNUSE: 0,
	COMM: 1,
	OVER: 9
};

TaskModel.STATUS_DESC = {
	UNUSE: '待处理',
	COMM: '处理中',
	OVER: '已办结',
};




module.exports = TaskModel;