<template>
  <div>
    <h1>Dashboard</h1>
    <div class="content">
      In the {{name}} page!
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "Dashboard"
    };
  }
};
</script>
<style lang="scss" scoped>
.content {
  color: lightcoral;
}
</style>

