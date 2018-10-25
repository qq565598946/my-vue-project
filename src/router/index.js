import Vue from 'vue'
import Router from 'vue-router'
import projectlist from '@/components/projectlist'
import listaudit from '@/projectaudit/listaudit'
import ProjectAuditDes from '@/projectaudit/ProjectAuditDes'
import SolutionDes from '@/projectaudit/SolutionDes'
import headercon from '@/components/headercon'
import footer from '@/components/footer'
import setdoc from '@/components/setdoc'
import projectdes from '@/components/projectdes'
import projectapply from '@/projectapply/projectapply'
import pmsetdoc from '@/components/pmsetdoc'
import projectProgramme from '@/projectapply/projectProgramme'
import myscroll from '@/components/myscroll'



// const listaudit  = resolve => require(['@/components/listaudit'],resolve);

// 移动端
import mobileIndex from '@/components/mobileIndex/mobileIndex'
import itemlist from '@/components/mobileIndex/itemlist'
import auditList from '@/components/mobileIndex/auditList'
import listdes from '@/components/mobileIndex/listdes'

Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/projectlist'
    },
    {
      path: '/listaudit',
      name: 'listaudit',
      component: listaudit
    },
    {
      path: '/footer',
      name: 'footer',
      component: footer
    },
    {
      path: '/headercon',
      name: 'headercon',
      component: headercon
    },
    {
      path: '/projectlist',
      name: 'projectlist',
      component: projectlist
    },
    {
      path: '/setdoc',
      name: 'setdoc',
      component: setdoc
    },
    {
      path: '/projectdes',
      name: 'projectdes',
      component: projectdes
    },
    {
      path: '/projectapply',
      name: 'projectapply',
      component: projectapply
    },
    {
      path: '/pmsetdoc',
      name: 'pmsetdoc',
      component: pmsetdoc
    },
    {
      path: '/projectProgramme',
      name: 'projectProgramme',
      component: projectProgramme
    },
    {
      path: '/myscroll',
      name: 'myscroll',
      component: myscroll
    },
    {
      path: '/SolutionDes',
      name: 'SolutionDes',
      component: SolutionDes
    },
    {
      path: '/ProjectAuditDes',
      name: 'ProjectAuditDes',
      component: ProjectAuditDes
    },
    {
      path: '/mobileIndex',
      name: 'mobileIndex',
      component: mobileIndex
    },
    {
      path: '/itemlist',
      name: 'itemlist',
      component: itemlist
    },
    {
      path: '/auditList',
      name: 'auditList',
      component: auditList
    },
    {
      path: '/listdes',
      name: 'listdes',
      component: listdes
    }

  ]
})
