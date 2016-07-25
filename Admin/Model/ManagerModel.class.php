<?php
/**
 * 管理员数据模型
 * 2015-07-12
 * buzhidao
 */
namespace Admin\Model;

class ManagerModel extends CommonModel
{
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * 获取管理员访问权限菜单
     * @param  integer $super     是否超级管理员 如果是直接获取全部功能菜单 0否 1是
     * @param  string  $roleid    管理员角色id
     * @return array              节点菜单 已格式化
     */
    public function getManagerAccess()
    {
        //权限菜单
        $access = array();

        //管理员角色-节点菜单
        $groupids = array(0);
        $nodeids = array(0);

        $groupids = array();
        $nodeids = array();
        
        //获取组菜单
        $grouplist = D('Menu')->getGroup($groupids);
        if ($grouplist['total']) {
            foreach ($grouplist['data'] as $group) {
                $group['nodelist'] = array();
                $access[$group['groupid']] = $group;
            }
        }
        // dump($grouplist);exit;
        //获取节点菜单
        $nodelist = D('Menu')->getNode($nodeids);
        //组合节点菜单 支持三级
        $accessnode = array();
        if ($nodelist['total']) {
            foreach ($nodelist['data'] as $node) {
                $node['nodelist'] = array();
                //一级节点
                $accessnode[$node['nodeid']] = $node;

                $pnodeid = $node['pnodeid'];
                if ($pnodeid) {
                    //二级节点
                    $accessnode[$pnodeid]['nodelist'][$node['nodeid']] = $node;

                    $ppnodeid = $accessnode[$pnodeid]['pnodeid'];
                    if (isset($accessnode[$ppnodeid])) {
                        //三级节点
                        $accessnode[$ppnodeid]['nodelist'][$pnodeid] = $accessnode[$pnodeid];
                    }
                }
            }
        }
        
        //组合组-节点菜单
        foreach ($accessnode as $d) {
            if ($d['groupid']&&!$d['pnodeid']) $access[$d['groupid']]['nodelist'][$d['nodeid']] = $d;
        }

        return $access;
    }

    //加密管理员密码
    public function passwordEncrypt($password=null)
    {
        return md5($password);
    }

    //获取管理员
    public function getManager($managerid=null, $account=null, $username=null, $start=0, $length=9999)
    {
        if ($start==0 && $length==0) return array();
        
        $where = array();
        if ($managerid) $where['a.managerid'] = $managerid;
        if ($account) $where['a.account'] = array('like', '%'.$account.'%');

        $total  = M('manager')->alias("a")->field('a.managerid')->where($where)->count();
        $data = M('manager')->alias('m')->field('m.*')->select();

        return array('total'=>$total, 'data'=>$data);
    }

    //获取管理员通过ID
    public function getManagerByID($managerid=null)
    {
        if (!$managerid) return false;
        $manager = $this->getManager($managerid);

        return $manager['total']>0 ? array_pop($manager['data']) : array();
    }

    //获取管理员通过account
    public function getManagerByAccount($account=null)
    {
        if (!$account) return false;
        $manager = $this->getManager(null,$account);
        if ($manager['total'] > 0) {
            foreach ($manager['data'] as $d) {
                if ($d['account'] == $account) return $d;
            }
        }

        return array();
    }
}