<?php
/**
 * Book模型
 * buzhidao
 * 2016-07-21
 */

namespace Api\Model;

class BookModel extends CommonModel
{
    public function __construct()
    {
        parent::__construct();
    }

    //获取chapterlist
    public function getChapter($chapterid=null, $bookid=null)
    {
        $where = array();
        if ($chapterid) $where['chapterid'] = $chapterid;
        if ($bookid) $where['bookid'] = $bookid;

        $data = M('chapter')->where($where)->select();

        return is_array($data) ? $data : array();
    }

    //获取chapter - 通过chapterid
    public function getChapterByID($chapterid=null)
    {
        if (!$chapterid) return false;

        $chapterInfo = $this->getChapter($chapterid);

        return array_pop($chapterInfo);
    }

    //获取content
    public function getContent($contentid=null,$chapterid=null)
    {
        $where = array();
        if ($contentid) $where['contentid'] = $contentid;
        if ($chapterid) $where['chapterid'] = $chapterid;

        $data = M('content')->where($where)->select();

        return is_array($data) ? $data : array();
    }

    //获取content - 通过contentid
    public function getContentByID($contentid=null)
    {
        if (!$contentid) return false;

        $contentInfo = $this->getContent($contentid);

        return array_pop($contentInfo);
    }
}