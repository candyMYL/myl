let mIdentify = require("./config")

let requestList = [];

function mRequest({
                      useIdentify = true, //是否需要identify
                      data = {},    // 参数
                      methoed = "GET",  // 请求方式
                      hasAgainRequest = true,   //是否需要进入请求队列
                      requestCount = 0, // 请求计数初始值
                      currentRequeestCount = 3, // 请求重试次数
                      success = null, // 成功函数
                      fail = null      // 失败函数
                  } = {}) {
    if (useIdentify) {
        data.identify = mIdentify;
    }
    if (mIdentify) {

    } else {
        requestList.push({
            useIdentify,
            data,
            methoed,
            hasAgainRequest,
            requestCount,
            currentRequeestCount,
            success,
            fail
        })
    }


    if (hasAgainRequest && requestCount < currentRequeestCount) {
        console.log(data);
        requestCount++;
        mRequest({
            useIdentify,
            data,
            methoed,
            requestCount,
            currentRequeestCount
        });
    }
}

mRequest({
    data: {
        user: 4556
    }
})

mRequest({
    useIdentify: false,
    hasAgainRequest: true,
    data: {
        user: 123
    },
    currentRequeestCount: 5
})










