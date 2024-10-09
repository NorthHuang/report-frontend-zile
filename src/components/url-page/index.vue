<template>
  <div class="body">
    <div class="main">
      <p id="title">Free website malware and security checker</p>
      <p id="describe">
        Enter a URL like example.com and the system based on hybrid model will
        check the website for risk level
      </p>
      <Input
        v-model="url"
        search
        enter-button="Analyze"
        @on-search="analyzeUrl"
        placeholder="Enter URL"
        size="large"
        style="width: 70%"
      />
      <div v-if="risk_level" class="result" style="width: 70%">
        <Progress
          hide-info
          :percent="risk_level_enum[risk_level]['percent']"
          :stroke-color="risk_level_enum[risk_level]['color']"
        />
        <p id="desc" :style="{ color: risk_level_enum[risk_level]['color'] }">
          {{ risk_level_enum[risk_level]["desc"] }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Index",
  data() {
    return {
      url: "",
      risk_level: "",
      risk_level_enum: {
        benign: {
          percent: 25,
          desc: "No risk: The system is running normally with no threats. It is recommended to maintain system health and perform regular checks.",
          color: "#4CAF50",
        },
        defacement: {
          percent: 50,
          desc: "Moderate risk: The system may have been defaced, which, while not directly harmful to data, indicates a security vulnerability. It is recommended to repair the defacement and check for other potential security risks.",
          color: "#388E3C",
        },
        phishing: {
          percent: 75,
          desc: "High risk: Phishing attacks have been detected, which could lead to users being tricked into providing sensitive information. It is recommended to enhance security measures and alert users to watch for suspicious activity.",
          color: "#FF9800",
        },
        malware: {
          percent: 100,
          desc: "Critical risk: The system is infected with malware, which could result in significant data loss or privacy breaches. Immediate isolation and thorough malware removal are advised.",
          color: "#FF3D00",
        },
      },
    };
  },
  methods: {
    async analyzeUrl() {
      try {
        const response = await this.$axios.post("/analyze_url", {
          url: this.url,
        });
        if (response.data.status === "ok") {
          this.risk_level = response.data.result;
        } else {
          console.error("Failed to fetch reports:", response.data.error);
        }
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
      this.url = "";
    },
  },
};
</script>

<style scoped>
.body {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  height: 100vh;
  background-image: url("../../assets/url-page-background.jpg"); /* 设置背景图片 */
  background-size: cover; /* 背景图片覆盖整个区域 */
  background-position: center; /* 背景图片居中 */
  background-repeat: no-repeat; /* 背景图片不重复 */
}
.main {
  width: 70%;
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 1em;
}
#title {
  font-family:
    Titillium Web,
    Helvetica,
    Arial,
    Tahoma,
    sans-serif;
  font-weight: 700;
  --tw-text-opacity: 1;
  color: rgb(2 134 115 / var(--tw-text-opacity));
  font-size: 50px;
  text-align: center;
}
#describe {
  font-size: 1.25rem;
  line-height: 1.75rem;
  text-align: center;
  font-family:
    Titillium Web,
    Helvetica,
    Arial,
    Tahoma,
    sans-serif;
}
.result {
  width: 100%;
  height: 40%;
}
#desc {
  font-size: 1.5rem;
  line-height: 1.75rem;
  text-align: center;
  font-family:
    Titillium Web,
    Helvetica,
    Arial,
    Tahoma,
    sans-serif;
}
</style>
