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
      <div class="im_content-groups" ref="ref_scroll">
        <ul>
          <template v-for="(item, index) in msg_list">
            <li class="im_content-tips" v-if="item.type&&item.type === 'tips'"><span>{{item.msg}}</span></li>
            <li class="im_content-msgs" v-else :rule="item.log.user_type">
              <div class="im_content-msgs-time">{{item.log.msg_time}}</div>
              <div class="im_content-msgs-main">
                <i class="im_icon el-icon-picture"></i>
                <div class="im_content-msgs-msg">
                  <span v-html="item.msg"> </span>
                </div>
              </div>
            </li>
          </template>
        </ul>
      </div>
    </div>
    <div class="im_inputbox">
      <textarea class="im_inputbox-textarea" v-model.trim="input_msg" @keyup.enter="wsSend" autocomplete="off" placeholder="请输入您想问的问题..."></textarea>
      <div class="im_inputbox-tools">
        <i class="im_icon el-icon-service"></i>
        <el-button type="primary" @click="wsSend">发送</el-button>
      </div>
    </div>
  </div>
</template>
<script>
console.log("object");
</script>
<script>
console.log("object");
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
    flex: auto;
    background-color: #f5f5f5;
    .im_content-groups {
      display: flex;
      overflow: scroll;
      flex: auto;
      flex-direction: column-reverse;
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
