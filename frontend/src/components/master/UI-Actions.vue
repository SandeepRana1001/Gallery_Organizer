<template>
  <section class="">
    <div class="container-fluid ui-actions">
      <div class="row justify-content-center">
        <div class="col-lg-6 col-md-6 col-sm-10 col-12">
          <div class="text-center">
            <button v-on:click="openModal('#uploadModal')">
              <i class="fa-solid fa-upload"></i>
              <span> Upload </span>
            </button>
            <button>
              <i class="fa-solid fa-arrow-right-to-bracket"></i>
              <span> Move </span>
            </button>
            <button>
              <i class="fa-solid fa-copy"></i>
              <span> Copy </span>
            </button>
            <button v-on:click="openModal('#deleteModal')">
              <i class="fa-sharp fa-solid fa-trash"></i>
              <span> Delete </span>
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
    },
  },
};
</script>