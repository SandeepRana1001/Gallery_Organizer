<template>
  <section class="dashboard">
    <div class="container-fluid">
      <div class="row mt-4">
        <div class="col-lg-12 col-md-12 col-sm-12 col-12">
          <ul class="list-group">
            <li
              class="list-group-item"
              v-for="folder in folders"
              :key="folder._id"
            >
              <input
                class="form-check-input me-1"
                type="checkbox"
                value=""
                :id="folder._id"
                v-on:click="addToQueueFolder(folder._id)"
                :checked="checkIfActive(folder._id, 'folder')"
              />
              <button v-on:click="redirection(folder._id, folder.name)">
                <span>
                  <i class="fas fa-folder"></i>
                </span>
                <span>
                  {{ folder.name }}
                </span>
              </button>
            </li>
            <li class="list-group-item" v-for="item in files" :key="item._id">
              <input
                class="form-check-input me-1"
                type="checkbox"
                value=""
                :id="item._id"
                v-on:click="addToQueue(item._id)"
                :checked="checkIfActive(item._id, 'file')"
              />
              <label class="form-check-label" :for="item._id">
                <span>
                  <i class="fa-regular fa-file"></i>
                </span>
                <span>
                  {{ item.displayName }}
                </span>
              </label>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.list-group-item input {
  margin-right: 20px !important;
}
a {
  text-decoration: none;
}
.form-check-label span,
a span {
  margin: 0 5px;
}
button {
  border: 0;
  background: transparent;
  color: #2980b9;
}
</style>

<script>
/* eslint-disable */

import axios from "axios";
export default {
  name: "ListView",
  props: ["files", "folders"],
  data() {
    return {
      // files: [],
      queue: [],
      folder_queue: [],
      enableAction: false,
    };
  },
  methods: {
    enableUIAction() {
      if (this.queue.length > 0 || this.folder_queue.length > 0)
        this.$emit("enableUIAction", true);
      else this.$emit("enableUIAction", false);
    },
    async addToQueue(id) {
      if (this.queue.includes(id)) {
        this.queue = this.queue.filter((element) => element !== id);
      } else {
        this.queue.push(id);
      }
      this.$store.dispatch("updateToAction", this.queue);

      this.enableUIAction();
    },
    async addToQueueFolder(id) {
      if (this.folder_queue.includes(id)) {
        this.folder_queue = this.folder_queue.filter(
          (element) => element !== id
        );
      } else {
        this.folder_queue.push(id);
      }
      this.$store.dispatch("updateFolderAction", this.folder_queue);

      this.enableUIAction();
    },
    checkIfActive(_id, type) {
      if (type === "file") {
        if (this.$store.state.fileStore.toActionFiles.includes(_id)) {
          return true;
        } else {
          return false;
        }
      } else {
        if (this.$store.state.fileStore.toActionFolders.includes(_id)) {
          return true;
        } else {
          return false;
        }
      }
    },
    remountFolder(id) {
      const data = {
        id,
        status: true,
      };
      this.$emit("remountFolder", data);
    },
    redirection(id, name) {
      this.remountFolder(id);
      const data = {
        name,
        id,
      };
      this.$store.dispatch("addBreadCrumb", data);
      // window.location.replace(`http://localhost:8080/#/folder/` + id);
      this.$router.push(`/folder/${id}`);
    },
  },
  mounted() {},
};
</script>