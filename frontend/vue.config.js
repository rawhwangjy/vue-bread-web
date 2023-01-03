const { defineConfig } = require('@vue/cli-service')
// import { defineConfig } from '@vue/cli-service'
const target = 'http://127.0.0.1:3000/'

module.exports = defineConfig({
  devServer: {
    // client 8081 에서 서버로 호출하기 위해 데이터 요청을 하는데, path에 api가 들어 있으면, target으로 맵핑 시켜준다.
    port: 8082,
    proxy: {
      '^/api': {
        target,
        changeOrigin: true
      }
    }
  }
})
