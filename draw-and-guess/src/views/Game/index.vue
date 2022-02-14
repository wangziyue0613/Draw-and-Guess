<template>
  <el-container>
    <!-- 布局：头部 -->
    <el-header height="30">
      <app-header />
    </el-header>

    <!-- 布局：主体 -->
    <el-container>
      <!-- 左边 -->
      <el-aside width="400px" class="left-panel">
        <app-side-panel />
      </el-aside>

      <!-- 右边 -->
      <el-main>
        <app-stage />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppHeader from './components/app-header'
import AppStage from './components/app-stage'
import AppSidePanel from './components/app-side-panel'
export default {
  components: {
    AppHeader,
    AppStage,
    AppSidePanel
  },
  created() {
    this.$store.dispatch('sendUserEnter')
  },

  methods: {

  }
}
</script>

<style lang="scss" scoped>
.left-panel {
  padding: 20px;
}
</style>
