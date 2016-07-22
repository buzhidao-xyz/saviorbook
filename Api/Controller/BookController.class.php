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

    //章节列表
    public function chapterlist()
    {
        $data = array(

        );
        $this->apiReturn(0, null, $data);
    }

    //章节内容
    public function chaptercontent()
    {
        $data = array(

        );
        $this->apiReturn(0, null, $data);
    }
}