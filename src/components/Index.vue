<template>
     <div class="smartchat-detail">
        <div class="message" >
              <li><span>SmartChat</span></li>
              <li> <router-link to="/smartchat"><mt-button type="default" size="large" plain class="mtbutton">开始使用</mt-button></router-link></li>
        </div>
    </div>
</template>
<script>
export default {
    name:'index',
}
</script>
<style scoped>
.smartchat-detail{
    height: 100%;
    background-color: skyblue;
}
.message{
    width: 200px;
    height: 500px;
    color: #fff;
    font-size: 23px;
    font-weight: 500;
     margin: 0 auto; 
     padding-top: 200px;
}
.message li{
  list-style: none;
  display: block;
  width: 200px;
  text-align: center;
  padding-top: 15px;
}
.message a{
    text-decoration: none;
}
.message .mtbutton{
    color: #fff;
    font-size: 14px;
    border: 1px solid #fff;
}
</style>
