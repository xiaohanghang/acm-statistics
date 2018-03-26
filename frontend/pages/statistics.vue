<template>
  <v-container grid-list-md>
    <v-layout row>
      <v-flex xs8>
        <v-text-field
          v-model="username"
          label="统一设置用户名"
          :disabled="working"
          required
          @keyup.enter="runWorker"
        />
      </v-flex>
      <v-flex xs4>
        <v-btn primary @click="runWorker" :disabled="working">
          开始查询
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout row v-if="allSubmissions">
      <v-flex>
        <p class="title text-xs-center"> {{ username }} 的总题量： {{ allSolved }} / {{ allSubmissions }} </p>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex>
        <v-progress-linear color="primary"
                           :value="notWorkeringRate"
                           :active="working"
        />
      </v-flex>
    </v-layout>
    <no-ssr>
      <v-layout row wrap
                v-masonry
                transition-duration="3s" item-selector=".worker-item"
      >
        <v-flex xs12 sm6 md4 xl3
                class="worker-item"
                v-for="(item, name, index) in workers"
                :key="name"
                v-masonry-tile
        >
          <crawler-worker
            :username="username"
            :worker-name="name"
            :solved.sync="item.solved"
            :submissions.sync="item.submissions"
            :status.sync="item.status"
            :func="item.func"
          />
        </v-flex>
      </v-layout>
    </no-ssr>
  </v-container>
</template>

<script>
  import _ from 'lodash'
  import {flow, mapValues, values} from 'lodash/fp'

  import CrawlerWorker from '~/components/CrawlerWorker'
  import {WORKER_STATUS} from '~/components/consts'

  import NoSSR from 'vue-no-ssr'

  export default {
    name: 'Statistics',
    components: {
      CrawlerWorker,
      NoSSR,
    },
    data() {
      return {
        username: '',
        workers: {},
      }
    },
    created() {
      // 由于 ssr，data是在服务器上运行的，因此必须在created里面初始化workers
      this.workers = _.mapValues(this.$crawlers, func => ({
        solved: 0,
        submissions: 0,
        status: WORKER_STATUS.WAITING,
        func: func,
      }))
    },
    mounted() {
      if (_.isFunction(this.$redrawVueMasonry)) {
        this.$redrawVueMasonry()
      }
    },
    computed: {
      allSolved() {
        return _.reduce(this.workers, (sum, val) => sum + val.solved, 0)
      },
      allSubmissions() {
        return _.reduce(this.workers, (sum, val) => sum + val.submissions, 0)
      },
      working() {
        // 是否还有worker正在工作
        return _.some(this.workers, item => item.status === WORKER_STATUS.WORKING)
      },
      workerStatus() {
        return flow(
          mapValues(item => item.status),
          values
        )(this.workers)
      },
      notWorkeringRate() {
        // 返回一个0-100的数字，表示不在WORKING状态的Worker的数量
        const cnt = this.workerStatus.length
        // 这一条 lint rule 绝对有 bug
        // eslint-disable-next-line lodash/prefer-compact
        const notWorking = _.filter(item => item !== WORKER_STATUS.WORKING).length
        return notWorking / cnt * 100
      },
    },
    watch: {
      workerStatus() {
        this.$redrawVueMasonry()
      },
    },
    methods: {
      runWorker() {
        _.forEach(this.workers, item => item.status = WORKER_STATUS.WORKING)
      },
    },
  }
</script>

<style scoped>
  .worker-item {
    /*width: 300px;*/
  }
</style>
