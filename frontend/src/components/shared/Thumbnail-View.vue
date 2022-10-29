<template>
  <section class="dashboard">
    <div class="container-fluid">
      <div class="row mt-4">
        <div
          class="col-lg-3 col-md-4 col-sm-6 col-12"
          v-for="item in files"
          :key="item._id"
        >
          <div class="img_container">
            <input
              class="form-check-input me-1"
              type="checkbox"
              value=""
              :id="item._id"
              v-on:click="addToQueue(item._id)"
              :checked="checkIfActive(item._id)"
            />
            <label :for="item._id" class="img_container">
              <img :src="item.url" class="img_container-image" />
            </label>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.list-group-item input {
  margin-right: 20px !important;
}
.img_container {
  height: 200px;
  width: 200px;
  margin: 10px 0;
  position: relative;
}
.img_container-image {
  height: 100%;
  width: 100%;
  z-index: 1;
}
input[type="checkbox"] {
  position: absolute;
  margin: 20px 5px;
  z-index: 99;
}
</style>

<script>
/* eslint-disable */

import axios from "axios";
import jquery from "jquery";
export default {
  name: "ListView",
  props: ["isList"],
  data() {
    return {
      files: [],
      queue: [],
    };
  },
  methods: {
    addToQueue(id) {
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
  async mounted() {
    let response = await axios.get("http://localhost:5000/api/upload/");
    this.files = response.data.data;
    this.$store.dispatch("updateFiles", this.files);
  },
};
</script>