<template>
  <div class="news-wrapper" v-if="news.length">
    <span class="head">
      <h1>News</h1>
    </span>
    <Divider style="width: 60px;" />
    <div v-if="loaded" class="news-container">
      <a
        v-for="article in news"
        :key="article.headline + Math.random()"
        :href="article.url"
        target="_blank"
        class="news"
        rel="noopener noreferrer"
      >
        <div class="news-left">
          <div>
            <span class="source">{{article.source}}</span>
            <Divider type="vertical" />
            <span class="date">{{getDate(article.datetime)}}</span>
            <Divider style="margin: 5px 0 5px 0;" />
          </div>
          {{article.headline}}
        </div>
        <span class="news-right">
          <img :src="articleImage(article)" alt class="news-image" />
        </span>
      </a>
    </div>
  </div>
</template>

<script>
import IEX from "./../api/IEX";
import moment from "moment";
export default {
  name: "news",
  props: {
    company: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      news: [],
      loaded: false
    };
  },
  async beforeMount() {
    this.news = await IEX.getNews(this.company);
    this.loaded = true;
  },
  methods: {
    getDate(date) {
      return moment(date).format("ddd, MMM Do, YYYY");
    },
    articleImage(article) {
      if (article.source == "Zacks Investment Research") {
        return "./../../../public/zacks.png";
      } else {
        return article.image;
      }
    }
  },
  watch: {
    async company(val) {
      this.news = await IEX.getNews(val);
      this.loaded = true;
    }
  }
};
</script>

<style scoped>
.news-wrapper {
  width: 45%;
  text-align: left;
}
.news-container {
  width: 100%;
  font-size: 1.1em;
}
.head {
  float: left;
  margin-bottom: 10px;
  font-size: 1.1em;
}
.news {
  height: 150px;
  display: block;
  justify-content: space-between;
  width: 90%;
}
.news-left {
  vertical-align: middle;
  padding-top: 40px;
  padding-left: 10px;
  font-weight: bold;
  font-size: 1.1em;
  color: black;
  float: left;
  width: 60%;
  height: 120px;
}
.source {
  font-size: large;
}
.date {
  color: rgba(128, 128, 128, 0.582);
}
.news-right {
  padding-top: 15px;
  float: right;
  width: 30%;
  height: 120px;
}
.news-image {
  width: 180px;
  height: 120px;
  border-radius: 8px;
}
a:hover {
  background-color: rgba(153, 152, 152, 0.11);
}
</style>