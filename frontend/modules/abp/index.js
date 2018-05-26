const path = require('path')
const axios = require('axios')

module.exports = async function ({url}) {

  this.requireModule('@nuxtjs/axios')

  const response = await axios.get(url)

  const {dst} = this.addTemplate({
    src: path.resolve(__dirname, 'plugin.template.js'),
    fileName: 'abp.plugin.js',
    options: {
      content: response.data,
    },
  })

  // 将 plugin 放到最后，保证此时 axios 已经加载
  this.options.plugins.push({
    src: path.join(this.options.buildDir, dst),
  })
}
