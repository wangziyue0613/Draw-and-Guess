<template>
  <el-card>
    <!-- 玩家列表 -->
    <div class="panel-area">
      <ul class="participants">
        <li v-for="item in nicknames" :key="item">
          <span>{{ item }} {{ item === nickname ? '（我）' : '' }}</span>
          <el-tag v-if="item === holder" size="mini">主持</el-tag>
        </li>
      </ul>
    </div>

    <!-- 按钮工具栏 -->
    <div class="panel-area button-area">
      <el-button
        v-if="!isGameStarted"
        type="primary"
        size="small"
        icon="el-icon-edit"
        @click="startGameHandler"
      >主持游戏</el-button>

      <el-button
        v-if="isGameStarted && nickname === holder"
        type="warning"
        size="small"
        icon="el-icon-delete"
        @click="stopGameHandler"
      >终止游戏</el-button>

      <el-button
        v-if="isGameStarted && nickname !== holder"
        type="success"
        size="small"
        icon="el-icon-magic-stick"
        @click="answerGameHandler"
      >猜答案</el-button>

      <el-button
        type="danger"
        size="small"
        icon="el-icon-switch-button"
        @click="exitHandler"
      >退出游戏</el-button>
    </div>

    <!-- 弹出框：主持人设置答案 -->
    <el-dialog
      title="请设置答案"
      :visible.sync="resultDialogVisible"
      width="30%"
    >
      <el-input v-model="expectImageName" placeholder="请输入您的答案" />

      <span slot="footer" class="dialog-footer">
        <el-button @click="resultDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveDialogHandler">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 弹出框：答题人设置答案 -->
    <el-dialog
      title="请填写答案"
      :visible.sync="answerDialogVisible"
      width="30%"
    >
      <el-input v-model="inputImageName" placeholder="请输入您的答案" />

      <span slot="footer" class="dialog-footer">
        <el-button @click="answerDialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="saveAnswerDialogHandler"
        >确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  data() {
    return {
      resultDialogVisible: false,
      expectImageName: '',
      answerDialogVisible: false,
      inputImageName: ''
    }
  },

  computed: {
    ...mapState(['nickname', 'nicknames', 'holder']),
    ...mapGetters(['isGameStarted'])
  },

  methods: {
    startGameHandler() {
      // 开始游戏
      // 1. 显示弹框
      this.resultDialogVisible = true
      // 2. 清空输入框内容
      this.expectImageName = ''
    },

    stopGameHandler() {
      this.$confirm('确定要终止游戏吗?', '温馨提示').then(() => {
        // 发送游戏终止申请
        this.$store.dispatch('sendStopGame')
      }).catch(e => {
        console.log(e)
      })
    },

    answerGameHandler() {
      this.answerDialogVisible = true
      this.inputImageName = ''
    },

    saveDialogHandler() {
      // 1. 校验答案是否为空
      if (!this.expectImageName) {
        this.$message.error('答案不能为空哦!')
        return
      }
      // 2. 发送开始游戏的申请
      this.$store.dispatch('sendStartGame', this.expectImageName)

      // 3. 关闭弹框
      this.resultDialogVisible = false
    },

    saveAnswerDialogHandler() {
      // 1. 检查答案是否为空
      if (!this.inputImageName) {
        this.$message.error('答案不能为空')
        return
      }
      // 2. 将答案发送到服务器
      this.$store.dispatch('sendAnswerGame', this.inputImageName)
      // 3. 关闭弹出框
      this.answerDialogVisible = false
    },

    exitHandler() {
      this.$confirm('是否退出游戏', '温馨提示').then(() => {
        this.$store.dispatch('sendUserLeave')
        this.$router.replace('/login')
      }).catch(e => {
        console.log(e)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-area {
  margin: 10px 0;
}
</style>
