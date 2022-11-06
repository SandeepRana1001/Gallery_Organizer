<template>
  <section class="MoveComponent">
    <div
      class="modal fade"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      id="moveModal"
      tabindex="-1"
      aria-labelledby="moveModal"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-fullscreen">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="moveModal">Move Your Files</h1>
            <button
              type="button"
              class="btn-close"
              v-on:click="closeModal('#moveModal', true)"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <toast-component
              color="text-bg-danger"
              icon="fas fa-exclamation-circle"
              :msg="err"
            />
            <div class="container">
              <div class="row justify-content-center">
                <div class="col-xl-8 col-lg-8 col-md-10-col-12">
                  <form>
                    <div class="form-group mb-3">
                      <label for="destination">
                        Select Destination Folder:
                      </label>
                      <select
                        class="form-control mt-2"
                        id="destination"
                        v-model="parent"
                      >
                        <option :selected="true" value="empty" hidden>
                          Select Destination Folder
                        </option>
                        <option value="none">Dashboard</option>
                        <option
                          v-for="folder in folders"
                          :key="folder.id"
                          :value="folder.id"
                        >
                          {{ folder.name }}
                        </option>
                      </select>

                      <div class="mt-3">
                        <button
                          class="btn theme full-width"
                          v-on:click="submitForm"
                        >
                          Move
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
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

import $ from "jquery";
import ToastComponent from "./Toast-Component.vue";
import Request from "@/globalFunctions/Request";
export default {
  components: { ToastComponent },

  name: "MoveComponent",
  data() {
    return {
      parent: "empty",
      success: false,
      text: "",
      folders: [],
      err: "",
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
    async submitForm(e) {
      e.preventDefault();
      if (this.parent.trim().length < 3 || this.parent.trim() === "empty") {
        this.err = "Please Select A Destination Folder";
        $("#liveToast").addClass("show").fadeIn(2000);
        return;
      }
      const data = {
        files: this.$store.state.fileStore.toActionFiles,
        folders: this.$store.state.fileStore.toActionFolders,
        parent: this.parent,
      };

      const response = await Request.sendRequest(
        "put",
        "upload/updateData",
        data
      );
      if (response.status === 204) {
        this.closeModal("#moveModal", true);
        if (this.parent == "none") {
          this.$router.push("/dashboard");
        } else {
          this.$router.push("/folder/" + this.parent);
        }
      }
    },
  },
  mounted() {
    const dataFromStore = {
      files: this.$store.state.fileStore.file,
      folders: this.$store.state.fileStore.folder,
    };
    const queueFromStore = {
      files: this.$store.state.fileStore.toActionFiles[0],
      folders: this.$store.state.fileStore.toActionFolders[0],
    };
    let current_dir;
    if (queueFromStore.files) {
      let temp = dataFromStore.files.find((element) => {
        if (element.id === queueFromStore.files) {
          return element.parent;
        }
      });

      current_dir = temp.parent;
    } else if (queueFromStore.folders) {
      let temp = dataFromStore.folders.find((element) => {
        if (element.id === queueFromStore.folders) {
          return element.parent;
        }
      });

      current_dir = temp.parent;
    }
    this.folders = this.$store.state.fileStore.folder.filter((folder) => {
      return folder.id != current_dir;
    });
  },
};
</script>