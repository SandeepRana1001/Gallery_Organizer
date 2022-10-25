<template>
  <section class="upload-component">
    <!-- Upload Modal -->
    <div
      class="modal fade"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      id="uploadModal"
      tabindex="-1"
      aria-labelledby="uploadModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-fullscreen">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="uploadModalLabel">
              Select Your Files
            </h1>
            <button
              type="button"
              class="btn-close"
              v-on:click="closeModal('#uploadModal', true)"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="upload-section">
              <div class="upload_icon">
                <label class="btn" for="upload_file">
                  <i class="fa-solid fa-upload"></i>
                </label>
              </div>
              <div class="upload_text">
                <p>Upload your Images here</p>
                <p>
                  Images will directly be uploaded to your account and will be
                  private unitll you share them
                </p>
              </div>
              <div class="upload_button">
                <label class="btn theme" for="upload_file">
                  Select Files
                </label>
                <form class="form" enctype="multipart/form-data">
                  <input
                    type="file"
                    id="upload_file"
                    multiple
                    ng-model="files"
                    ref="files"
                    v-on:change="fileHandler"
                    accept="image/x-png,image/gif,image/jpeg"
                    hidden
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Preview Modal -->
    <div
      class="modal fade"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      id="previewModal"
      tabindex="-1"
      aria-labelledby="previewModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-fullscreen">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="previewModalLabel">
              Preview Your Files
            </h1>
            <button
              type="button"
              class="btn-close"
              v-on:click="closeModal('#previewModal', true)"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="container-fluid">
              <div class="row justify-content-around">
                <div
                  class="col-lg-3"
                  v-for="(link, index) in links"
                  :key="index"
                >
                  <div class="image_container">
                    <img :src="link" />
                  </div>
                </div>
              </div>
              <div class="text-center">
                <button class="btn theme" v-on:click="submit">
                  Upload All
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div>
      <label for="progress-bar">0%</label>
      <progress id="progress-bar" value="0" max="100"></progress>
    </div> -->
  </section>
</template>


<style scoped>
.upload_icon label i {
  padding: 50px;
  border-radius: 100%;
  font-size: 5rem;
  color: white;
  background-color: black;
}

.upload_icon,
.upload_text,
.upload_button {
  text-align: center;
  margin-top: 20px;
}
.upload_text p {
  text-transform: capitalize;
  letter-spacing: 1px;
}
.upload_text p:first-child {
  font-weight: bolder;
}

.theme {
  color: white;
  background-color: #8e44ad;
  margin: 20px 0;
}

.image_container {
  height: 200px;
  width: 200px;
  overflow: hidden;
  margin: 10px 0;
}

.image_container img {
  height: inherit;
  width: inherit;
  transition: all 0.5s ease-in-out;
}

.image_container img:hover {
  transform: scale(1.1);
}
</style>

<script>
/* eslint-disable */

import axios from "axios";
import $ from "jquery";
export default {
  name: "UploadComponent",
  props: {
    msg: String,
  },
  data() {
    return {
      files: [],
      MIME_TYPE_MAP: {
        "image/jpeg": "jpeg",
        "image/jpg": "jpg",
        "image/png": "png",
      },
      links: [],
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
    game() {
      this.$emit("game", "game");
    },

    fileHandler(event) {
      this.links = [];
      this.files = [];
      $("#uploadModal").addClass("show").fadeIn(1000);
      // console.clear();
      const files = event.target.files;
      let fileType = "";
      for (const i of Object.keys(files)) {
        fileType = files[i].type;
        if (this.MIME_TYPE_MAP[fileType]) {
          this.files.push(files[i]);
          let reader = new FileReader();

          reader.onload = () => {
            this.links.push(reader.result);
          };
          reader.readAsDataURL(this.files[i]);
        }
      }
      this.closeModal("#uploadModal", false);
      $("#previewModal").addClass("show").fadeIn(1000);
    },
    async submit(event) {
      // console.clear();

      event.preventDefault();
      const formData = new FormData();

      for (const i of Object.keys(this.files)) {
        // console.log(this.files[i]);
        formData.append("images", this.files[i]);
      }
      const bar = document.getElementById("progress-bar");
      //   const config = {
      //     onUploadProgress: function (progressEvent) {
      //       const percentCompleted = Math.round(
      //         (progressEvent.loaded / progressEvent.total) * 100
      //       );
      //       bar.setAttribute("value", percentCompleted);
      //       bar.previousElementSibling.textContent = `${percentCompleted}%`;
      //       if (percentCompleted === 100) {
      //         bar.previousElementSibling.textContent = `Upload complete!`;
      //       }
      //     },
      //   };
      let response;
      response = await axios.post(
        "http://localhost:5000/api/upload/uploadData",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        // console.clear();
        console.log("Fetching Data");
        response = await axios.get("http://localhost:5000/api/upload/");
        this.$store.dispatch("updateFiles", response.data.data);
        this.closeModal("#previewModal", true);

        // this.$router.go(); //refresh the page
      }
    },
  },
};
</script>