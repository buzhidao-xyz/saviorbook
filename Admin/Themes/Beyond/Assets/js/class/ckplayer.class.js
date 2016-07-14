/**
 * 课程视频播放类
 * buzhidao
 * 2015-12-12
 */
/**
 * [CourseVideoClass description]
 */
var ckplayerClass = function () {
    var videofile = $("#logvideo").attr('videofile');

    //初始化CKobject对象
    var flashvars={
        f:videofile,
        i: '',
        c:1,
        x:'ckplayer.xml',
        p:0,
        wh:'16:9',
        e:6,
        b:0
    };
    var params={
        bgcolor:'#FFF',
        allowFullScreen:true,
        allowScriptAccess:'always',
        wmode:'transparent'
    };
    CKobject.embedSWF(PUBLIC_SERVER+'plugin/ckplayer/ckplayer.swf','logvideo','ckplayer_logvideo','800','450',flashvars,params);
}
