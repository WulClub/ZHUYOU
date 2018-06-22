(function ($) {
    appcan.button("#nav-left", "btn-act",
        function () {
        });
    appcan.button("#nav-right", "btn-act",
        function () {
        });

    appcan.ready(function () {
        $.scrollbox($("body")).on("releaseToReload",
            function () { //After Release or call reload function,we reset the bounce
                $("#ScrollContent").trigger("reload", this);
            }).on("onReloading",
            function (a) { //if onreloading status, drag will trigger this event
            }).on("dragToReload",
            function () { //drag over 30% of bounce height,will trigger this event
            }).on("draging",
            function (status) { //on draging, this event will be triggered.
            }).on("release",
            function () { //on draging, this event will be triggered.
            }).on("scrollbottom",
            function () { //on scroll bottom,this event will be triggered.you should get data from server
                $("#ScrollContent").trigger("more", this);
            }).hide();
    })

    /*mvvm*/
    var Service = new MVVM.Service({
        pretreatment: function (data, option) {
            return data;
        },
        dosuccess: function (data, option) {
            //return data;
            console.log(data);
            var valueToR = [];

            var oneDayTime = 24 * 60 * 60 * 1000;
            var oneHTime = 60 * 60 * 1000;
            var oneMTime = 60 * 1000;
            if (data) {
                var topics = data.data;
                if (topics) {
                    for (var i in topics) {
                        var perTopic = topics[i]
                        if (perTopic) {
                            var theTargetObj = {};
                            theTargetObj.avator = httpUtil.serverHost+ perTopic.author.avatar_url;
                            theTargetObj.username = perTopic.author.loginname;
                            var lastReplyAt = new Date(perTopic.last_reply_at);

                            var curDate = new Date();
                            var agoTime = curDate.getTime() - lastReplyAt.getTime();

                            var timeTxt = '';
                            if (parseInt(agoTime / oneDayTime) > 0) {
                                timeTxt = parseInt(agoTime / oneDayTime) + '天前';
                            }
                            else if (parseInt(agoTime / oneHTime) > 0) {
                                timeTxt = parseInt(agoTime / oneHTime) + '小时前';
                            }
                            else if (parseInt(agoTime / oneMTime) > 0) {
                                timeTxt = parseInt(agoTime / oneMTime) + '分钟前';
                            }
                            else if (parseInt(agoTime / 1000) > 0) {
                                timeTxt = parseInt(agoTime / 1000) + '秒前';
                            }
                            theTargetObj.time = timeTxt;
                            theTargetObj.content = perTopic.content;
                            theTargetObj.topicId = perTopic.id;
                            valueToR.push(theTargetObj);
                        }
                    }
                }
            }
            return valueToR;
        },
        doerror: function (e, err, option) {
            return err;
        },
        validate: function (data, option) {
            return 0;
        },
        ajaxCall: function (data, option) {
            var self = this;
            var data = [{
                "avator": "\'main/css/myImg/comImg.png\'",
                "username": "AppCan论坛客户端网友",
                "time": "7小时前",
                "city": "北京市",
                "content": "兄弟你说的在理！",
                "followReply": [{
                    "replyName": "杰伦",
                    "replyContent": "这个快速开发工具相当好用，谢谢开发者和正益无线！"
                }],
                "praise": "9"
            }, {
                "avator": "\'main/css/myImg/icon1.png\'",
                "username": "一个猫",
                "time": "7小时前",
                "city": "北京市",
                "content": "蛮不错的平台。",
                "followReply": [],
                "praise": "12"
            }, {
                "avator": "\'main/css/myImg/icon2.png\'",
                "username": "啊呀呀",
                "time": "7小时前",
                "city": "北京市",
                "content": "蛮不错的平台，谢谢开发者！蛮不错的平台，谢谢开发者！蛮不错的平台，谢谢开发者！蛮不错的平台，谢谢开发者！",
                "followReply": [],
                "praise": "12"
            }, {
                "avator": "\'main/css/myImg/icon3.png\'",
                "username": "杰伦",
                "time": "7小时前",
                "city": "北京市",
                "content": "这个快速开发工具相当好用，谢谢开发者和正益无线！",
                "followReply": [],
                "praise": "12"
            }
                , {
                    "avator": "\'main/css/myImg/icon3.png\'",
                    "username": "杰伦",
                    "time": "7小时前",
                    "city": "北京市",
                    "content": "这个快速开发工具相当好用，谢谢开发者和正益无线！",
                    "followReply": [],
                    "praise": "12"
                }
                , {
                    "avator": "\'main/css/myImg/icon3.png\'",
                    "username": "杰伦",
                    "time": "7小时前",
                    "city": "北京市",
                    "content": "这个快速开发工具相当好用，谢谢开发者和正益无线！",
                    "followReply": [],
                    "praise": "12"
                }
                , {
                    "avator": "\'main/css/myImg/icon3.png\'",
                    "username": "杰伦",
                    "time": "7小时前",
                    "city": "北京市",
                    "content": "这个快速开发工具相当好用，谢谢开发者和正益无线！",
                    "followReply": [],
                    "praise": "12"
                }, {
                    "avator": "\'main/css/myImg/icon2.png\'",
                    "username": "啊呀呀",
                    "time": "7小时前",
                    "city": "北京市",
                    "content": "蛮不错的平台，谢谢开发者！蛮不错的平台，谢谢开发者！蛮不错的平台，谢谢开发者！蛮不错的平台，谢谢开发者！",
                    "followReply": [],
                    "praise": "12"
                }];
             //option.success(self.dosuccess(data, option));

            var _topicsRestful = "/topics";

            httpUtil.ajax({
                url: _topicsRestful,
                type: "GET",
                notNeedSessionKey:true,
                success: function (data) {
                    console.log(data)
                    var res = self.validate(data, option);
                    if (!res) option.success(self.dosuccess(data, option));
                    else option.error(self.doerror(data, res, option));
                },
                error: function (e, err) {
                    option.error(self.doerror(e, err, option));
                }
            });
        }
    });

    var Model_Collection = MVVM.Model.extend({
        defaults: {},
        computeds: {},
        sync: function (method, model, options) {
            switch (method) {
                case "create":

                    break;
                case "update":

                    break;
                case "patch":

                    break;
                case "delete":

                    break;
                default:
                    break;
            }
        }
    })
    var Collection = new (MVVM.Collection.extend({
        initialize: function () {
            return;
        },
        parse: function (data) {
            return data;
        },
        model: Model_Collection,
        sync: function (method, collection, options) {
            switch (method) {
                case "read":
                    Service.request({}, options);
                    break;
                default:
                    break;
            }
        }
    }))();
    var ViewModel = new (MVVM.ViewModel.extend({
        el: "#comment",
        events: {
            "reload": function () {
                alert('do reload');
            }
        },
        initialize: function () {
            this.collection.fetch({})
            return;
        },
        collection: Collection,
        itemEvents: {
            "tap #div_content": function (ev, param) {
                var thisTopicId = this.model.attributes.topicId;

                appcan.locStorage.setVal('curtopicid', thisTopicId);
                var _target = 'showtopic.html';
                appcan.window.open({
                    name: 'showtopic',
                    dataType: 0,
                    aniId: 2,
                    data: _target
                });
            }
        }

    }))();
})($);