/**
 * Notes: 活动模块业务逻辑
 * Ver : CCMiniCloud Framework 2.0.1 ALL RIGHTS RESERVED BY cclinux0730 (wechat)
 * Date: 2022-06-24 07:48:00 
 */

const BaseBiz = require('../../../comm/biz/base_biz.js');
const pageHelper = require('../../../helper/page_helper.js');
const cloudHelper = require('../../../helper/cloud_helper.js');
const projectSetting = require('../public/project_setting.js');

class ActivityBiz extends BaseBiz {

	static getCateName(cateId) {
		let cateList = projectSetting.ACTIVITY_CATE;

		for (let k = 0; k < cateList.length; k++) {
			if (cateList[k].id == cateId) {
				return cateList[k].title;
			}
		}
		return '';
	}

	static getCateList() {

		let cateList = projectSetting.ACTIVITY_CATE;

		let arr = [];
		for (let k = 0; k < cateList.length; k++) {
			arr.push({
				label: cateList[k].title,
				type: 'cateId',
				val: cateList[k].id, //for options form
				value: cateList[k].id, //for list menu
			})
		}

		return arr;
	}

	static setCateTitle() {

		let curPage = pageHelper.getPrevPage(1);
		if (!curPage) return;

		let cateId = null;
		if (curPage.options && curPage.options.id) {
			cateId = curPage.options.id;
		}
		let cateList = projectSetting.ACTIVITY_CATE;
		for (let k = 0; k < cateList.length; k++) {
			if (cateList[k].id == cateId) {
				wx.setNavigationBarTitle({
					title: cateList[k].title
				});
				return;
			}
		}

	}

	 

	static async cancelMyActivityJoin(activityJoinId, callback) {
		let cb = async () => {
			try {
				let params = {
					activityJoinId
				}
				let opts = {
					title: '取消中'
				}

				await cloudHelper.callCloudSumbit('activity/my_join_cancel', params, opts).then(res => {
					pageHelper.showSuccToast('已取消', 1500, callback);
				});
			} catch (err) {
				console.log(err);
			}
		}

		pageHelper.showConfirm('确认取消该报名?', cb);
	}


	static openMap(address, geo) {
		if (geo && geo.latitude)
			wx.openLocation({
				latitude: geo.latitude,
				longitude: geo.longitude,
				address,
				scale: 18
			})
		else {
			wx.setClipboardData({
				data: address,
				success(res) {
					wx.getClipboardData({
						success(res) {
							pageHelper.showNoneToast('已复制到剪贴板，请在地图APP里查询');
						}
					})
				}
			});
		}
	}
}

module.exports = ActivityBiz;