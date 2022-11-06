<template>
  <section class="dashboard">
    <ViewChanger @send="receive" />
    <div class="container-fluid">
      <div class="row mt-4">
        <div class="col-lg-12 col-md-12 col-sm-12 col-12">
          <p class="text-center" v-if="!length">
            Please upload some image first
          </p>
          <ListView
            v-if="isList"
            :files="files"
            :folders="folders"
            @enableUIAction="remountUIAction"
          />
          <ThumbnailView
            v-if="!isList"
            :files="files"
            :folders="folders"
            @enableUIAction="remountUIAction"
          />
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
      folders: [],
    };
  },
  methods: {
    remountUIAction(childData) {
      this.$emit("remountUIAction", childData);
    },
    receive(childData) {
      this.isList = childData === "list" ? true : false; // "Hello World"
    },
    isUIActionEnabled(childData) {
      this.$emit("isUIActionEnabled", childData);
    },
  },
  async beforeMount() {
    const current_dir = this.$store.state.fileStore.current_folder;
    const creator = this.$store.state.userStore.user._id;
    let response = await axios.get(
      `${process.env.VUE_APP_SERVER}upload/${creator}`
    );

    this.$store.dispatch("updateFiles", response.data.data);
    this.$store.dispatch("updateFolders", response.data.folders);

    this.files = response.data.data.filter((file) => {
      return file.parent === "none";
    });
    this.folders = response.data.folders.filter((folder) => {
      return folder.parent === "none";
    });
  },
  updated() {
    this.length =
      this.$store.state.fileStore.file.length > 0 ||
      this.$store.state.fileStore.folder.length > 0;
    console.log(this.length);
  },
};
</script>