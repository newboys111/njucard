const cloudHelper = require('../../../../../helper/cloud_helper.js');
const pageHelper = require('../../../../../helper/page_helper.js');
const ProjectBiz = require('../../../biz/project_biz.js');
const PassportBiz = require('../../../../../comm/biz/passport_biz.js');

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		isLoad: false,

		loading: false,
		formSelected: []
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		ProjectBiz.initPage(this);

		if (!pageHelper.getOptions(this, options)) return;
		this._loadDetail();
	},

	_loadDetail: async function () {
		let id = this.data.id;
		if (!id) return;

		let params = {
			id,
		};
		let opt = {
			title: 'bar'
		};
		let vote = await cloudHelper.callCloudData('vote/view', params, opt);
		if (!vote) {
			this.setData({
				isLoad: null
			})
			return;
		}

		this.setData({
			isLoad: true,
			vote,
		});

	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () { },

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () { },

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () { },

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () { },

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: async function () {
		await this._loadDetail();
		wx.stopPullDownRefresh();
	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () { },

	bindVoteTap: async function (e) {
		if (!await PassportBiz.loginMustCancelWin(this)) return;

		if (this.data.formSelected.length == 0) {
			return pageHelper.showModal('您尚未选择任何选项，请先选择');
		}

		try {
			let params = {
				voteId: this.data.id,
				selected: this.data.formSelected
			}
			let opts = {
				title: '提交中'
			}

			await cloudHelper.callCloudSumbit('vote/do', params, opts).then(res => {
				let cb = () => {
					wx.redirectTo({
						url: 'vote_detail?id=' + this.data.id,
					});
				}
				pageHelper.showSuccToast('投票成功', 1500, cb);
			});
		} catch (err) {
			console.log(err);
		}


	},

	bindCancelVoteTap: async function (e) {
		if (!await PassportBiz.loginMustCancelWin(this)) return;
		let cb = async () => {
			try {
				let params = {
					voteId: this.data.id,
				}
				let opts = {
					title: '取消中'
				}

				await cloudHelper.callCloudSumbit('vote/my_cancel', params, opts).then(res => {
					let callback = () => {
						wx.redirectTo({
							url: 'vote_detail?id=' + this.data.id,
						});
					}
					pageHelper.showSuccToast('取消成功', 1500, callback);
				});
			} catch (err) {
				console.log(err);
			}
		}

		pageHelper.showConfirm('确认取消该投票?', cb);
	},

	url: function (e) {
		pageHelper.url(e, this);
	},

	onPageScroll: function (e) {
		// 回页首按钮
		pageHelper.showTopBtn(e, this);

	},

	onShareAppMessage: function (res) {
		return {
			title: this.data.vote.VOTE_TITLE,
			imageUrl: this.data.vote.VOTE_OBJ.cover[0]
		}
	},

	modelRadio: function (e) {
		let idx = Number(e.detail.value);
		let formSelected = [idx];
		this.setData({
			formSelected
		});
	},

	modelCheckbox: function (e) {
		this.setData({
			formSelected: e.detail.value
		});
	},
})