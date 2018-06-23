(function ($) {
    appcan.button("#nav-left", "btn-act",
        function () {
        });
    appcan.button("#nav-right", "btn-act",
        function () {
        });

    appcan.ready(function () {

    })

    var topicId='';
    appcan.button("#doReply", "btn-act",
        function () {
        var url="/topic/"+topicId+"/replies";
            httpUtil.ajax({
                url: url,
                type: "POST",
                notNeedSessionKey:true,
                data : {

                    content : $("#replycontent").val()
                },
                success: function(data) {
                    var jsonData =  data ;
                    console.log(jsonData)
                },
                error: function(e, err) {
                    alert(err)
                    console.log(e);
                }
            });
        });

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
                            perTopic.avator_url = httpUtil.serverHost+ perTopic.author.avatar_url;
                            perTopic.loginname = perTopic.author.loginname;
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
                            // theTargetObj.time = timeTxt;
                            // theTargetObj.content = perTopic.content;
                            // theTargetObj.topicId = perTopic.id;
                            // theTargetObj.replies = perTopic.replies;
                            // theTargetObj.replies = perTopic.replies;
                            // valueToR.push(theTargetObj);
                            perTopic.time=timeTxt;
                        }
                    }
                }
            }
            return data.data;
        },
        doerror: function (e, err, option) {
            return err;
        },
        validate: function (data, option) {
            return 0;
        },
        ajaxCall: function (data, option) {
            var self = this;

             // option.success(self.dosuccess(data, option));

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
                topicId=thisTopicId;
                /*appcan.locStorage.setVal('curtopicid', thisTopicId);
                var _target = 'showtopic.html';
                appcan.window.open({
                    name: 'showtopic',
                    dataType: 0,
                    aniId: 2,
                    data: _target
                });*/
            }
        }

    }))();
})($);