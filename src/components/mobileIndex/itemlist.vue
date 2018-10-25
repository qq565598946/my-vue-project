<template>
  <div class="itemlist">
  <!--<mu-paper :z-depth="1" class="demo-list-wrap">-->
    <!--<mu-appbar color="lightBlue400">-->
      <!--<mu-button icon slot="left">-->
        <!--<mu-icon value="menu"></mu-icon>-->
      <!--</mu-button>-->
      <!--Contacts-->
      <!--<mu-button icon slot="right">-->
        <!--<mu-icon value="search"></mu-icon>-->
      <!--</mu-button>-->
    <!--</mu-appbar>-->
    <mu-list textline="three-line">
      <mu-sub-header></mu-sub-header>
 <mu-list-item avatar :ripple="false" button v-for="listcon in listarr" @click="handleEdit(listcon.id)" class="listcon">
        <mu-list-item-action>
          <mu-avatar>
            <img src="../../assets/itemlist.jpg">
          </mu-avatar>
        </mu-list-item-action>
        <mu-list-item-content>
          <mu-list-item-title>{{listcon.buildUnitLeaderName}}</mu-list-item-title>
          <mu-list-item-sub-title>
            <span style="color: rgba(0, 0, 0, .87)" v-html="getinfo(status['_'+listcon.auditStatus],listcon.auditStatus,true)"></span>{{listcon.createDeptname}}
          </mu-list-item-sub-title>
        </mu-list-item-content>

      </mu-list-item>


    </mu-list>

    <!--<mu-list>-->
      <!--<mu-sub-header></mu-sub-header>-->
      <!--<mu-list-item avatar button :ripple="false" v-for="listcon in listarr" @click="handleEdit(listcon.id)">-->
        <!--<mu-list-item-action>-->
          <!--<mu-avatar>-->
            <!--<img src="../../assets/itemlist.jpg">-->
          <!--</mu-avatar>-->
        <!--</mu-list-item-action>-->
        <!--<mu-list-item-title>{{listcon.buildUnitLeaderName}}</mu-list-item-title>-->
        <!--<mu-list-item-action>-->
          <!--<mu-list-item-title  v-html="getinfo(status['_'+listcon.auditStatus],listcon.auditStatus,true)"></mu-list-item-title>-->
          <!--&lt;!&ndash;<mu-icon value="chat_bubble"></mu-icon>&ndash;&gt;-->
        <!--</mu-list-item-action>-->
      <!--</mu-list-item>-->

    <!--</mu-list>-->
    <div class="pagebtn">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10,30,40]"
        :page-size="pagesize"
        layout="prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </mu-paper>

  </div>
</template>

<script>
  export default {
    name: 'itemlist',
    data() {
      return {
        currentDate: new Date(),
        pagesize:10,
        pagesizes:null,
        currentPage:1,
        newarr: [],
        msg: "项目列表",
        solution:this.COMMON.solution,  //solution = "xinghuo-apaas-pms-solution-dev/pms/solution/v1"
        appID: this.COMMON.appID,
        appSecretKey:  this.COMMON.appSecretKey,
        GetaWay_url:  this.COMMON.GetaWay_url,
        accessToken: this.COMMON.accessToken,
        listarr:[],
        total: null,
        pagecur: null,
        auditStatus:null,  //审核状态
        status:{      // 审核状态信息
          _0:{title:'草稿',color:'rgb(0,0,0)'},
          _1:{title:'待审核',color:'rgb(255,215,0)'},
          _2:{title:'已审核',color:'rgb(50,205,50)'},
          _3:{title:'驳回',color:'rgb(220,220,220)'},
          _4:{title:'下线',color:'rgb(255,0,0)'},
          _5:{title:'删除',color:'rgb(0,0,0)'}
        }
      }
    }, mounted: function () {
      // sessionStorage.setItem("access_token","b971bb698a80435db2f4ea7b3f0d0503");
      // this.accessToken = sessionStorage.getItem("access_token");
      this.getlistnew(1, 10);
    }, methods: {
      open4() {
        this.$notify({
          title: '警告',
          message: '这是一条警告的提示消息',
          type: 'warning'
        });
      },
    getinfo(item,key,isalert){   // 审核状态
      if(item){
        if(isalert){
          return `<span style="color:${item.color}" key="${key}">${item.title}</span>`
        }
        return `<span style="color:${item.color}" key="${key}">${item.title}</span>`
      }else{
        return ''
      }
    },
      getlistnew(current, size) {

        var _this = this;
        this.$http.post(this.GetaWay_url + this.solution + "/projectinfo/list",
          JSON.stringify({
            "accessToken": this.accessToken,
            "query": {
              "projectName_LIKE": ""
            },
            "page": {
              "current": current,
              "size": size
            }
          }), {
            headers: {
              'content-type': 'application/json',
              'accessToken': this.accessToken,
              'applyID': this.appID,
              'requestType': "app",
              'secretKey': this.appSecretKey,
              'userInfo': null
            }
          }).then(function (response) {
          if (response.data.code == 200) {
            _this.listarr = response.data.data.records;
            _this.total = response.data.data.total;
            // _this.pagesizes = response.data.data.pages;
          }
        }).catch(function (error) {
          _this.$notify({title: '失败', message: '网络错误', type: 'error'});
        });
      },
      handleEdit(id,auditStatus) {
        // this.$router.push(encodeURI("/projectdes?zip="+row.zip))
        if(auditStatus==0){
          this.$router.push({
            path:'/projectapply',
            query:{
              id:id,
              auditStatus:auditStatus,
              flag:0,
              accessToken:this.accessToken,
              solution: this.solution,
              appID: this.appID,
              appSecretKey: this.appSecretKey,
              GetaWay_url:this.GetaWay_url
            }
          })
        }else{
          this.$router.push({
            path:'/listdes',
            query:{
              id:id,
              auditStatus:auditStatus,
              flag:2,
              accessToken:this.accessToken,
              solution: this.solution,
              appID: this.appID,
              appSecretKey: this.appSecretKey,
              GetaWay_url:this.GetaWay_url
            }
          })
        }

      },apply(){
        this.$router.push({
          path:'/projectapply',
          query:{
            flag:1,
            accessToken:this.accessToken,
            solution: this.solution,
            appID: this.appID,
            appSecretKey: this.appSecretKey,
            GetaWay_url:this.GetaWay_url
          }
        })
      },
      handleDelete(index, row) {
        console.log(index, row)
      },
      handleChange(val) {
        console.log(val);
      },
      handleSizeChange(size){
        this.pagesize = size;
        this.getlistnew(this.currentPage,this.pagesize)
      },
      handleCurrentChange(curr){
        this.currentPage = curr;
        this.getlistnew(this.currentPage,this.pagesize)
      },

    }, updated: function () {

    }
  }
</script>

<style scoped>
 .listcon{
   box-shadow: 2px 0px 1px #d2d2d2d2;
   background: #fff;
 }
.mu-list-item{
    background: #fff;

}
  .demo-list-wrap {
    width: 100%;
    overflow: hidden;
    /*max-width: 360px;*/
  }
</style>
