<template>
  <div class="category_manage_wrap">
    <p class="category_manage_title">
      <span>品类管理</span>
      <el-button type="primary" icon="el-icon-plus">添加品类</el-button>
    </p>
    <hr />
    <div class="category_manage_id">
      <p>当前商品分类ID: 0</p>
    </div>

    <div class="category_manage_data">
      <el-table
        :header-cell-style="headClass"
        :cell-style="rowClass"
        stripe
        :data="category_manage_data"
        height="535"
        border
        style="width: 99.8%"
      >
        <el-table-column prop="id" label="品类ID"> </el-table-column>
        <el-table-column label="品类名称" prop="name" ></el-table-column>
        <el-table-column label="操作">
          <template>
            <div>
              <span class="a">修改名称</span>&emsp;&emsp;<span class="a">查看其子品类</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      category_manage_data: [],
      categoryId : 0
    };
  },

  //方法
  methods: {
 //表头样式
    headClass() {
      return "text-align:center;color:#000";
    },
    //表格内容样式
    rowClass() {
      return "text-align:center";
    },

    //获取商品数据
    getcategorylist() {
      let params = {
        categoryId: this.categoryId,
      };
      let headers ={
        loadingTarget : '.category_manage_data'
      }
      this.$http
        .category(params,headers)
        .then((res) => {
          if (res.status != 0) {
            this.$message.error(res.msg);
            this.$router.push("/");
          } else {
            console.log(res);
            this.category_manage_data =res.data
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  //挂载后生命周期函数
  mounted() {
    this.getcategorylist();
  },
};
</script>

<style lang="scss" scoped>
.category_manage_wrap {
  width: 100%;
  height: 100%;
  .category_manage_title {
    margin-bottom: 2vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      font-size: 30px;
    }
  }

  .category_manage_id {
    padding: 10px 0;
    display: flex;
  }

  .category_manage_data {
    width: 100%;
  }
  .a {
    color: #337ab7;
    cursor: pointer;
  }
}
</style>