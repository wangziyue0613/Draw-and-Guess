<template>
  <div class="app-header">
    <el-tag v-if="connected" type="success">服务已连接</el-tag>
    <el-tag v-else type="danger">服务未连接</el-tag>

    <el-tag v-if="isGameStarted" type="success">游戏进行中</el-tag>
    <el-tag v-else type="info">游戏未开始</el-tag>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['connected']),
    ...mapGetters(['isGameStarted'])
  }
}
</script>

<style scoped>
.el-tag {
  margin-right: 10px;
}
</style>
