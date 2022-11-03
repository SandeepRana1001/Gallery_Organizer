<template>
  <section class="newFolder">
    <toast-component
      color="text-bg-danger"
      icon="fas fa-exclamation-circle"
      :msg="err"
    />
    <div
      class="modal fade"
      id="newFolder"
      tabindex="-1"
      aria-labelledby="newFolderLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="newFolderLabel">New Folder</h1>
            <button
              type="button"
              class="btn-close"
              v-on:click="closeModal('#newFolder', true)"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row align-items-center">
              <div class="col-lg-12 col-12">
                <form class="form">
                  <div class="form-group mt-3 mb-3">
                    <label for="folder_name" class="col-form-label"
                      >Enter Folder name</label
                    >
                    <input
                      type="text"
                      id="folder_name"
                      class="form-control"
                      aria-describedby="folder_name"
                      placeholder="Folder Name"
                      v-model="folder_name"
                      autocomplete="off"
                    />
                  </div>

                  <input
                    type="submit"
                    class="btn theme"
                    value="Create New Folder"
                    v-on:click="createFolder"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
input {
  width: 100%;
}
</style>


<script>
/* eslint-disable */

import $ from "jquery";
import axios from "axios";

import ToastComponent from "./Toast-Component.vue";
export default {
  components: { ToastComponent },
  name: "newFolder",
  data() {
    return {
      folder_name: null,
      err: null,
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
    async createFolder(event) {
      event.preventDefault();
      if (this.folder_name.trim().length < 3) {
        this.err = "A Valid Folder Name Is Required";
        $("#liveToast").addClass("show").fadeIn(2000);
      }

      const parent = this.$store.state.fileStore.current_folder;
      console.log(parent);

      const data = {
        name: this.folder_name,
        parent,
        creator: this.$store.state.userStore.user._id,
      };

      console.log(data);

      const options = {
        url: process.env.VUE_APP_SERVER + "folder/newFolder",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        data,
      };
      const response = await axios(options);
      if (response.status === 201) {
        this.closeModal("#newFolder", true);
      }
    },
  },
};
</script>