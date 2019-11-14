

        var msg=null;

        var cb = new Codebird;
        cb.setConsumerKey("[KEY]", "[SECRET]");


        chrome.runtime.onMessage.addListener(function (request,sender,sendResponse) {
            if (request.v_id != null){
                getVideoUrl(request.v_id);

                // setTimeout(function () {
                //     if (fetched==false) {
                //         try{
                //             window.stop();
                //         }catch(exception) {
                //             document.execCommand('Stop');
                //         }
                //
                //         msg="Unable to fetch tweet, check your internet connection";
                //         sendResponse({message:msg});
                //     }
                // },180000);
            }

            function getVideoUrl(u) {

                cb.__call(
                    "statuses_show_ID",
                    "id=" + u,
                    null, // no callback needed, we have the promise
                    true // app-only auth
                ).then(function (data) {

                        var i=0;
                        var video_url;

                        if (data.reply.extended_entities==null && data.reply.entities.media==null){
                            msg="The tweet contains no video or gif file (or it is not accessible)";
                            sendResponse({message:msg});

                        }else if((data.reply.extended_entities.media[0].type)!="video" && (data.reply.extended_entities.media[0].type)!="animated_gif"){
                            msg="The tweet contains no video or gif file (or it is not accessible)";
                            sendResponse({message:msg});
                        }
                        else{

                            video_url= data.reply.extended_entities.media[0].video_info.variants[i].url;

                            while (!video_url.includes(".mp4")){
                                video_url=data.reply.extended_entities.media[0].video_info.variants[i].url;
                                i=i+1;
                            }
                            download(video_url);
                        }

                    }).catch(
                        function (err) {
                            msg="Unable to fetch tweet, check your internet connection";
                            sendResponse({message:msg});
                            console.log(err);
                        });

            }


            function download(video_url) {


                $('<a/>', {
                    "href": video_url,
                    "download": "video.mp4",
                    id: "videoDownloadLink"
                }).appendTo(document.body);
                $('#videoDownloadLink').get(0).click();
                $('#videoDownloadLink').remove();

            }
            return true;
        });




// https://twitter.com/ahmedmolawale/status/845643602965483520

