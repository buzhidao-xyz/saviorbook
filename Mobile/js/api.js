define([], function (){
    return {
        host: "http://localhost/work/saviorbook/",
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