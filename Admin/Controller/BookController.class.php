<?php
/**
 * Book
 * buzhidao
 * 2016-07-20
 */
namespace Admin\Controller;

use Any\Upload;

class BookController extends CommonController
{
    public function __construct()
    {
        parent::__construct();

        $this->booklist = D('Book')->getBook();
        $this->assign('booklist', $this->booklist);
    }

    //获取bookid
    private function _getBookid()
    {
        $bookid = mRequest('bookid');
        if (!$bookid) $bookid = 1;

        if (!$bookid) $this->ajaxReturn(1, '请选择宝典！');

        $this->assign('bookid', $bookid);
        return $bookid;
    }

    //获取chapterid
    private function _getChapterid()
    {
        $chapterid = mRequest('chapterid');
        if (!$chapterid) $this->ajaxReturn(1, '未知宝典目录！');

        $this->assign('chapterid', $chapterid);
        return $chapterid;
    }

    //获取contentid
    private function _getContentid()
    {
        $contentid = mRequest('contentid');

        $this->assign('contentid', $contentid);
        return $contentid;
    }

    //获取chaptertitle
    private function _getChaptertitle()
    {
        $chaptertitle = mRequest('chaptertitle');
        if (!$chaptertitle) $this->ajaxReturn(1, '请填写目录名称！');

        $this->assign('chaptertitle', $chaptertitle);
        return $chaptertitle;
    }

    //获取chaptericon
    private function _getChaptericon()
    {
        $chaptericon = mRequest('chaptericon');
        if (!$chaptericon) $this->ajaxReturn(1, '请上传目录图标！');

        $this->assign('chaptericon', $chaptericon);
        return $chaptericon;
    }

    //获取chapterbg
    private function _getChapterbg()
    {
        $chapterbg = mRequest('chapterbg');
        if (!$chapterbg) $this->ajaxReturn(1, '请上传目录页面背景图！');

        $this->assign('chapterbg', $chapterbg);
        return $chapterbg;
    }

    //获取contentbg
    private function _getContentbg()
    {
        $contentbg = mRequest('contentbg');
        if (!$contentbg) $this->ajaxReturn(1, '请上传目录内容背景图！');

        $this->assign('contentbg', $contentbg);
        return $contentbg;
    }

    //上传目录图标
    public function chaptericonupload()
    {
        //初始化上传类
        $Upload = new Upload();
        $Upload->maxSize  = 800*1024;
        $Upload->exts     = array('jpg', 'gif', 'png', 'jpeg');
        $Upload->rootPath = UPLOAD_PATH;
        $Upload->savePath = 'Book/chaptericon/';
        $Upload->saveName = array('uniqid', array('', true));
        $Upload->autoSub  = true;
        $Upload->subName  = array('date', 'Ym');

        //上传
        $error = null;
        $msg = '上传成功！';
        $data = array();
        $info = $Upload->upload();
        if (!$info) {
            $error = 1;
            $msg = $Upload->getError();
        } else {
            $fileinfo = array_shift($info);
            $data = array(
                'filepath' => '/'.UPLOAD_PT.$fileinfo['savepath'],
                'filename' => $fileinfo['savename'],
            );
        }

        $this->ajaxReturn($error, $msg, $data);
    }

    //上传目录页面背景图
    public function chapterbgupload()
    {
        //初始化上传类
        $Upload = new Upload();
        $Upload->maxSize  = 800*1024;
        $Upload->exts     = array('jpg', 'gif', 'png', 'jpeg');
        $Upload->rootPath = UPLOAD_PATH;
        $Upload->savePath = 'Book/chapterbg/';
        $Upload->saveName = array('uniqid', array('', true));
        $Upload->autoSub  = true;
        $Upload->subName  = array('date', 'Ym');

        //上传
        $error = null;
        $msg = '上传成功！';
        $data = array();
        $info = $Upload->upload();
        if (!$info) {
            $error = 1;
            $msg = $Upload->getError();
        } else {
            $fileinfo = array_shift($info);
            $data = array(
                'filepath' => '/'.UPLOAD_PT.$fileinfo['savepath'],
                'filename' => $fileinfo['savename'],
            );
        }

        $this->ajaxReturn($error, $msg, $data);
    }

    //上传目录内容背景图
    public function contentbgupload()
    {
        //初始化上传类
        $Upload = new Upload();
        $Upload->maxSize  = 800*1024;
        $Upload->exts     = array('jpg', 'gif', 'png', 'jpeg');
        $Upload->rootPath = UPLOAD_PATH;
        $Upload->savePath = 'Book/contentbg/';
        $Upload->saveName = array('uniqid', array('', true));
        $Upload->autoSub  = true;
        $Upload->subName  = array('date', 'Ym');

        //上传
        $error = null;
        $msg = '上传成功！';
        $data = array();
        $info = $Upload->upload();
        if (!$info) {
            $error = 1;
            $msg = $Upload->getError();
        } else {
            $fileinfo = array_shift($info);
            $data = array(
                'filepath' => '/'.UPLOAD_PT.$fileinfo['savepath'],
                'filename' => $fileinfo['savename'],
            );
        }

        $this->ajaxReturn($error, $msg, $data);
    }

    public function index(){}

    //chapter
    public function chapter()
    {
        $bookid = $this->_getBookid();
        $bookinfo = $this->booklist[$bookid];
        $this->assign('bookinfo', $bookinfo);

        $datalist = D('Book')->getChapter(null, $bookid);
        $this->assign('datalist', $datalist);

        $this->display();
    }

    //newchapter
    public function newchapter()
    {
        $bookid = $this->_getBookid();
        $bookinfo = $this->booklist[$bookid];
        $this->assign('bookinfo', $bookinfo);

        $this->display();
    }

    //newchaptersave
    public function newchaptersave()
    {
        $bookid = $this->_getBookid();

        $chaptertitle = $this->_getChaptertitle();
        $chaptericon = $this->_getChaptericon();
        $chapterbg = $this->_getChapterbg();
        $contentbg = $this->_getContentbg();

        $data = array(
            'bookid'       => $bookid,
            'chaptertitle' => $chaptertitle,
            'chaptericon'  => $chaptericon,
            'chapterbg'    => $chapterbg,
            'contentbg'    => $contentbg,
            'createtime'   => TIMESTAMP
        );
        $result = M('chapter')->add($data);
        if ($result) {
            $this->ajaxReturn(0, '保存成功！');
        } else {
            $this->ajaxReturn(1, '保存失败！');
        }
    }

    //edichapter
    public function editchapter()
    {
        $chapterid = $this->_getChapterid();
        if (!$chapterid) return false;

        $chapterinfo = D('Book')->getChapterByID($chapterid);
        $this->assign('chapterinfo', $chapterinfo);

        $bookinfo = $this->booklist[$chapterinfo['bookid']];
        $this->assign('bookinfo', $bookinfo);

        $this->display();
    }

    //editchaptersave
    public function editchaptersave()
    {
        $chapterid = $this->_getChapterid();
        if (!$chapterid) return false;

        $bookid = $this->_getBookid();

        $chaptertitle = $this->_getChaptertitle();
        $chaptericon = $this->_getChaptericon();
        $chapterbg = $this->_getChapterbg();
        $contentbg = $this->_getContentbg();

        $data = array(
            'bookid'       => $bookid,
            'chaptertitle' => $chaptertitle,
            'chaptericon'  => $chaptericon,
            'chapterbg'    => $chapterbg,
            'contentbg'    => $contentbg,
            'updatetime'   => TIMESTAMP
        );
        $result = M('chapter')->where(array('chapterid'=>$chapterid))->save($data);
        if ($result) {
            $this->ajaxReturn(0, '保存成功！');
        } else {
            $this->ajaxReturn(1, '保存失败！');
        }
    }

    //deletechapter
    public function deletechapter()
    {
        $chapterid = $this->_getChapterid();
        if (!$chapterid) return false;

        $result = M('chapter')->where(array('chapterid'=>$chapterid))->delete();
        if ($result) {
            $this->ajaxReturn(0, '删除成功！');
        } else {
            $this->ajaxReturn(1, '删除失败！');
        }
    }

    //content
    public function content()
    {
        $chapterid = $this->_getChapterid();
        if (!$chapterid) return false;

        $chapterlist = D('Book')->getChapter();
        $this->assign('chapterlist', $chapterlist);

        $chapterinfo = D('Book')->getChapterByID($chapterid);
        $this->assign('chapterinfo', $chapterinfo);

        $bookinfo = $this->booklist[$chapterinfo['bookid']];
        $this->assign('bookinfo', $bookinfo);

        $datalist = D('Book')->getContent(null, $chapterid);
        $this->assign('datalist', $datalist);

        $this->display();
    }

    //newcontent
    public function newcontent()
    {
        $this->display();
    }

    //newcontentsave
    public function newcontentsave()
    {
        
    }

    //editcontent
    public function editcontent()
    {
        $this->display();
    }

    //editcontentsave
    public function editcontentsave()
    {
        
    }

    //deletecontent
    public function deletecontent()
    {
        $contentid = $this->_getContentid();
        if (!$contentid) return false;

        $result = M('content')->where(array('contentid'=>$contentid))->delete();
        if ($result) {
            $this->ajaxReturn(0, '删除成功！');
        } else {
            $this->ajaxReturn(1, '删除失败！');
        }
    }
}