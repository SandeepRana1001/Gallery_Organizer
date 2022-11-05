<template>
  <section class="delete-component">
    <div
      class="modal fade"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      id="deleteModal"
      tabindex="-1"
      aria-labelledby="deleteModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-fullscreen">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="deleteModalLabel">
              Delete Selected Images
            </h1>
            <button
              type="button"
              class="btn-close"
              v-on:click="closeModal('#deleteModal', true)"
              v-if="success"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="container-fluid">
              <div class="loader_container">
                <button
                  class="btn btn-primary"
                  type="button"
                  disabled
                  v-if="!success"
                >
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Deletion In Progress...
                </button>

                <button
                  class="btn btn-success"
                  type="button"
                  disabled
                  v-if="success"
                >
                  <i class="fas fa-check-circle"></i>
                  {{ text }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.loader_container {
  position: absolute;
  left: 40%;
  top: 40%;
}
</style>

<script>
/* eslint-disable */

import axios from "axios";
import $ from "jquery";
export default {
  name: "DeleteComponent",
  data() {
    return {
      success: false,
      text: "",
    };
  },
  methods: {
    closingModal(val) {
      this.$emit("closeModal", val);
    },
    closeModal(id, val) {
      $(id).removeClass("show").fadeOut(1000);
      this.closingModal(val);
    },
  },
  async mounted() {
    this.success = false;
    let data = this.$store.state.fileStore.toActionFiles;
    let folder_data = this.$store.state.fileStore.toActionFolders;

    // if (data.length > 1) {
    this.text = "Data Deleted Successfully";
    // } else {
    //   this.text = "File Deleted Successfully";
    // }
    var formdata = {};

    const response = await axios.delete(
      `${process.env.VUE_APP_SERVER}upload/deleteData`,
      {
        data: {
          files: data,
          folders: folder_data,
        },
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response.status === 200) {
      this.success = true;
    }
  },
};
</script>