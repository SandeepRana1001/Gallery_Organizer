<template>
  <section class="dashboard">
    <ViewChanger @send="receive" />
    <div class="container-fluid">
      <div class="row mt-4">
        <div class="col-lg-12 col-md-12 col-sm-12 col-12">
          <ListView v-if="isList" />
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
    };
  },
  methods: {
    receive(childData) {
      this.isList = childData === "list" ? true : false; // "Hello World"
      console.log(this.isList);
    },
  },
  async mounted() {
    console.log("DBoard Mounted");
    console.log(this.$store.state.fileStore.view);
    let response = await axios.get("http://localhost:5000/api/upload/");
    this.files = await response.data.data;
    this.$store.dispatch("updateFiles", this.files);
  },
};
</script>