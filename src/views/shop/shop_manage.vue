<template>
  <div class="shop_manage_wrap">
    <p class="shop_manage_title">
      <span>商品管理</span>
      <el-button type="primary" icon="el-icon-plus">添加商品</el-button>
    </p>
    <hr />
    <div class="shop_manage_search">
      <el-select v-model="search_type" placeholder="请选择" size="small">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-input
        placeholder="关键词"
        size="small"
        v-model="search_content"
        clearable
      >
      </el-input>
      <el-button size="small">查询</el-button>
    </div>

    <div class="shop_manage_data">
      <el-table
        :header-cell-style="headClass"
        :cell-style="rowClass"
        stripe
        :data="shop_manage_data"
        height="485"
        border
        style="width: 99.8%"
      >
        <el-table-column prop="id" label="id" width="180"> </el-table-column>
        <el-table-column label="信息" width="180">
          <template scope="scope">
            <div>
              <p>{{ scope.row.name }}</p>
              <p>{{ scope.row.subtitle }}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="价格"></el-table-column>
        <el-table-column prop="address" label="状态">
          <template scope="scope">
            <div>
              <p v-if="scope.row.status == 1">
                在售 <el-button type="warning" size="mini">下架</el-button>
              </p>
              <p v-else>
                已下架 <el-button type="warning" size="mini">上架</el-button>
              </p>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template>
            <div>
              <span class="a">查看</span>&emsp;&emsp;<span class="a">编辑</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="currentpage"
        style="margin-top: 1vh"
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="current_change"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          value: "productId",
          label: "按商品id查询",
        },
        {
          value: "productName",
          label: "按商品名称查询",
        },
      ],
      search_type: "",
      search_content: "",
      shop_manage_data: [],
      pageNum: 1,
      total: 0,
      currentpage: 1,
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
    //分页当前页码改变
    current_change(pageNum) {
      this.currentpage = pageNum;
      this.pageNum = pageNum;
      this.getshoplist();
    },

    //获取商品数据
    getshoplist() {
      let params = {
        pageNum: this.pageNum,
      };
      let headers = {
        loadingTarget: ".shop_manage_data",
      };
      this.$http
        .product_list(params, headers)
        .then((res) => {
          if (res.status != 0) {
            this.$message.error(res.msg);
            this.$router.push("/");
          } else {
            this.shop_manage_data = res.data.list;
            this.total = res.data.total;
          }
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  //挂载后生命周期函数
  mounted() {
    this.getshoplist();
  },
};
</script>

<style lang="scss" scoped>
.shop_manage_wrap {
  width: 100%;
  height: 100%;
  .shop_manage_title {
    margin-bottom: 2vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      font-size: 30px;
    }
  }

  .shop_manage_search {
    padding: 10px 0;
    display: flex;
    .el-input {
      margin-left: 2vw;
      width: 200px;
    }
    .el-button {
      margin-left: 2vw;
    }
  }

  .shop_manage_data {
    width: 100%;
  }
  .a {
    color: #337ab7;
    cursor: pointer;
  }
}
</style>