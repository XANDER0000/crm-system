<template>
  <div class="page">
    <slot></slot>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.page {
  padding: 20px;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.pop {
  background-color: red;
  width: 100px;
  height: 100px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
}
</style>