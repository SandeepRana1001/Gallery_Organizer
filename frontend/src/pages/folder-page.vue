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
    <NewFolder @closeModal="checkIfModalAreClosed" />
  </section>
</template>

<script>
import folderBoard from "@/components/folder-board.vue";
import $ from "jquery";
import UIActions from "../components/master/UI-Actions.vue";
import UploadComponent from "../components/shared/Upload-Component.vue";
import DeleteComponent from "../components/shared/Delete-Component.vue";
import NewFolder from "@/components/shared/new-folder.vue";
export default {
  components: {
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
      enableUIActions: false,
    };
  },
  methods: {
    isUIActionRemounted(childData) {
      this.enableUIActions = childData;
    },
    checkIfModalTriggered(childData) {
      this.isModalTriggered = childData;
    },
    reloadModal(childData) {
      console.log("Reload Modal " + childData);
      this.isModalTriggered = childData;

      this.isModalTriggered = !childData;
    },
    checkIfModalAreClosed(childData) {
      console.log(childData);
      this.isModalTriggered = !childData;
      this.isDeleteModal = false;
    },
    checkTypeOfModal(childData) {
      if (childData === "deleteModal") this.isDeleteModal = true;

      setTimeout(() => {
        $("#deleteModal").addClass("show").fadeIn(1000);
      }, 2000);
    },
    showUIAction(childData) {
      console.log(childData);
    },
  },
  mounted() {
    console.log("mounted page folder");
    if (!this.$store.state.userStore.user._id) {
      this.$router.push("/signUp");
    }

    const id = window.location.href.split("/folder/")[1];
    this.$store.dispatch("updateFolderParent", id);
  },
};
</script>