<template>
  <div class="order_manage_wrap">
    <p class="order_manage_title">
      <span>订单管理</span>
    </p>
    <hr />
    <div class="order_manage_search">
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
        placeholder="订单号"
        size="small"
        v-model="search_content"
        clearable
      >
      </el-input>
      <el-button size="small">查询</el-button>
    </div>

    <div class="order_manage_data">
      <el-table
        :header-cell-style="headClass"
        :cell-style="rowClass"
        stripe
        :data="order_manage_data"
        height="485"
        border
        style="width: 99.8%"
      >
        <el-table-column prop="orderNo" label="订单号"> </el-table-column>
        <el-table-column label="收件人" prop="receiverName"> </el-table-column>
        <el-table-column prop="statusDesc" label="订单状态"></el-table-column>
        <el-table-column label="订单总价">
          <template scope="scope">
            <div>￥{{ scope.row.payment }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column label="操作">
          <template>
            <div>
              <span class="a">查看</span>
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
          label: "按订单号查询",
        },
      ],
      search_type: "",
      search_content: "",
      order_manage_data: [],
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
        loadingTarget: ".order_manage_data",
      };
      this.$http
        .order(params, headers)
        .then((res) => {
          if (res.status != 0) {
            this.$message.error(res.msg);
            this.$router.push("/");
          } else {
            this.order_manage_data = res.data.list;
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
.order_manage_wrap {
  width: 100%;
  height: 100%;
  .order_manage_title {
    margin-bottom: 2vh;
    span {
      font-size: 30px;
    }
  }

  .order_manage_search {
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

  .order_manage_data {
    width: 100%;
  }
  .a {
    color: #337ab7;
    cursor: pointer;
  }
}
</style>