<template>
  <div class="index_wrap">
    <el-container>
      <el-header >
        <h1>MMALL ADMIN</h1>
        <p>
          欢迎，<span>{{ username }}</span
          >&emsp;&emsp;<button style="color: #337ab7" @click="loginout">
            退出
          </button>
        </p>
      </el-header>

      <el-container>
        <el-aside width="200px">
          <el-menu
            background-color="#f8f8f8"
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            router
          >
            <el-menu-item index="/index">
              <i class="el-icon-menu"></i>
              <span slot="title">HOME</span>
            </el-menu-item>
            <el-submenu index="/shop_manage">
              <template slot="title">
                <i class="el-icon-goods"></i>
                <span>商品</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/shop_manage">商品管理</el-menu-item>
                <el-menu-item index="/category_manage">品类管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="/order_manage">
              <template slot="title">
                <i class="el-icon-document"></i>
                <span>订单</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/order_manage">订单管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu></el-aside
        >

        <div style="width: 100%;height: 86vh; padding: 20px;"><router-view><el-main></el-main></router-view></div>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
    };
  },

  //方法
  methods: {
    //退出登录
    loginout() {
      this.$http
        .loginout()
        .then((res) => {
          if (res.status == 0) {
            this.$message.success("退出成功");
            this.$store.commit("remove_user_data");
            this.$router.push("/");
          } else {
            this.$message.error("退出失败");
          }
        })
        .catch((err) => {
          this.$message.error("退出失败");
        });
    },
  },

  //挂载后生命周期函数
  mounted() {
    this.username = this.$store.state.user_data.username;
  },

  //计算属性
  computed: {},
};
</script>

<style lang="scss" scoped>
// .el-container,.el-header,.el-aside,.el-main{
//   box-sizing: border-box;
// }
.index_wrap {
  width: 100%;
  height: 100%;

  .el-header {
    background-color: #f8f8f8;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .el-aside {
    background-color: #f8f8f8;
    height: 91vh;
  }


}
</style>