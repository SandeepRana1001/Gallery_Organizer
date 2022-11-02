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
                v-on:click="addToQueue(folder._id)"
                :checked="checkIfActive(folder._id)"
              />
              <router-link :to="`/folder/${folder._id}`">
                <span>
                  <i class="fas fa-folder"></i>
                </span>
                <span>
                  {{ folder.name }}
                </span>
              </router-link>
            </li>
            <li class="list-group-item" v-for="item in files" :key="item._id">
              <input
                class="form-check-input me-1"
                type="checkbox"
                value=""
                :id="item._id"
                v-on:click="addToQueue(item._id)"
                :checked="checkIfActive(item._id)"
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
    };
  },
  methods: {
    enableUIActions() {
      this.$emit("enableUIAction", true);
    },
    async addToQueue(id) {
      if (this.queue.includes(id)) {
        this.queue = this.queue.filter((element) => element !== id);
      } else {
        this.queue.push(id);
      }
      this.$store.dispatch("updateToAction", this.queue);
    },
    checkIfActive(_id) {
      if (this.$store.state.fileStore.toActionFiles.includes(_id)) {
        return true;
      }
      return false;
    },
  },
};
</script>