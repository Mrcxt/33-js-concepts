<template>
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
      <div class="im_content-groups">
        <div>
          <template v-for="item in 10">
            <!-- 0 -->
            <div class="im_content-msgs" rule="0">
              <div class="im_content-msgs-time">09:00</div>
              <div class="im_content-msgs-main">
                <i class="im_icon el-icon-picture"></i>
                <div class="im_content-msgs-msg">
                  <span>床前明月光，疑是地上霜。 </span>
                </div>
              </div>
            </div>
            <!-- 1 -->
            <div class="im_content-msgs" rule="1">
              <div class="im_content-msgs-time">18:00</div>
              <div class="im_content-msgs-main">
                <i class="im_icon el-icon-picture"></i>
                <div class="im_content-msgs-msg">
                  <span>床前明月光，疑是地上霜。 举头望明月，低头思故乡。举头望明月，低头思故乡。举头望明月，低头思故乡。</span>
                </div>
              </div>
            </div>
          </template>
          <!--  -->
          <template v-for="(item, index) in msg_list">
            <div class="im_content-msgs" rule="0">
              <div class="im_content-msgs-time">{{item.msg_list_time}}</div>
              <div class="im_content-msgs-main">
                <i class="im_icon el-icon-picture"></i>
                <div class="im_content-msgs-msg">
                  <span>{{item.msg_list_msg}} </span>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="im_inputbox">
      <textarea class="im_inputbox-textarea" v-model.trim="input_msg" @keyup.enter="sendMsg" autocomplete="off" placeholder="请输入您想问的问题..."></textarea>
      <div class="im_inputbox-tools">
        <i class="im_icon el-icon-service"></i>
        <el-button type="primary" @click="sendMsg">发送</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "IM",
  data() {
    return {
      Socket: null,
      msg_list: [],
      input_msg: ""
    };
  },
  created() {
    this.initSocket();
  },
  methods: {
    initSocket() {
      this.Socket = new WebSocket(
        "ws://192.168.179.215/ws?sid=dc6a4002-9334-4824-879c-8e8c9a4322d3&botid=501f522a99184b789b8e81d504380860&debugmode=on"
      );
      console.log(this.Socket.readyState);
    },
    sendMsg() {
      if (this.input_msg != "") {
        this.msg_list.push({
          msg_list_time: new Date(),
          msg_list_msg: this.input_msg
        });
        this.input_msg = "";
        console.log(this.input_msg);
      }
    }
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
    // padding: 10px 0;
    background-color: #f5f5f5;
    .im_content-groups {
      display: flex;
      overflow: scroll;
      flex: auto;
      flex-direction: column-reverse;
      padding: 0 15px;

      /* 信息条样式--通用设置 */
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
            padding: 15px;
            border-radius: 15px;
            background-color: #fff;
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
