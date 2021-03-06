<template>
  <div class="comment__container" id="comment" v-if="comment">
    <!-- 评论区 -->
    <div class="comment__box">
      <div
        class="comment"
        v-for="item in comment.comments"
        :key="item.commentId"
      >
        <router-link :to="`/user/home?id=${item.user.userId}`">
          <el-image :src="item.user.avatarUrl + '?param=50y50'" lazy>
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </router-link>
        <div class="text">
          <div class="text__content">
            <router-link
              class="user"
              :to="`/user/home?id=${item.user.userId}`"
              >{{ item.user.nickname }}</router-link
            >
            &nbsp;：{{ item.content.split('(')[0] }}
            <router-link
              v-if="item.content.split('(')[1]"
              :to="`/user/home?id=${userId}`"
              >{{ item.content.match(/\([^\s]+\)/g) }}</router-link
            >
          </div>
          <div class="time">{{ item.timeStr }}</div>
        </div>
      </div>
    </div>
    <!-- 分页 -->
    <div class="comment__page">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="queryInfo.pageNo"
        :page-size="queryInfo.pageSize"
        @current-change="pageChange"
        next-text="下一页"
        prev-text="上一页"
        hide-on-single-page
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'comment',
  props: {
    id: {
      type: [String, Number],
      required: true
    },
    type: {
      type: String,
      default: '0'
    },
    sortType: {
      type: Number,
      default: 3
    }
  },
  data() {
    return {
      // 评论分页参数
      queryInfo: {
        id: this.id,
        type: this.type,
        pageNo: 1,
        pageSize: 20,
        sortType: this.sortType,
        cursor: 0
      }
    }
  },
  created() {
    // 获取评论
    if (this.id) {
      this.getComment(this.queryInfo)
    }
  },
  methods: {
    ...mapActions('comment', {
      getComment: 'getComment'
    }),
    pageChange(val) {
      this.queryInfo.pageNo = val
      this.queryInfo.cursor = this.comment.cursor
      this.getComment(this.queryInfo)
    }
  },
  computed: {
    ...mapState('comment', {
      comment: 'comment'
    }),
    ...mapState('user', {
      userId: 'userId'
    }),
    total() {
      return this.comment.totalCount
    }
  },
  watch: {
    id(val) {
      if (val) {
        this.queryInfo.id = val
        this.getComment(this.queryInfo)
      }
    },
    comment: {
      deep: true,
      handler(val) {
        if (val) {
          this.$emit('commentCount', val.totalCount)
        }
      }
    }
  },
  beforeDestroy() {
    this.$store.commit('comment/setComment', null)
  }
}
</script>
<style lang="less" scoped>
.comment__container {
  .comment__box {
    .comment {
      display: flex;
      padding: 15px 0;
      border-top: 1px dotted #ccc;
      .el-image {
        width: 50px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        .image-slot {
          display: inline;
        }
        img {
          width: 100%;
          height: 100%;
        }
      }

      .text {
        flex: 1;
        padding-left: 10px;
        a {
          color: #0c73c2;
        }
        a:hover {
          text-decoration: underline;
        }
        .text__content {
          max-width: 610px;
          word-break: break-word;
          word-wrap: break-word;
          overflow: hidden;
          line-height: 20px;
          .user {
            float: left;
          }
          img {
            float: left;
            width: 35px;
            height: 12px;
            margin: 4px 5px 0 3px;
          }
        }
        .time {
          margin-top: 15px;
          color: #999;
        }
      }
    }
  }
  .comment__page {
    padding: 20px 0 30px 0;
    text-align: center;
  }
}
</style>
