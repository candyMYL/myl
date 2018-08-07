let mIdentify = require("./config")

let requestList = [];

function mRequest({
                      url = '',
                      useIdentify = true, //是否需要identify
                      data = {},    // 参数
                      methoed = "GET",  // 请求方式
                      hasAgainRequest = true,   //是否需要重试
                      currentRequestCount = 0, // 请求计数初始值
                      requestCount = 3, // 请求重试次数
                      success = null, // 成功函数
                      fail = null      // 失败函数
                  } = {}) {
    if (useIdentify && mIdentify) {
        console.log(1)
        data.identify = mIdentify;
    }
    debugger
    if (useIdentify && !mIdentify) {
        console.log(2)
        requestList.push({
            url,
            useIdentify,
            data,
            methoed,
            hasAgainRequest,
            requestCount,
            currentRequestCount,
            success,
            fail
        })
        console.log(requestList);
        return;
    }
    wx.request({
        url,
        data,
        methoed,
        success(res) {
            console.log(3)
            success && success(res)
        },
        fail(res) {
            if (hasAgainRequest && requestCount > currentRequestCount) {
                console.log(4)
                currentRequestCount++;
                mRequest({
                    url,
                    useIdentify,
                    data,
                    methoed,
                    requestCount,
                    currentRequestCount
                });
            } else {
                console.log(5)
                fail && fail(res)
            }
        }
    })
}

mRequest({
    url:'https://kaifa.aijiatui.com/service/app_924c26cce748dcc0/card_detail_v2.rq',
    data: {
        card_id:'efc6e5764ee5f459'
    }
})

module.exports = mRequest;










