<template>
  <div class="index_wrap">
    <el-container>
      <el-header>
        <h1>MMALL ADMIN</h1>
        <p>
          欢迎，<span>{{ username }}</span
          >&emsp;&emsp;<button style="color: #337ab7" @click="loginout">
            退出
          </button>
        </p>
      </el-header>

      <el-container>
        <el-aside width="200px">Aside</el-aside>

        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Cookies from "js-cookie";
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
            Cookies.remove("JSESSIONID");
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