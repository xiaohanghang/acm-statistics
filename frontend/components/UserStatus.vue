<template>
  <v-tooltip bottom>
    <v-btn outline @click="clicked" slot="activator">{{ title }}</v-btn>
    {{ tooltip }}
  </v-tooltip>
</template>

<script>
  export default {
    computed: {
      user() {
        return this.$store.state.user
      },
      title() {
        if (this.user) {
          return this.user.username
        } else {
          return '登录'
        }
      },
      tooltip() {
        if (this.user) {
          return '点我注销'
        } else {
          return '点我登录'
        }
      },
    },
    methods: {
      clicked() {
        if (this.user) {
          this.$store.dispatch('logout')
          this.$router.push('/')
        } else {
          this.$router.push('/login')
        }
      },
    },
  }
</script>
