<template>
  <div class="listdes">
  <mu-container>
    <mu-card style="width: 100%; margin: 0 auto;">
      <!--<mu-card-header title="Myron Avatar" sub-title="sub title">-->
        <!--<mu-avatar slot="avatar">-->
          <!--<img src="../../../static/img/sun.jpg">-->
        <!--</mu-avatar>-->
      <!--</mu-card-header>-->
      <mu-card-media :title="desarr.buildUnitLeaderName" :sub-title="desarr.buildUnitName">
        <img src="../../../static/img/sun.jpg">
      </mu-card-media>
      <mu-card-title :title="desarr.projectName" :sub-title="desarr.auditStatus"></mu-card-title>
      <mu-card-text>
        {{desarr.projectDesc}}
      </mu-card-text>

    </mu-card>
  </mu-container>
  </div>
</template>

<script>
    export default {
        name: "listdes",
        data(){
            return{
              desarr:null,
            }
        },
        mounted:function () {
          this.getDesdata()
        },
        methods:{
        getDesdata() {  // 项目详情
          var _this = this;
          // alert(_this.solution)
          this.$http.post(this.$route.query.GetaWay_url + this.$route.query.solution + "/projectinfo/find",
            JSON.stringify({
              "accessToken": this.$route.query.accessToken,
              "query": {
                "id": this.$route.query.id
              }
            }), {
              headers:this.COMMON.headerJson
            }).then(function (response) {
            if (response.data.code == 200) {
              console.log(response);
              _this.desarr = response.data.data;
              console.log(_this.desarr)
            }
          }).catch(function (error) {
              console.log(error)
          });
        },
      }
    }
</script>

<style scoped>

</style>
