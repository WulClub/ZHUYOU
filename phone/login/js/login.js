(function($) {
    appcan.button("#nav-left", "btn-act",
    function() {});
    appcan.button("#nav-right", "btn-act",
    function() {});

    appcan.ready(function() {

    });

    $("#username").val('wulong');
    $("#password").val('wul123456');

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
                    var jsonData = data;
                     
                appcan.locStorage.setVal('sessionID',jsonData.data.sessionid);
                appcan.locStorage.setVal('loginname',$("#username").val());

                  var _target = 'main.html';

                  if(window.uexWindow)
                  {
                      appcan.window.open({
                          name : 'main',
                          dataType : 0,
                          aniId : 2,
                          data : _target
                      });
                  }else{
                      window.location.href=_target;
                  }

                },
                error: function(e, err) {
                    alert(err)
                     console.log(e);
                }
            }); 
    });
    
})($);