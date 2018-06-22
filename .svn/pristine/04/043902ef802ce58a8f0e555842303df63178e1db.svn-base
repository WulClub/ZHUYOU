(function ($) {
    appcan.button("#nav-left", "btn-act",
        function () {
        });
    appcan.button("#nav-right", "btn-act",
        function () {
        });

    var tabview = appcan.tab({
        selector: "#tabview",
        hasIcon: true,
        hasAnim: false,
        hasLabel: true,
        hasBadge: true,
        data: [{
            label: "首页",
            icon: "fa-home"
        }, {
            label: "新建",
            icon: "fa-plus-square-o"
        }, {
            label: "我",
            icon: "fa-user"
        }]

    });
    tabview.on("click", function (obj, index) { /*TAB变更时切换多浮动窗口*/

        appcan.window.selectMultiPopover("content", index);
    })

    appcan.ready(function () {
        $.scrollbox($("body")).on("releaseToReload",
            function () { //After Release or call reload function,we reset the bounce
                alert("releaseToReload")
                $("#ScrollContent").trigger("reload", this);
            }).on("onReloading",
            function (a) { //if onreloading status, drag will trigger this event
                alert("onReloading")
            }).on("dragToReload",
            function () { //drag over 30% of bounce height,will trigger this event
                alert("dragToReload")
            }).on("draging",
            function (status) { //on draging, this event will be triggered.

                console.log(status)
                $("#comment").trigger("reload", this);
            }).on("release",
            function () { //on draging, this event will be triggered.
                // alert("release")
            }).on("scrollbottom",
            function () { //on scroll bottom,this event will be triggered.you should get data from server
                alert("scrollbottom")
                $("#ScrollContent").trigger("more", this);
            }).hide();

        var top = $('#header').offset().height;
        var bottom = $('#tabview').offset().height;
        appcan.frame.open({
            /*创建多浮动窗口*/
            id: "content",
            url: [{
                "inPageName": "main",
                "inUrl": "mainFirst.html"
            },
             {
                "inPageName": "creattopic",
                "inUrl": "creattopic.html"
            },
            {
                "inPageName": "personal",
                "inUrl": "personal.html"
            }],
            top: top,

            left: 0,
            index: 0,
            change: function (index, res) { /*浮动窗口推拽变更时回调，可控制tab进行同步变更*/
                tabview.moveTo(res.multiPopSelectedIndex);
            }
        });

        window.onorientationchange = window.onresize = function () {
            var y = $('#header').offset().height;
            var x = $('#header').offset().width;
            var h = $('#content').offset().height;
            console.log('content-'+h)
            uexWindow.setMultiPopoverFrame("content", 0, y, x, h)
        }


    })

})($);