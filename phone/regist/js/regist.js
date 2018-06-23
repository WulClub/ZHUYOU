(function($) {
    appcan.button("#nav-left", "btn-act",
    function() {});
    appcan.button("#nav-right", "btn-act",
    function() {});


	appcan.ready(function() {
        })
        appcan.button("#submit", "ani-act", function() {
            httpUtil.ajax({
                url: '/signup',
                type: "POST",
                notNeedSessionKey:true,
                data : {
                    email : $("#email").val(),
                    loginname : $("#loginname").val(),
                    pass : $("#pass").val(),
                    re_pass : $("#re_pass").val()
                },
                success: function(data) {
                    var jsonData = JSON.parse(data);
/*

                    var _target = 'main.html';
                    appcan.window.open({
                        name : 'main',
                        dataType : 0,
                        aniId : 2,
                        data : _target
                    });*/
                },
                error: function(e, err) {
                    alert(err)
                    console.log(e);
                }
            });
        })
})($);