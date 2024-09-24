<template>
  <div class="header">
    <Upload action="//jsonplaceholder.typicode.com/posts/">
      <Button size="large" icon="ios-cloud-upload-outline"
        >Upload And Analyse</Button
      >
    </Upload>
    <Button
      size="large"
      icon="ios-download-outline"
      type="primary"
      @click="downloadJson"
      >Download Example</Button
    >
  </div>
</template>

<script>
export default {
  name: "Header",
  methods: {
    downloadJson() {
      const filePath = "/example.json";

      const link = document.createElement("a");
      link.href = filePath;

      link.download = "data.json";

      link.click();
    },
  },
};
</script>

<style scoped>
.header {
  height: 12%;
  width: 100%;
  border: 1px solid #8ce6b0;
  background-color: #edfff3;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 2em;
}
</style>
