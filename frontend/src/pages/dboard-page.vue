<template>
  <section class="dashboard-page">
    <!-- <div v-if="err.length > 0">
      <toast-component
        color="text-bg-danger"
        icon="fas fa-exclamation-circle"
        :msg="err"
      />
    </div> -->
    <UIActions
      @modalTriggered="checkIfModalTriggered"
      @typeOfModal="checkTypeOfModal"
      :enableUIActions="enableUIActions"
    />
    <dboard
      v-if="!isModalTriggered"
      @isUIActionEnabled="showUIAction"
      @remountUIAction="isUIActionRemounted"
    />
    <UploadComponent @closeModal="checkIfModalAreClosed" />
    <div class="deleteModal" v-if="isDeleteModal">
      <DeleteComponent
        @closeModal="checkIfModalAreClosed"
        @receiveErrors="getErrors"
      />
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
import Dboard from "@/components/dboard.vue";
import $ from "jquery";
import UIActions from "../components/master/UI-Actions.vue";
import UploadComponent from "../components/shared/Upload-Component.vue";
import DeleteComponent from "../components/shared/Delete-Component.vue";
import MoveCopyComponent from "../components/shared/Move-Copy-Component.vue";

import NewFolder from "@/components/shared/new-folder.vue";
export default {
  components: {
    Dboard,
    UploadComponent,
    DeleteComponent,
    MoveCopyComponent,
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
    const isUserLoggedIn = this.$store.state.userStore.user._id ? true : false;
    this.$emit("resetHeader", isUserLoggedIn);
    if (!isUserLoggedIn) {
      this.$router.push("/signUp");
    }
    this.$store.dispatch("updateFolderAction", []);
    this.$store.dispatch("updateToAction", []);

    this.$store.dispatch("updateFolderParent", "none");
  },
};
</script>