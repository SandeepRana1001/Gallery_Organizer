<template>
  <section class="dashboard">
    <div class="container-fluid">
      <div class="row mt-4">
        <div class="col-lg-3" v-for="folder in folders" :key="folder._id">
          <li class="list-group-item">
            <input
              class="form-check-input me-1 thumbnail_typo_checkbox"
              type="checkbox"
              value=""
              :id="folder._id"
              v-on:click="addToQueueFolder(folder._id)"
              :checked="checkIfActive(folder._id, 'folder')"
            />
            <button v-on:click="redirection(folder._id, folder.name)">
              <span class="thumbnail_typo">
                <i class="fas fa-folder"></i>
              </span>
              <span class="thumbnail_typo">
                {{ folder.name }}
              </span>
            </button>
          </li>
        </div>
      </div>

      <div class="row mt-4">
        <div
          class="col-lg-3 col-md-4 col-sm-6 col-12 mb-3"
          v-for="item in files"
          :key="item._id"
        >
          <label class="list-group-item img-container" :for="item._id">
            <input
              class="form-check-input me-1 thumbnail_typo_checkbox"
              type="checkbox"
              value=""
              :id="item._id"
              v-on:click="addToQueue(item._id)"
              :checked="checkIfActive(item._id, 'file')"
            />
            <img :src="item.url" />
          </label>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.list-group-item {
  border: 1px solid rgba(0, 0, 0, 0.125);
  /* padding: 10px 20px; */
}
.list-group-item input {
  margin-right: 20px !important;
}
.img-container img {
  width: 100%;
  height: 400px;
}
/* .list-group-item img {
  height: 100%;
  width
  z-index: 1;
} */

button {
  border: 0;
  background: transparent;
  color: #2980b9;
}

.thumbnail_typo {
  font-size: 30px;
}

.thumbnail_typo_checkbox {
  font-size: 30px;
  border: 2px solid #2980b9;
  padding: 10px 20px;

  /* transform: scale(2); */
}
</style>

<script>
/* eslint-disable */

import axios from "axios";
import jquery from "jquery";
export default {
  name: "ListView",
  props: ["isList", "files", "folders"],
  data() {
    return {
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
      // console.log(id);
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
};
</script>