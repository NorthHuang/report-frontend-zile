<template>
    <div class="page-container">
        <div class="left-panel">
            <div class="banner">
                <div class="txt">Using machine learning models to assess the risk of unknown URLs</div>
                <Button
                    size="large"
                    type="primary"
                    to="/url_analysis" target="_blank"
                >
                    URL Analysis
                </Button>
            </div>
            <div class="banner">
                <div class="txt">Analyze and chart your network data using hybrid models</div>
                <div class="txt" style="color:springgreen;">Advanced Function, Need Login</div>
                <Button
                    size="large"
                    type="primary"
                    to="/report" target="_blank"
                >
                    Data Analysis
                </Button>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
name: "Index",
data() {
    return {};
}
}
</script>

<style scoped>
.page-container {
background-image: url('../assets/back-ground.jpeg');
background-size: cover;
background-position: center;
background-repeat: no-repeat;
height: 100vh;
}
.left-panel {
width: 30%; /* 左边的宽度为30% */
height: 100vh; /* 高度为全屏 */
position: absolute; /* 绝对定位 */
top: 0;
left: 5%;
box-sizing: border-box; /* 确保内边距不会影响div的宽度 */
display: flex;
flex-direction: column;
justify-content: space-evenly;
align-items: center;
}
.banner {
    background-color: hsla(0, 0%, 100%, 0.1);
    width: 75%;
    height: 30%;
    color: rgb(223, 222, 231);
    font-size: 150%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    border-radius: 1em;
}
.txt {
    text-align: center;
    line-height: normal;
    font-family: Simplon Norm, Open Sans, sans-serif;
    font-weight: 300;
}
</style>
