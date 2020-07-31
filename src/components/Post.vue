<!-- 发头条 写文章 -->
<template>
  <div class="tt_post_box">
    <!-- tab 切换开始 -->
    <div class="tt_post_tabs">
      <div
        @click="switchTab(tab.id)"
        :class="['tab_item',{'active':tab.id==activeTab}]"
        v-for="tab in tabs"
        :key="tab.id"
      >{{tab.text}}</div>
    </div>
    <!-- tab 切换结束 -->
    <!-- tab 内容 的开始 -->
    <div class="tab_content">
      <!-- 发微头条 -->
      <div class="tab_toutiao_content" v-show="activeTab=='toutiao'">
        <textarea name id cols="30" rows="10" v-model="tt_content" placeholder="有什么新鲜事儿告诉大家"></textarea>
        <div class="toutiao_bottom">
          <div class="left">
            <div class="left_btn" @click="toggleUploadArea">图片</div>
            <div class="upload_imgs" v-show="showUploadImgArea">
              <div class="upload">
                <div class="title">+</div>
                <input type="file" multiple @change="handleImgsUpload" accept=".jpg, .png" />
              </div>
              <!-- 上传图片的地方开始 -->
              <div class="img_item" v-for="img,index in uploadImgs" :key="img">
                <img :src="img" alt />
                <div class="deleteImg" @click.stop="deleteImg(index)">x</div>
              </div>
              <!-- 上传图片的地方结束 -->
            </div>
          </div>
          <div class="right" @click.stop="publishTT">发布</div>
        </div>
      </div>
      <!-- 写文章 -->
      <div class="tab_article_content" v-show="activeTab=='article'">写文章</div>
    </div>
    <!-- tab 内容 的结束 -->
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      tt_content: "", // 微头条 textarea 内容
      tabs: [
        {
          id: "toutiao",
          text: "发微头条",
        },
        {
          id: "article",
          text: "写文章",
        },
      ],
      activeTab: "toutiao",
      showUploadImgArea: false, // 图片上传是否显示
      uploadImgs: [], // 存放图片路径
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 发头条
    publishTT:function(){
      let content = this.tt_content;
      if(!content){// 内容为空的情况下
        // todo 换成 elementUI message
        alert("输入点啥啊");
        return false;
      }
      this.$axios.post("/createTT",{
        content:content,
        imgs: this.uploadImgs.join(','),
      }).then(res=>{
        console.log(res);
      }).catch(err=>{
        console.log(err);
      })
      // 清空输入框
      this.tt_content = "";
      // 
      this.uploadImgs = [];
    },
    // 删除图片
    deleteImg: function (index) {
      this.uploadImgs.splice(index, 1);
    },
    // 上传图片
    handleImgsUpload: function (e) {
      // console.log(Array.from(e.target.files))
      Array.from(e.target.files).forEach((f) => {
        // 构造请求参数
        let params = new FormData();
        params.append("file", f);

        // 发请求
        this.$axios.post("/aliossUpload", params).then((res) => {
          this.uploadImgs.push(res.url);
          // console.log(res)
          // console.log(this.uploadImgs);
        });
      });
    },
    // 切换 tab 栏
    switchTab: function (tabId) {
      this.activeTab = tabId;
    },
    // 切换图片上传框是否显示
    toggleUploadArea: function () {
      this.showUploadImgArea = !this.showUploadImgArea;
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='less' scoped>
.tt_post_box {
  padding: 5px;
  .tt_post_tabs {
    display: flex;
    .tab_item {
      width: 80px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-size: 16px;
      margin-left: 20px;
      cursor: pointer;
      transition: all 0.3s;
    }
    .active {
      color: #46a0fc;
      border-bottom: 2px solid #ea4245;
    }
  }
  .tab_content {
    .tab_toutiao_content {
      padding: 5px;
      textarea {
        width: 100%;
        height: 100px;
        border: 1px solid #ddd;
        outline: none;
        resize: none;
        display: block;
        padding: 14px;
        background-color: #f4f5f6;
        font-size: 13px 19px;
        font-family: inherit;
      }
      .toutiao_bottom {
        display: flex;
        justify-content: space-between;
        .left {
          cursor: pointer;
          position: relative;
          .left_btn {
            height: 40px;
            line-height: 40px;
            font-size: 16px;
          }

          .upload_imgs {
            background-color: #fff;
            display: flex;
            flex-wrap: wrap;
            width: 300px;
            position: absolute;
            .upload {
              position: relative;
              width: 100px;
              height: 100px;
              .title {
                font-size: 50px;
                line-height: 100px;
                text-align: center;
                width: 100px;
                height: 100px;
                border: 1px dashed #ddd;
                font-weight: 100;
                color: #ccc;
              }
              input {
                cursor: pointer;
                opacity: 0;
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
              }
            }
            .img_item {
              width: 100px;
              height: 100px;
              padding: 5px;
              position: relative;
              img {
                height: 100%;
                width: 100%;
              }
              .deleteImg {
                display: none;
                position: absolute;
                right: 10px;
                top: 5px;
                // top: 50%;
                // left: 50%;
                // transform: translate(-50%, -50%);
              }
              &:hover {
                background-color: #7f7f7f;
                opacity: 0.8;
                transition: all 0.5s;
                .deleteImg {
                  color: #fff;
                  display: block;
                }
              }
            }
          }
        }

        .right {
          transition: all 0.3s;
          cursor: pointer;
          color: #fff;
          background-color: #f48c8c;
          width: 120px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          &:hover {
            background-color: #ea4245;
          }
        }
      }
    }

    .tab_article_content {
    }
  }
}
</style>