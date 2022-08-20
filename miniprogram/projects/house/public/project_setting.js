module.exports = { //物业小区
	PROJECT_COLOR: '#0061AE',
	NAV_COLOR: '#ffffff',
	NAV_BG: '#0061AE',

	// setup
	SETUP_CONTENT_ITEMS: [
		{ title: '关于我们', key: 'SETUP_CONTENT_ABOUT' }, 
		{ title: '物业服务', key: 'SETUP_CONTENT_SERVICE' },
		{ title: '便民电话', key: 'SETUP_CONTENT_BIANMIN' },
		{ title: '联系物业', key: 'SETUP_CONTENT_PHONE' }, 
	],

	// 用户
	USER_REG_CHECK: false,
	USER_FIELDS: [
		{ mark: 'sex', title: '性别', type: 'select', selectOptions: ['男', '女'], must: true },
		{ mark: 'name', title: '房主姓名', type: 'text', must: true },
		{ mark: 'card', title: '身份证号', type: 'idcard', must: true },
		{ mark: 'card_img', title: '身份证正反面', type: 'image', len: 2, must: true },
		{ mark: 'house', title: '楼栋房号', type: 'text', must: true },
		{ mark: 'house_img', title: '房产证照片', type: 'image', len: 1, must: true },
	],

	NEWS_NAME: '资讯',
	NEWS_CATE: [
		{ id: 1, title: '物业公告', style: 'leftbig1' },
		{ id: 2, title: '小区规约', style: 'leftbig1' },
		{ id: 3, title: '业委会', style: 'leftbig1' },
		{ id: 4, title: '房屋租售', style: 'flow' },
	],
	NEWS_FIELDS: [],

	ACTIVITY_NAME: '活动',
	ACTIVITY_CATE: [
		{ id: 1, title: '公益活动' },
		{ id: 2, title: '室内活动' },
		{ id: 3, title: '户外活动' },
		{ id: 4, title: '其他活动' },
	],
	ACTIVITY_FIELDS: [
		{ mark: 'cover', title: '封面图片', type: 'image', min: 1, max: 1, must: true },
		{ mark: 'desc', title: '活动介绍', type: 'content' },
	],
	ACTIVITY_JOIN_FIELDS: [
		{ mark: 'name', type: 'text', title: '姓名', must: true, max: 30 },
		{ mark: 'phone', type: 'mobile', title: '手机', must: true, edit: false }
	],


	VOTE_NAME: '业主投票',
	VOTE_CATE: [
		{ id: 1, title: '业主投票' },
	],
	VOTE_FIELDS: [
		{ mark: 'cover', title: '封面图片', type: 'image', min: 1, max: 1, must: true },
		{ mark: 'desc', title: '投票须知', type: 'content', must: false },
	],

	TASK_NAME: '报事报修',
	TASK_TYPE: ['公共维修', '户内维修', '卫生家政', '代收代管', '搬家清运', '装修申请', '小区事务', '物业投诉', '热心建议', '其他事项'],
	TASK_LEVEL: ['紧急', '一般', '次要'],
	TASK_FIELDS: [
		{ mark: 'type', title: '填报类型', type: 'select', selectOptions: ['公共维修', '户内维修', '卫生家政', '代收代管', '搬家清运', '装修申请', '小区事务', '物业投诉', '热心建议', '其他事项'], must: true },
		{ mark: 'title', title: '标题', type: 'text', must: true },
		{ mark: 'level', title: '优先级', type: 'radio', selectOptions: ['紧急', '一般', '次要'], must: true },
		{ mark: 'building', title: '楼栋房号', type: 'text', must: true },
		{ mark: 'person', title: '联系人', type: 'text', must: true },
		{ mark: 'phone', title: '联系电话', type: 'text', must: true },
		{ mark: 'desc', title: '详细说明', type: 'textarea', must: true }, 
		{ mark: 'img', type: 'image', title: '相关图片', max: 8 },
	],
}