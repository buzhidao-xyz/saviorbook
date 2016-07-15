define([], function (){
    return {
        host: "http://localhost/work/saviorbook/",
        article: {
            articlelist: {
                m: "get",
                u: "Api/Json/articlelist.json"
            },
            articleprofile: {
            	m: "get",
                u: "Api/Json/articleprofile.json"
            }
        }
    }
});