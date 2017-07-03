
$("document").ready(function () {

    $('.click').hide();

    $('.help').click(function () {
        $(this).siblings($('.click')).slideToggle();
    });

    $('.myDownload').click(function () {


        chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {

            if (tabs[0].url == undefined || (tabs[0].url).indexOf("twitter.com") == -1) {
                $('.noti-text').text("Sorry!! TwittaSave extension can only be used on Twitter.");
                showNoti(true);
            }
            else {
                var s_url = tabs[0].url.split("/")[5];
                if (s_url != null) {

                    showSpin(true);
                    showNoti(false);
                    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                        chrome.tabs.sendMessage(tabs[0].id, {v_id: s_url}, function (response) {

                            // alert(response.message);
                            if (response.message != null) {
                                showSpin(false);
                                $('.noti-text').text(response.message);
                                showNoti(true);
                            }
                        })
                    });
                }

            }

        });

    });

    function showSpin(tf) {
        if (tf==true){
            $(".spin").prop("hidden", false);
        }else{
            $(".spin").prop("hidden", true);
        }
    }

    function showNoti(tf) {
        if (tf==true){
            $(".noti").prop("hidden", false);
        }else{
            $(".noti").prop("hidden", true);
        }
    }

});

