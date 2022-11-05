<template>
  <section class="">
    <div class="container-fluid mt-3">
      <div class="row justify-content-center">
        <div class="col-lg-12 col-md-6 col-sm-10 col-12">
          <div class="text-end">
            <button v-on:click="changeType">
              <i class="fa-regular fa-image" v-if="!isList"></i>
              <i class="fa-solid fa-list" v-if="isList"></i>
              <span> {{ displayType }} </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.viewChanger {
  background-color: #82a992;
  padding: 5px 0;
}

button,
label,
a {
  padding-right: 50px;
  border: 0px;
  background-color: transparent;
  color: black;
}

button i {
  margin-right: 5px;
}
button span {
  text-transform: uppercase;
}
a {
  color: white;
  text-decoration: none;
}
</style>

<script>
export default {
  name: "ViewChanger",
  data() {
    return {
      displayType: "list",
      isList: true,
    };
  },
  methods: {
    send() {
      this.$emit("send", this.displayType);
    },
    changeType() {
      this.isList = !this.isList;
      if (this.isList) {
        this.displayType = "list";
      } else {
        this.displayType = "thumbnail";
      }

      this.$store.dispatch("updateView", { view: this.displayType });
      this.send();
    },
  },
  mounted() {
    this.displayType = this.$store.state.fileStore.view;
    if (this.displayType === "list") {
      this.isList = true;
    } else {
      this.isList = false;
    }
  },
};
</script>