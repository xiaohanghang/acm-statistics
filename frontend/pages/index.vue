<template>
  <v-app light>
    <v-toolbar class="white">
      <v-toolbar-title>
        NWPU-ACM 查询系统
      </v-toolbar-title>
      <v-spacer/>
      <v-tooltip left>
        <v-btn icon slot="activator" href="https://github.com/Liu233w/acm-statistics" target="_blank">
          <v-icon>fa fa-github</v-icon>
        </v-btn>
        <span>Fork me on Github!</span>
      </v-tooltip>
    </v-toolbar>
    <v-content>
      <section>
        <v-parallax :src="require('~/assets/img/frontpage/back7-brighten.jpg')" height="600">
          <v-layout
            column
            align-center
            justify-center
            class="white--text"
          >
            <img :src="require('~/assets/img/logo.png')" alt="Vuetify.js" height="300">
            <h1 class="black--text mb-2 display-1 text-xs-center index-title">欢迎使用 NWPU-ACM 查询系统</h1>
            <div class="black--text subheading mb-3 text-xs-center index-title">由 NWPU-ACM 技术组强力驱动</div>
            <v-btn
              class="blue lighten-2 black--text mt-5"
              dark
              large
              to="/statistics"
            >
              进入 OJ 题量统计
            </v-btn>
          </v-layout>
        </v-parallax>
      </section>

      <section>
        <v-layout
          column
          wrap
          class="my-5"
          align-center
        >
          <v-flex xs12 sm4 class="my-3">
            <div class="text-xs-center">
              <h2 class="headline">全新查询系统，更加稳定</h2>
              <span class="subheading">
                异步API + 浏览器端爬虫，速度加倍
              </span>
            </div>
          </v-flex>
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">link</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">免费提供题量查询API</div>
                    </v-card-title>
                    <v-card-text>
                      我们提供了一个 RESTful API 来供您使用，您可以在任意的客户端、网站中调用此API来查询某用户在OJ上的提交数/通过数。
                      访问我们的<a href="/swagger" target="_blank">API文档</a>以获取更多信息。
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">fa fa-github</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">完全开源</div>
                    </v-card-title>
                    <v-card-text>
                      访问我们的 <a href="https://github.com/Liu233w/acm-statistics" target="_blank">项目地址</a>
                      以获取本网站的最新源代码，您可以在自己的服务器上部署本网站或者在自己的项目中使用我们的爬虫代码。
                      欢迎向我们提出问题建议、贡献代码或给我们点赞（Star），您的支持是我们前进的动力
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">build</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">更多功能支持中</div>
                    </v-card-title>
                    <v-card-text>
                      旧版查询系统中的功能正在被移植到新版查询系统中，如果您需要旧版查询系统中的功能，请
                      <a href="//npuacm.info/">单击此处返回旧版查询系统</a>
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>

      <section>
        <v-parallax :src="require('~/assets/img/frontpage/back4.jpg')" height="380">
          <v-layout column align-center justify-center>
            <div class="headline white--text mb-3 text-xs-center response-title">欢迎向我们提出意见以帮助本网站进步</div>
            <a :href="mailToGithubLink">
              <em class="white--text response-title">或者单击此处向本项目发送邮件</em>
            </a>
            <v-btn
              class="blue lighten-2 mt-5"
              dark
              large
              href="https://github.com/Liu233w/acm-statistics/issues/new"
              target="_blank"
            >
              Submit New Issue
            </v-btn>
          </v-layout>
        </v-parallax>
      </section>

      <section>
        <v-container grid-list-xl>
          <v-layout row wrap justify-center class="my-5">
            <v-flex xs12 sm4>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">关于我们</div>
                </v-card-title>
                <v-card-text>
                  <p>
                    西北工业大学ACM协会技术组致力于为广大学生提供各类计算机、算法、计算机类竞赛方面的设施及服务。
                    欢迎各位有识之士加入。
                  </p>
                  <p id="busuanzi_container_site_pv" style="display: none;">
                    本站总访问量: <span id="busuanzi_value_site_pv"/>次<br>
                  </p>
                  <p id="busuanzi_container_site_uv" style="display: none;">
                    本站总访客数: <span id="busuanzi_value_site_uv"/>次
                  </p>
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 sm4 offset-sm1>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">联系我们</div>
                </v-card-title>
                <v-list class="transparent">
                  <v-list-tile href="https://jq.qq.com/?_wv=1027&k=5qgzfQc" target="_blank">
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">fa fa-qq</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>198820787</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile @click="showAddress">
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">place</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>陕西省西安市长安区西北工业大学长安校区计算机学院110室</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile href="mailto:support@npuacm.info">
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">email</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>support@npuacm.info</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile @click="dialog = !dialog">
                    <v-list-tile-action>
                      <v-icon class="blue--text text--lighten-2">fa fa-weixin</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>微信公众号</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card>
            </v-flex>
          </v-layout>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span>微信公众号</span>
              </v-card-title>
              <v-card-text>
                <img :src="require('~/assets/img/wechat.jpg')" alt="公众号二维码" style="height: 300px">
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" flat @click.stop="dialog=false">关闭</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-container>
      </section>

      <v-footer class="blue darken-2">
        <span class="white--text ml-3">
          &copy; 2018 NWPU-ACM 技术组
        </span>
        <v-spacer/>
        <span class="white--text ml-3">陕ICP备17008184号</span>
      </v-footer>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    layout: 'none',
    data() {
      return {
        dialog: false,
      }
    },
    methods: {
      showAddress() {
        window.alert('陕西省西安市长安区西北工业大学长安校区计算机学院110室')
      },
    },
    computed: {
      mailToGithubLink() {
        const body = encodeURIComponent('请注意，您经此链接发送的所有信息都将被发送到' +
          'https://github.com/Liu233w/acm-statistics/issues，任何人都有权限浏览其内容。')
        return `mailto:acm-statistics@fire.fundersclub.com?body=${body}`
      },
    },
  }
  /*!
Portions of this source file taken from vuetifyjs/parallax-starter <https://github.com/vuetifyjs/parallax-starter>

The MIT License (MIT)

Copyright (c) 2016 John Jeremy Leider

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
  */
</script>

<style scoped>
  .index-title {
    text-shadow: 1px 0 #ecf5ff, 0 1px #ecf5ff, 0 -1px #ecf5ff, -1px 0 #ecf5ff;
  }

  .response-title {
    text-shadow: 1px 0 #000000, 0 1px #000000, 0 -1px #000000, -1px 0 #000000;
  }
</style>
