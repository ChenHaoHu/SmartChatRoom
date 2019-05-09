<template>
  <div class="smartchat" :style="{ height: height + 'px' }">
    <mt-header fixed title="SmartChat">
      <router-link to="/" slot="left">
        <mt-button icon="back" class="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="maincontainer" ref="contentscoll">
      <div class="messagelist">
        <ul v-show="!showflag">
          <span align="center" class="message-record" @click="showmessagerecord()">消息记录</span>
          <li v-for="(list,index) in showmessage" :key="index">
            <span class="question">
              {{list.data.q}}
              <img src="../assets/logo.png">
            </span>
            <span class="anwser">
              <img src="../assets/timg.jpg">
              &nbsp;{{list.data.a}}
            </span>
          </li>
        </ul>
        <ul v-show="showflag">
          <span align="center" class="message-delete" @click="deletemessagerecord()">删除消息记录</span>
          <li v-for="(list,index) in mainmessage" :key="index">
            <span class="question">
              {{list.data.q}}
              <img src="../assets/logo.png">
            </span>
            <span class="anwser">
              <img src="../assets/timg.jpg">
              &nbsp;{{list.data.a}}
            </span>
          </li>
        </ul>
      </div>
    </div>

    <div class="footer">
      <div class="footer-input" v-show="!showflag">
        <el-input v-model="message" placeholder="请输入内容" class="smartchat-input">
          <i slot="prefix" class="el-input__icon el-icon-microphone" @click="gotovoicedevice"></i>
        </el-input>
        <el-button type="primary" class="btn-send" @click.13="sendmessage">发送</el-button>
      </div>
      <div class="button-back" v-show="showflag">
        <el-button type="primary" class="btn-backtochat" size="large" @click="backtochat">返回聊天界面</el-button>
      </div>
    </div>
    <div class="voicedevice" v-show="viocedevice">
      <i class="el-icon el-icon-back" @click="backtoinput"></i>
      <i class="el-icon el-icon-microphone" @click="starRecord" v-if="!recording"></i>
      <i class="el-icon el-icon-microphone" @click="endRecord" v-if="recording"></i>
    </div>
    <div class="test">
      <div v-if="recording" class="loading">
        <mt-spinner :type="3"></mt-spinner>
      </div>
      <audio controls  style="display:none"></audio>
    </div>
  </div>
</template>

<script>
var recorder;
var audio;
import Qs from "qs";
import BScroll from "better-scroll";
import record from "../static/record.js";
export default {
  name: "smartchat",
  data() {
    return {
      showflag: false,
      recording: false,
      viocedevice: false,
      height: 0,
      message: "",
      mainmessage: [],
      showmessage: []
    };
  },
  created() {
    this.$nextTick(() => {
      this._initScroll();
    });
    var deviceheight = window.screen.availHeight;
    this.height = deviceheight;
  },
  methods: {
    _initScroll() {
      this.contentScroll = new BScroll(this.$refs.contentscoll, {
        click: true
      });
    },
    sendmessage() {
      let sendmessage = { str: this.message };
      this.$http.post("/chat/", Qs.stringify(sendmessage)).then(res => {
        this.mainmessage.push(res.data);
        this.showmessage = this.mainmessage.slice(-9);
      });
      this.message = "";
      this.showflag = false;
    },
    showmessagerecord() {
      this.showflag = true;
    },
    backtochat() {
      this.showflag = false;
    },
    deletemessagerecord() {
      this.mainmessage = this.showmessage = "";
    },
    gotovoicedevice() {
      this.viocedevice = true;
    },
    backtoinput() {
      this.viocedevice = false;
      this.showflag = false;
    },
  starRecord() {
      this.recording = true;
      startRecording();
    },

    endRecord() {
      this.recording = false;
      stopRecording();
     
   var  blobfile =  playRecording();
     
   console.log(blobfile)



    let formData = new FormData();
            formData.append('file', blobfile);
            let config = {
           
                 headers: {'Content-Type': 'multipart/form-data'}
            
            }
            this.$http.post('/audio/', formData, config).then( (res) => {
              if (res.status === 200) {
               console.log(res.data);
              
                this.message=res.data.data
              
                this.sendmessage()
              }
              
            }) 
    }
  }
};
function startRecording() {
  HZRecorder.get(function(rec) {
    recorder = rec;
    recorder.start();
  });
}

function stopRecording() {
  recorder.stop();
}

function playRecording() {
  audio = $("audio")[0];
 var aa =  recorder.play(audio);
 return aa;
}
</script>
<style scoped>
.mint-header {
  background-color: #fff;
  color: rgb(29, 189, 252);
  font-size: 16px;
  font-weight: 700;
}
.maincontainer {
  width: 100%;
  height: 85%;
  background-color: #f0f6fa;
  margin-top: 40px;
  overflow: hidden;
}
.maincontainer ul {
  padding: 0;
  margin: 0;
}
.maincontainer li {
  list-style: none;
  display: block;
  width: 100%;
  height: 55px;
  font-size: 12px;
  font-family: Arial;
}
.maincontainer span {
  display: block;
  padding-top: 5px;
}
.maincontainer img {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  position: relative;
  top: 5px;
}
.maincontainer .question {
  text-align: right;
  padding-right: 5px;
}
.maincontainer .anwser {
  padding-left: 5px;
}
.footer {
  width: 100%;
  height: 8%;
  position: fixed;
  bottom: 0;
}

.footer-input {
  width: 94%;
  margin-left: 3%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.smartchat-input {
  width: 75%;
}

.btn-send {
  width: 20%;
}
.message-record {
  font-size: 12px;
  color: skyblue;
  margin-top: 10px;
  margin-bottom: 10px;
}
.message-delete {
  font-size: 12px;
  color: skyblue;
  margin-top: 10px;
}
.btn-backtochat {
  width: 95%;
  margin-left: 2%;
  font-size: 14px;
}
.smartchat .back {
  font-size: 14px;
}
.el-icon-microphone {
  font-size: 23px;
}
.voicedevice {
  width: 100%;
  height: 15%;
  position: relative;
  top: -40px;
  background-color: skyblue;
}
.voicedevice {
  line-height: 115px;
}
.voicedevice .el-icon-microphone {
  font-size: 45px;
  color: #b0e0e6;
  margin-left: 35%;
}
.voicedevice .el-icon-back {
  font-size: 30px;
  color: #fff;
  position: relative;
  left: 35%;
  top: -5px;
}
.test {
  position: fixed;
  top: 200px;
  left: 170px;
}
</style>
