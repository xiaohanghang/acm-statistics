<template>
  <v-app light>
    <v-container fluid fill-height align-content-center>
      <v-layout child-flex row class="text-xs-center grey lighten-4">
        <v-flex hidden-sm-and-down md3 d-flex>
          <v-card class="background"/>
        </v-flex>
        <v-spacer/>
        <v-flex md5 lg4 d-flex>
          <v-spacer/>
          <v-container align-content-center>
            <nuxt/>
          </v-container>
          <v-spacer/>
        </v-flex>
        <v-spacer/>
      </v-layout>
    </v-container>
  </v-app>
</template>

<style scoped>
  .background {
    background-image: url('~/assets/img/login/background.jpg')
  }

  .vertical-center {
  }
</style>
