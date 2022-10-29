<template>
  <section class="dashboard">
    <ViewChanger @send="receive" />
    <div class="container-fluid">
      <div class="row mt-4">
        <div class="col-lg-12 col-md-12 col-sm-12 col-12">
          <p class="text-center" v-if="length === 0">
            Please upload some image first
          </p>
          <ListView v-if="isList" @enableUIActions="isUIActionEnabled" />
          <ThumbnailView v-if="!isList" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.list-group-item input {
  margin-right: 20px !important;
}
</style>

<script>
/* eslint-disable */
import ListView from "./shared/List-View";
import axios from "axios";
import ViewChanger from "./master/View-Changer.vue";
import ThumbnailView from "./shared/Thumbnail-View.vue";
export default {
  name: "dboard",
  components: {
    ListView,
    ViewChanger,
    ThumbnailView,
  },
  props: ["parentData"],
  data() {
    return {
      files: [],
      isList: true,
      length: 0,
    };
  },
  methods: {
    receive(childData) {
      this.isList = childData === "list" ? true : false; // "Hello World"
    },
    isUIActionEnabled(childData) {
      console.log("Working");
      this.$emit("isUIActionEnabled", childData);
    },
  },
  async mounted() {
    let response = await axios.get("http://localhost:5000/api/upload/");
    this.files = await response.data.data;
    this.$store.dispatch("updateFiles", this.files);
    this.isList = this.$store.state.fileStore.view === "list" ? true : false;
    this.length = this.$store.state.fileStore.file.length;
  },
};
</script>