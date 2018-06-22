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

        loadUserData();
    })
     //
    function loadUserData()
    {
        var loginname=appcan.locStorage.getVal('loginname');

        if(loginname)
        {
            var showUserUrl='/user/'+loginname;
            httpUtil.ajax({
                url:showUserUrl ,
                notNeedSessionKey:true,
                type: "GET",
                success: function (data) {

                    var dataInfo=JSON.parse(data);
                    if(dataInfo)
                    {
                        var userData=dataInfo.data;

                        $("#userId").html(userData.loginname);
                        $('#changeAvator').css('background-image','url('+httpUtil.serverHost+userData.avatar_url+')')

                    }

                },
                error: function (e, err) {
                    console.log(err)
                }
            });
        }

    }
    //清除缓存
    appcan.button("#clearCache", "btn-act",function(){
        var storageKeys=['sessionID','loginname'];
        for(var i in storageKeys)
        {
            var perKey=storageKeys[i];
            appcan.locStorage.remove(perKey);
        }
        alert('清除完成')
    });
    //更换头像
    appcan.button("#changeAvator", "btn-act",
        function () {
            var sessionKey = appcan.locStorage.getVal('sessionID');

            if (!sessionKey){

                httpUtil.goLogin();
                return;

            }
            uexImage.onCropperClosed = function (info) {
                var jsonObj = JSON.parse(info);
                if (jsonObj) {
                    if (jsonObj.isCancelled == false)//不是取消关闭
                    {
                        uploadImageFile(jsonObj.data);

                    }
                } else {
                    alert('剪裁头像异常')
                }


            }
            var param = {
                quality: 0.8,
                mode: 2
            }

            uexImage.openCropper(param);

        });

    function uploadImageFile(path) {
       // alert(path);
        var uploadApiUrl=httpUtil.serverHost+'/api/v1//user/avatar/update'
        var param = {
            url:uploadApiUrl,
            type: 1
        };
        var uploader = uexUploaderMgr.create(param);
        if (uploader) {

            var sessionKey = appcan.locStorage.getVal('sessionID');
            if (sessionKey) {
                var headJson = {"sessionID": sessionKey};
                uexUploaderMgr.setHeaders(uploader, JSON.stringify(headJson));
            }
            else {

                httpUtil.goLogin();
                  return;

            }

            var uploadCallback = function (packageSize, percent, responseString, status) {
                if (status == 1) {
                    var resultJson=JSON.parse(responseString);
                    if(resultJson&&resultJson.success)
                    {
                        $('#changeAvator').css('background-image','url('+httpUtil.serverHost+resultJson.url+')')
                    }

                }
                if (status == 2) {
                    alert(responseString);


                }
            }
            uexUploaderMgr.uploadFile(uploader, path, 'file', 0, 50, uploadCallback);

        }

    }
})($);