/** 
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2022-07-16 07:48:00 
 */
const pageHelper = require('../../../../../helper/page_helper.js');
const cloudHelper = require('../../../../../helper/cloud_helper.js');
const ProjectBiz = require('../../../biz/project_biz.js');
const PassportBiz = require('../../../../../comm/biz/passport_biz.js');

Page({

	/**
	 * 页面的初始数据
	 */
	data: {

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad(options) {
		ProjectBiz.initPage(this);

		this._getSearchMenu();
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow() {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom() {

	},

	url: function (e) {
		pageHelper.url(e, this);
	},
	myCommListListener: function (e) {
		pageHelper.commListListener(this, e);
	},

	/** 搜索菜单设置 */
	_getSearchMenu: function () {
		let sortItem1 = [
			{ label: '全部', type: '', value: '' },
			{ label: '按时间倒序', type: 'timedesc', value: '' },
			{ label: '按时间正序', type: 'timeasc', value: '' }]; 

		this.setData({
			search: '',
			sortItems: [],
			sortMenus: sortItem1,
			isLoad: true
		});

	},

	bindCancelTap: async function (e) {
		if (!await PassportBiz.loginMustCancelWin(this)) return;

		let voteId = pageHelper.dataset(e, 'vid');
		let id = pageHelper.dataset(e, 'id');

		let cb = async () => {
			try {
				let params = {
					voteId
				}
				let opts = {
					title: '取消中'
				}

				await cloudHelper.callCloudSumbit('vote/my_cancel', params, opts).then(res => {
					pageHelper.delListNode(id, this.data.dataList.list, '_id');
					this.data.dataList.total--;
					this.setData({
						dataList: this.data.dataList
					});
					pageHelper.showSuccToast('取消成功', 1500);
				});
			} catch (err) {
				console.log(err);
			}
		}

		pageHelper.showConfirm('确认取消? 取消不可恢复', cb);
	}
})