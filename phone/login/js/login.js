(function($) {
    appcan.button("#nav-left", "btn-act",
    function() {});
    appcan.button("#nav-right", "btn-act",
    function() {});

    appcan.ready(function() {
        $.scrollbox($("body")).on("releaseToReload",
        function() { //After Release or call reload function,we reset the bounce
            $("#ScrollContent").trigger("reload", this);
        }).on("onReloading",
        function(a) { //if onreloading status, drag will trigger this event
        }).on("dragToReload",
        function() { //drag over 30% of bounce height,will trigger this event
        }).on("draging",
        function(status) { //on draging, this event will be triggered.
        }).on("release",
        function() { //on draging, this event will be triggered.
        }).on("scrollbottom",
        function() { //on scroll bottom,this event will be triggered.you should get data from server
            $("#ScrollContent").trigger("more", this);
        }).hide();

        $("#username").val('wulong1');
        $("#password").val('wul123456')
    });

	appcan.button("#submit", "ani-act", function() {

        
        httpUtil.ajax({
                url: '/signin',
                type: "POST",
                notNeedSessionKey:true,
                 data : {
                name : $("#username").val(),
                pass : $("#password").val()
            },
                success: function(data) {
                    var jsonData = JSON.parse(data);
                     
                appcan.locStorage.setVal('sessionID',jsonData.data.sessionid);
                appcan.locStorage.setVal('loginname',$("#username").val());

                  var _target = 'main.html';
                  appcan.window.open({
                         name : 'main',
                         dataType : 0,
                         aniId : 2,
                         data : _target
                         });
                },
                error: function(e, err) {
                    alert(err)
                     console.log(e);
                }
            }); 
    });
    
})($);