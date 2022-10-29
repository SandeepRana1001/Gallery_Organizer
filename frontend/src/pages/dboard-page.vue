<template>
  <section class="dashboard-page">
    <UIActions
      @modalTriggered="checkIfModalTriggered"
      @typeOfModal="checkTypeOfModal"
    />
    <dboard v-if="!isModalTriggered" @isUIActionEnabled="showUIAction" />
    <UploadComponent @closeModal="checkIfModalAreClosed" />
    <div class="deleteModal" v-if="isDeleteModal">
      <DeleteComponent @closeModal="checkIfModalAreClosed" />
    </div>
  </section>
</template>

<script>
import Dboard from "@/components/dboard.vue";
import $ from "jquery";
import UIActions from "../components/master/UI-Actions.vue";
import UploadComponent from "../components/shared/Upload-Component.vue";
import DeleteComponent from "../components/shared/Delete-Component.vue";
export default {
  components: { Dboard, UploadComponent, DeleteComponent, UIActions },
  name: "DashboardPage",
  data() {
    return {
      isModalTriggered: false,
      isModalClose: true,
      isDeleteModal: false,
    };
  },
  methods: {
    checkIfModalTriggered(childData) {
      this.isModalTriggered = childData;
    },
    checkIfModalAreClosed(childData) {
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
    if (!this.$store.state.userStore.user._id) {
      this.$router.push("/signUp");
    }
  },
};
</script>