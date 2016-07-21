<?php
/**
 * 书
 * imbzd
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
}