define([], function (){
    return {
        host: "http://www.wanganyi.net/saviorbook/",
        book: {
            chapterlist: {
                m: "get",
                u: "Api/index.php?s=Book/chapterlist"
            },
            chaptercontent: {
                m: "get",
                u: "Api/index.php?s=Book/chaptercontent"
            }
        }
    }
});