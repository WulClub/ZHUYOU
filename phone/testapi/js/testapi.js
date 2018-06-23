(function($) {
    appcan.button("#nav-left", "btn-act",
        function() {});
    appcan.button("#nav-right", "btn-act",
        function() {});


    appcan.ready(function() {
    })
    appcan.button("#submit", "ani-act", function() {
        httpUtil.ajax({
            url: '/topics',
            type: "POST",
            notNeedSessionKey:true,
            data : {
                title : $("#title").val(),
                tab : $("#tab").val(),
                content : $("#content").val()
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
    })
})($);