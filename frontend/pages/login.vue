<template>
  <v-card flat>
    <v-card-title primary-title>
      <div class="headline">登录</div>
    </v-card-title>
    <v-container>
      <v-layout row>
        <v-alert type="error" v-model="showError" dismissible
                 transition="fade-transition" class="mb-3">
          {{ error }}
        </v-alert>
      </v-layout>
      <v-layout row>
        <v-flex>
          <v-form v-model="valid" lazy-validation>
            <v-text-field prepend-icon="person" label="Username Or Email" required v-model="username"
                          :rules="[rules.required]"/>
            <v-text-field prepend-icon="lock" label="Password" required type="password" v-model="password"
                          :rules="[rules.required]"/>
            <v-checkbox v-model="rememberMe" label="Remember Me"/>
            <v-card-actions>
              <v-btn color="info" block :disabled="!valid" @click="login">登录</v-btn>
              <v-btn block to="/register">去注册</v-btn>
            </v-card-actions>
          </v-form>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
  import Cookie from 'js-cookie'
  import rulesMixin from '~/components/rulesMixin'

  export default {
    layout: 'login',
    mixins: [rulesMixin],
    data() {
      return {
        username: '',
        password: '',
        valid: false,
        rememberMe: false,
        error: '',
      }
    },
    computed: {
      showError: {
        get() {
          return this.error
        },
        set(val) {
          if (!val) {
            this.error = ''
          }
        },
      },
    },
    methods: {
      async login() {
        try {
          const res = await this.$services.app.tokenAuth.authenticate({
            usernameOrEmailAddress: this.username,
            password: this.password,
          })

          // axios-module 在服务器端会自动设置 axios 的 header，只要把 token 放进 cookie 即可
          Cookie.set('OAuthToken', res.accessToken,
            this.rememberMe ? {expires: res.expireInSeconds / (60 * 60 * 60 * 24)} : null)

          await this.$store.dispatch('updateUserState')

          this.$router.push('/')
        } catch (e) {
          console.error('login', e)
          this.error = e.message + (e.details ? ' :' + e.details : '')
        }
      },
    },
  }
</script>
