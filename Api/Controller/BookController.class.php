<?php
/**
 * Book
 * buzhidao
 * 2016-07-21
 */
namespace Api\Controller;

class BookController extends CommonController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function index(){}

    //获取bookid
    private function _getBookid($ischeck=false)
    {
        $bookid = mRequest('bookid');
        if ($ischeck&&!$bookid) $this->apiReturn(1, '未知宝典名称！');

        return $bookid;
    }

    //获取chapterid
    private function _getChapterid($ischeck=false)
    {
        $chapterid = mRequest('chapterid');
        if ($ischeck&&!$chapterid) $this->apiReturn(1, '未知宝典目录！');

        return $chapterid;
    }

    //章节列表
    public function chapterlist()
    {
        $bookid = $this->_getBookid(true);

        //获取chapterlist
        $chapterlist = D('Book')->getChapter(null, $bookid);

        $data = array();
        if (is_array($chapterlist)&&!empty($chapterlist)) {
            foreach ($chapterlist as $chapter) {
                $data[] = array(
                    'bookid' => $chapter['bookid'],
                    'chapterid' => $chapter['chapterid'],
                    'chaptertitle' => $chapter['chaptertitle'],
                    'chaptericon' => ImageURL($chapter['chaptericon']),
                );
            }
        }

        $this->apiReturn(0, null, $data);
    }

    //章节内容
    public function chaptercontent()
    {
        $chapterid = $this->_getChapterid(true);

        //chapterinfo
        $chapterinfo = D('Book')->getChapterByID($chapterid);

        //获取contentlist
        $contentlist = D('Book')->getContent(null, $chapterid);

        $data = array();
        if (is_array($contentlist)&&!empty($contentlist)) {
            foreach ($contentlist as $content) {
                $data[] = array(
                    'contentid' => $content['contentid'],
                    'title' => $content['title'],
                    'titleicon' => ImageURL($content['titleicon']),
                    'titleiconhover' => ImageURL($content['titleiconhover']),
                    'content' => htmlspecialchars_decode($content['content']),
                );
            }
        }

        $this->apiReturn(0, null, array(
            'chapter' => array(
                'chapterid' => $chapterinfo['chapterid'],
                'chaptertitle' => $chapterinfo['chaptertitle'],
                'chaptericon' => ImageURL($chapterinfo['chaptericon']),
                'chapterbg' => ImageURL($chapterinfo['chapterbg']),
                'contentbg' => ImageURL($chapterinfo['contentbg']),
            ),
            'content' => $data
        ));
    }
}