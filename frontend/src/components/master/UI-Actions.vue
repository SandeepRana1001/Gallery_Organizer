<template>
  <section class="">
    <div class="container-fluid ui-actions">
      <div class="row justify-content-center">
        <div class="col-lg-8 col-md-8 col-sm-12 col-12">
          <div class="text-center">
            <button v-on:click="openModal('#newFolder')">
              <i class="fa-regular fa-folder"></i>
              <span> New Folder </span>
            </button>
            <button v-on:click="openModal('#uploadModal')">
              <i class="fa-solid fa-upload"></i>
              <span> Upload </span>
            </button>
            <!-- <button v-if="enableUIActions">
              <i class="fa-solid fa-arrow-right-to-bracket"></i>
              <span> Move </span>
            </button>
            <button v-if="enableUIActions">
              <i class="fa-solid fa-copy"></i>
              <span> Copy </span>
            </button> -->
            <button
              v-on:click="openModal('#deleteModal')"
              v-if="enableUIActions"
            >
              <i class="fa-sharp fa-solid fa-trash"></i>
              <span> Delete Files </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ui-actions {
  background-color: #27ae60;
  padding: 5px 0;
}

button,
label,
a {
  padding-right: 50px;
  border: 0px;
  background-color: transparent;
  color: white;
}

button i {
  margin-right: 5px;
}
a {
  color: white;
  text-decoration: none;
}
</style>

<script>
import $ from "jquery";
export default {
  name: "UiActions",
  props: ["enableUIActions"],
  data() {
    return {
      isVisible: false,
    };
  },
  methods: {
    modalTriggered() {
      this.$emit("modalTriggered", true);
    },
    typeOfModal(type) {
      this.$emit("typeOfModal", type);
    },
    openModal(id) {
      $(id).addClass("show").fadeIn(1000);
      this.modalTriggered();
      if (id == "#deleteModal") this.typeOfModal("deleteModal");
      else if (id == "#uploadModal") this.typeOfModal("uploadModal");
      else if (id == "#deleteFolderModal") {
        this.typeOfModal("deleteFolderModal");
      }
    },
    setVisible(val) {
      this.isVisible = val;
    },
  },
  mounted() {
    console.log(this.$store.state.fileStore.toActionFiles.length);
    if (this.$store.state.fileStore.toActionFiles.length > 0) {
      this.setVisible(true);
    }
  },
};
</script>