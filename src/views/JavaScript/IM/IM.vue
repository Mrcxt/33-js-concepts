<template>
  <div class="IM-demo">
    <!-- <p>在线聊天室 -- “虾哔哔”。通过 websocket 实现的简易聊天室。</p> -->
    <div class="IM">
      <div class="im_header">
        <div class="im_header-name">
          <span>虾哔哔</span>
        </div>
        <div class="im_header-right">
          <i class="im_icon el-icon-minus"></i>
          <i class="im_icon el-icon-close"></i>
        </div>
      </div>
      <div class="im_content">
        <div class="im_content-groups" ref="ref_scroll">
          <ul>
            <!--  -->
            <template v-for="(item, index) in msg_list">
              <li class="im_content-tips" v-if="item.type&&item.type === 'tips'"><span>{{item.msg}}</span></li>
              <li class="im_content-msgs" v-else :rule="item.log.user_type">
                <!-- time -->
                <div class="im_content-msgs-time">{{$dayjs(item.log.msg_time).format('YYYY-MM-DD HH:mm:ss')}}</div>
                <!-- msg -->
                <div class="im_content-msgs-main">
                  <i class="im_icon el-icon-picture"></i>
                  <div class="im_content-msgs-msg">
                    <span v-html="item.msg"> </span>
                  </div>
                </div>
              </li>
            </template>
            <!--  -->
          </ul>
        </div>
        <!-- 热门问题 -->
        <div class="im_content-question">
          <div class="im_content-question-box" @click="clickHotQuestion">
            <el-button class="" v-for="(item, index) in hot_question" :key="index" round>{{item.question}}</el-button>
          </div>
        </div>
      </div>
      <div class="im_inputbox">
        <textarea class="im_inputbox-textarea" v-model.trim="input_msg" @keyup.enter="wsSend" autocomplete="off" placeholder="请输入您想问的问题..."></textarea>
        <div class="im_inputbox-tools">
          <i class="im_icon el-icon-service"></i>
          <div>
            <el-button @click="wsClose" round>关闭</el-button>
            <el-button type="primary" @click="wsSend" round>发送</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "IM",
  data() {
    return {
      server: "212.64.45.79",
      botid: "d5eac34f23cf406a9af48609b639d48e",
      Socket: null,
      input_msg: "",
      msg_list: [
        // {
        //   msg: "",
        //   sid: "",
        //   isUseClick: false, //是否点击了有用没用
        //   q_list: [],
        //   q_list_std: [],
        //   log: {
        //     user_type: 1, //用户类型,0为访客，1为bot，2为座席
        //     msg_type: 0, //消息类型,0为文本，1为其他
        //     channel: 0, //渠道,0为API，1为web
        //     msg_time: "2018-06-25 16:00",
        //     ori_question: "",
        //     std_question: "",
        //     confidence: 0
        //   }
        // }
      ],
      hot_question: []
    };
  },
  computed: {},
  created() {
    try {
      this.initSocket();
      this.getHotQuestion();
    } catch (error) {
      console.log(error);
    }
  },
  watch: {
    msg_list() {
      this.scrollToBottom();
    }
  },
  methods: {
    initSocket() {
      let parmas = {
        server: this.server,
        botid: this.botid,
        sid: this.UUID(),
        debugmode: "on"
      };
      let url = `ws://${parmas.server}/ws?sid=${parmas.sid}&botid=${
        parmas.botid
      }&debugmode=${parmas.debugmode}`;
      this.Socket = new WebSocket(url);
      //
      this.Socket.onopen = res => {
        this.wsOnOpen(res);
      };
      this.Socket.onmessage = res => {
        this.wsOnMessage(res);
      };
      this.Socket.onerror = err => {
        this.wsOnError(err);
      };
      this.Socket.onclose = res => {
        this.wsOnClose(res);
      };
    },

    /* 事件 */
    wsOnOpen(res) {
      // console.log(res);
      this.msg_list.push({
        type: "tips",
        msg: "机器人上线了"
      });
      this.wsSend();
    },
    wsOnMessage(res) {
      // console.log(res);
      let data = JSON.parse(res.data);
      this.msg_list.push(data);
    },
    wsOnError(err) {},
    wsOnClose(res) {
      this.msg_list.push({
        type: "tips",
        msg: "机器人下线了"
      });
    },

    /* 方法 */
    wsSend(text) {
      console.log(this.Socket.readyState);

      if (this.Socket.readyState === 1) {
        if (this.input_msg != "") {
          this.Socket.send(this.input_msg);
          let time = this.$dayjs();
          this.msg_list.push({
            msg: this.input_msg,
            log: {
              user_type: 0, //用户类型,0为访客，1为bot，2为座席
              msg_type: 0, //消息类型,0为文本，1为其他
              msg_time: time
            }
          });
          this.input_msg = "";
        }
      } else {
        this.initSocket();
      }
    },
    wsClose() {
      this.Socket.close();
    },
    /* 热门问题tag */
    getHotQuestion() {
      this.$axios
        .post(`http://${this.server}/cms/api/hot_question`, {
          bot_id: this.botid,
          start_time: this.$dayjs(
            new Date().getTime() - 7 * 24 * 3600 * 1000
          ).format("YYYY-MM-DD"),
          end_time: this.$dayjs().format("YYYY-MM-DD")
        })
        .then(res => {
          console.log(res.data);
          this.hot_question = res.data;
        })
        .catch(error => {});
    },
    clickHotQuestion(e) {
      const text = e.target.innerText;
      this.input_msg = text;
      this.wsSend();
    },

    /* tool */
    /**
     * generateUUID 生成UUID
     * @returns {string} 返回字符串
     */
    UUID() {
      var d = new Date().getTime();
      var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function(c) {
          var r = (d + Math.random() * 16) % 16 | 0;
          d = Math.floor(d / 16);
          return (c == "x" ? r : (r & 0x7) | 0x8).toString(16);
        }
      );
      return uuid;
    },
    /*=============================================
    =            平缓下拉动画            =
    =============================================*/

    handleScroll() {
      this.gotop = window.pageYOffset >= this.height;
    },
    //
    scrollTop(el, from = 0, to, duration = 500) {
      if (!window.requestAnimationFrame) {
        window.requestAnimationFrame =
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function(callback) {
            return window.setTimeout(callback, 1000 / 60);
          };
      }
      const difference = Math.abs(from - to);
      const step = Math.ceil((difference / duration) * 50);

      function scroll(start, end, step) {
        if (start === end) return;

        let d = start + step > end ? end : start + step;
        if (start > end) {
          d = start - step < end ? end : start - step;
        }

        if (el === window) {
          window.scrollTo(d, d);
        } else {
          el.scrollTop = d;
        }
        window.requestAnimationFrame(() => scroll(d, end, step));
      }
      scroll(from, to, step);
    },
    //
    scrollToBottom() {
      let ref_scroll = this.$refs.ref_scroll;
      if (ref_scroll.scrollTop != ref_scroll.scrollHeight) {
        // ref_scroll.scrollTop = ref_scroll.scrollHeight;
        this.scrollTop(
          this.$refs.ref_scroll,
          ref_scroll.scrollTop,
          ref_scroll.scrollHeight,
          1300
        );
      }
    }

    /*=====  End of 平缓下拉动画  ======*/
  }
};
</script>

<style lang="less" scoped>
/* color */
@base_color: #409eff; // base
@success_color: #67c23a; // success
@warn_color: #e6a23c; // warn
@danger_color: #f56c6c; // danger

@main_color: #303133; // 主要颜色
@rule_color: #606266; // 常规颜色
@minor_color: #909399; // 次要颜色
@placeholder_color: #c0c4cc; // 占位颜色

/* less */
.IM {
  display: flex;
  overflow: hidden;
  flex-direction: column;
  box-sizing: border-box;
  margin: 0 auto;
  width: 350px;
  height: 530px;
  border: 1px solid #eee;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  color: @rule_color;
  font-size: 14px;

  // reset
  & * {
    box-sizing: border-box;
  }
  ::-webkit-input-placeholder {
    color: @placeholder_color;
  }
  // common
  .im_icon {
    cursor: pointer;
    & + .im_icon {
      margin-left: 10px;
    }
  }

  /* layout */

  // header
  .im_header {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    justify-content: space-between;
    padding: 0 15px;
    height: 50px;
    background-color: @base_color;
    color: #fff;
  }
  // content
  .im_content {
    display: flex;
    flex: auto;
    // padding: 10px 0;
    flex-direction: column;
    background-color: #f5f5f5;
    .im_content-groups {
      overflow: scroll;
      flex: auto;
      padding: 0 15px;

      ul {
        margin: 0;
        padding: 0;
        /* 信息条样式--通用设置 */
        .im_content-tips {
          margin: 25px 0;
          text-align: center;
          span {
            color: @placeholder_color;
            font-size: 12px;
          }
        }
        .im_content-msgs {
          margin: 25px 0;
          .im_content-msgs-time {
            margin: 10px 0;
            color: @minor_color;
            text-align: center;
            font-size: 12px;
          }
          .im_content-msgs-main {
            display: flex;
            align-items: flex-end;
            .im_icon {
              width: 30px;
              height: 30px;
              border-radius: 100%;
              font-size: 30px;
            }
            .im_content-msgs-msg {
              flex: auto;
              flex-grow: 0;
              flex-shrink: 1;
              padding: 10px 15px;
              border-radius: 15px;
              background-color: #fff;
              word-break: break-all;
              font-size: 13px;
              line-height: 1.5;
            }
          }
          //
          &[rule="0"] {
            .im_content-msgs-time {
            }
            .im_content-msgs-main {
              flex-direction: row-reverse;
              .im_icon {
              }
              .im_content-msgs-msg {
                margin-right: 10px;
                margin-left: 40px;
                border-bottom-right-radius: 5px;
                background-color: @base_color;
                color: #fff;
              }
            }
          }
          //
          &[rule="1"] {
            .im_content-msgs-time {
            }
            .im_content-msgs-main {
              .im_icon {
              }
              .im_content-msgs-msg {
                margin-right: 40px;
                margin-left: 10px;
                border-bottom-left-radius: 5px;
              }
            }
          }
        }
      }
    }
    .im_content-question {
      flex-shrink: 0;
      padding: 5px 10px;
      width: 100%;
      .im_content-question-box {
        display: flex;
        overflow-x: scroll;
        &::-webkit-scrollbar {
          display: none;
          // height: 3px;
        }
        .el-button {
          border: none;
          &:focus {
            background-color: #fff;
            color: #606266;
          }
        }
      }
    }
  }
  // inputbox
  .im_inputbox {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    height: 90px;
    .im_inputbox-textarea {
      display: block;
      flex: auto;
      padding: 5px 15px;
      width: 100%;
      outline: none;
      border: none;
      background-color: #fff;
      background-image: none;
      font-size: 13px;
      line-height: 1.5;
      resize: none;
    }
    .im_inputbox-tools {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 15px;
      height: 40px;
      .im_icon {
        color: @minor_color;
      }
    }
  }
}
</style>
