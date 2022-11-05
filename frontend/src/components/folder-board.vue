<template>
  <section class="folder">
    <ViewChanger @send="receive" />
    <div class="container-fluid" v-if="!isLoading">
      <div class="row mt-4">
        <bread-crumbs />

        <div class="col-lg-12 col-md-12 col-sm-12 col-12">
          <p class="text-center" v-if="!length">
            Please upload some image first
          </p>
          <ListView
            v-if="isList === true"
            :files="files"
            :folders="folders"
            @remountFolder="isRemountRequired"
            @enableUIAction="remountUIAction"
          />
          <ThumbnailView
            v-if="isList === false"
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
import BreadCrumbs from "./shared/Bread-Crumbs.vue";
export default {
  name: "folderBoard",
  components: {
    ListView,
    ViewChanger,
    ThumbnailView,
    BreadCrumbs,
  },
  props: ["parentData"],
  data() {
    return {
      files: [],
      isList: true,
      length: 0,
      folders: [],
      name: "",
      isLoading: false,
      bread_crumb: [],
    };
  },
  methods: {
    remountUIAction(childData) {
      this.$emit("remountUIAction", childData);
    },
    populateData(files, folders, current_dir, id) {
      this.files = files.filter((file) => {
        return file.parent === current_dir;
      });

      this.folders = folders.filter((folder) => {
        return folder.parent === current_dir;
      });

      this.name = folders.find((folder) => {
        return folder._id === id;
      }).name;
    },

    async isRemountRequired(childData) {
      const creator = this.$store.state.userStore.user._id;
      this.isLoading = true;
      this.isList = 0;
      if (!childData.status) return;
      this.files = [];
      this.folders = [];
      const id = childData.id;
      this.$store.dispatch("updateFolderParent", id);

      // const files = this.$store.state.fileStore.file;
      // const folders = this.$store.state.fileStore.folder;
      // this.files = files.filter((file) => {
      //   return file.parent === id;
      // });

      // this.folders = folders.filter((folder) => {
      //   return folder.parent === id;
      // });

      let response = await axios.get(
        `${process.env.VUE_APP_SERVER}upload/${creator}`
      );

      this.files = response.data.data.filter((file) => {
        return file.parent === id;
      });

      this.folders = response.data.folders.filter((folder) => {
        return folder.parent === id;
      });

      this.name = response.data.folders.find((folder) => {
        return folder._id === id;
      }).name;

      this.list = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
      // this.bread_crumb = this.$store.state.fileStore.bread_crumb;
    },

    receive(childData) {
      this.isList = childData === "list" ? true : false; // "Hello World"
    },
    isUIActionEnabled(childData) {
      this.$emit("isUIActionEnabled", childData);
    },
  },
  async beforeMount() {
    const id = window.location.href.split("/folder/")[1];
    const current_dir = id;

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
    const type = this.$store.state.fileStore.view === "list" ? true : false;
    this.isList = type;

    // this.populateData(
    //   response.data.data,
    //   response.data.folders,
    //   current_dir,
    //   id
    // );
  },
  updated() {
    this.length =
      this.$store.state.fileStore.file.length > 0 ||
      this.$store.state.fileStore.folder.length > 0;
  },
};
</script>