<template>
  <section class="folder">
    <ViewChanger @send="receive" />
    <div class="container-fluid">
      <div class="row mt-4">
        <div class="container">
          <nav style="--bs-breadcrumb-divider: '>'" aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/dashboard">Dashboard</router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                {{ name }}
              </li>
            </ol>
          </nav>
        </div>
        <div class="col-lg-12 col-md-12 col-sm-12 col-12">
          <p class="text-center" v-if="length === 0">
            Please upload some image first
          </p>
          <ListView v-if="isList" :files="files" :folders="folders" />
          <ThumbnailView v-if="!isList" :files="files" :folders="folders" />
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
  name: "folderBoard",
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
      name: "",
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
    this.length = this.$store.state.fileStore.file;
    const id = window.location.href.split("/folder/")[1];
    const current_dir = id;

    this.$store.dispatch("updateFolderParent", id);

    const creator = this.$store.state.userStore.user._id;

    let response = await axios.get(
      `${process.env.VUE_APP_SERVER}upload/${creator}`
    );

    this.files = response.data.data.filter((file) => {
      return file.parent === current_dir;
    });

    this.folders = response.data.folders.filter((folder) => {
      return folder.parent === current_dir;
    });

    this.name = response.data.folders.find((folder) => {
      return folder._id === id;
    }).name;
  },
};
</script>