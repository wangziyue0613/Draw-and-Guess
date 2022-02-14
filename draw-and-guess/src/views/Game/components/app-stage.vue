<template>
  <el-card ref="wrapper" :body-style="{ padding: 0 }">
    <v-stage
      :config="stageConfig"
      @mousedown="mousedownHandler"
      @mouseup="mouseupHandler"
      @mousemove="mousemoveHandler"
    >
      <v-layer>
        <v-line
          v-for="(line, index) in lines"
          :key="index"
          :config="line"
        />
      </v-layer>
    </v-stage>
  </el-card>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  data() {
    return {
      // 画布配置
      stageConfig: {
        width: 800,
        height: 700
      },
      // 绘画状态
      painting: false,
      stroke: '#df4b26',
      strokeWidth: 5
    }
  },
  computed: {
    ...mapState(['lines']),
    ...mapGetters(['isGameStarted', 'isGameHolder'])
  },

  mounted() {
    // 将画布宽度设置与容器同宽
    this.stageConfig.width = this.$refs.wrapper.$el.offsetWidth
  },

  methods: {
    // 鼠标按下
    mousedownHandler(e) {
      if (!this.isGameHolder || !this.isGameHolder) return

      this.painting = true
      // 创建一个新线条
      const newLine = {
        stroke: this.stroke,
        strokeWidth: this.strokeWidth,
        points: [e.evt.layerX, e.evt.layerY]
      }
      // 本地画线, 存到vuex中
      this.$store.commit('drawNewLine', newLine)
      // 请求服务器
      this.$store.dispatch('sendDrawNewLine', newLine)
    },

    // 鼠标拖动
    mousemoveHandler(e) {
      if (!this.painting) return
      const lastLine = this.lines[this.lines.length - 1]
      lastLine.points = lastLine.points.concat([e.evt.layerX, e.evt.layerY])
      this.$store.commit('updateNewLine', lastLine)
      // 请求服务器
      this.$store.dispatch('sendUpdateNewLine', lastLine)
    },

    // 鼠标释放
    mouseupHandler() {
      this.painting = false
    }
  }
}
</script>
