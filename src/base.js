exports.install = function (Vue, options) {
  Vue.prototype.changeData = function (){
          alert('全局函数执行');
  };
};
