<template>
  <div id="app">
    <Header />
    <UIActions
      @modalTriggered="checkIfModalTriggered"
      @typeOfModal="checkTypeOfModal"
    />
    <DashboardPage v-if="!isModalTriggered" />
    <UploadComponent @closeModal="checkIfModalAreClosed" />
    <div class="deleteModal" v-if="isDeleteModal">
      <DeleteComponent @closeModal="checkIfModalAreClosed" />
    </div>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;1,700;1,900&display=swap");
* {
  font-family: "Lato", sans-serif;
}

body {
  overflow-x: hidden;
}
</style>

<script>
/* eslint-disable */
import $ from "jquery";

import Header from "./components/master/Header.vue";
import UIActions from "./components/master/UI-Actions.vue";
import UploadComponent from "./components/shared/Upload-Component.vue";
import dboard from "./components/dboard.vue";
import DashboardPage from "./pages/dboard-page.vue";
import DeleteComponent from "./components/shared/Delete-Component.vue";

export default {
  name: "App",
  components: {
    dboard,
    Header,
    UIActions,
    UploadComponent,
    DashboardPage,
    DeleteComponent,
  },
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
  },
};
</script>

