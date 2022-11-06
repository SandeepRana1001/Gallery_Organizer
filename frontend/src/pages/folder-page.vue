<template>
  <section class="dashboard-page">
    <UIActions
      @modalTriggered="checkIfModalTriggered"
      @typeOfModal="checkTypeOfModal"
      :enableUIActions="enableUIActions"
    />
    <folder-board
      v-if="!isModalTriggered"
      @isUIActionEnabled="showUIAction"
      @reload="checkIfModalAreClosed"
      @remountUIAction="isUIActionRemounted"
    />
    <UploadComponent @closeModal="checkIfModalAreClosed" />
    <div class="deleteModal" v-if="isDeleteModal">
      <DeleteComponent @closeModal="checkIfModalAreClosed" />
    </div>
    <div class="moveModal" v-if="isMoveModal">
      <MoveCopyComponent
        @closeModal="checkIfModalAreClosed"
        @receiveErrors="getErrors"
      />
    </div>
    <NewFolder @closeModal="checkIfModalAreClosed" />
  </section>
</template>

<script>
/* eslint-disable */
import folderBoard from "@/components/folder-board.vue";
import $ from "jquery";
import UIActions from "../components/master/UI-Actions.vue";
import UploadComponent from "../components/shared/Upload-Component.vue";
import DeleteComponent from "../components/shared/Delete-Component.vue";
import MoveCopyComponent from "../components/shared/Move-Copy-Component.vue";
import NewFolder from "@/components/shared/new-folder.vue";
export default {
  components: {
    MoveCopyComponent,
    folderBoard,
    UploadComponent,
    DeleteComponent,
    UIActions,
    NewFolder,
  },
  name: "DashboardPage",
  data() {
    return {
      isModalTriggered: false,
      isModalClose: true,
      isDeleteModal: false,
      isMoveModal: false,
      err: "",
      enableUIActions: false,
    };
  },
  methods: {
    isUIActionRemounted(childData) {
      this.enableUIActions = childData;
    },
    getErrors(childErrors) {
      this.err = childErrors;
      $("#liveToast").addClass("show").fadeIn(2000);
    },
    checkIfModalTriggered(childData) {
      this.isModalTriggered = childData;
    },
    checkIfModalAreClosed(childData) {
      this.isModalTriggered = !childData;
      this.isDeleteModal = false;
      this.isMoveModal = false;
    },
    checkTypeOfModal(childData) {
      if (childData === "deleteModal") {
        this.isDeleteModal = true;
        setTimeout(() => {
          $("#deleteModal").addClass("show").fadeIn(1000);
        }, 2000);
      } else if (childData === "moveModal") {
        this.isMoveModal = true;
        setTimeout(() => {
          $("#moveModal").addClass("show").fadeIn(1000);
        }, 2000);
      }
    },
    showUIAction(childData) {},
  },
  mounted() {
    if (!this.$store.state.userStore.user._id) {
      this.$router.push("/signUp");
    }

    const id = window.location.href.split("/folder/")[1];
    this.$store.dispatch("updateFolderParent", id);
    this.$store.dispatch("updateFolderAction", []);
    this.$store.dispatch("updateToAction", []);
  },
};
</script>