<template>
  <nav class="navbar navbar-expand-lg navbar-dark">
    <div class="container">
      <router-link class="nav-link" aria-current="page" to="/">
        Image-Organizer
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>
        <form class="d-flex" role="search" v-if="!updateHeader">
          <router-link to="/signUp" class="btn btn-success" type="submit">
            <span>
              <i class="fa-solid fa-user"></i>
            </span>
            <span> Register </span>
          </router-link>
        </form>
      </div>
    </div>
  </nav>
</template>


<style scoped>
nav {
  background: linear-gradient(100deg, #8e44ad 0%, #9b59b6 25%);
}
a {
  color: white !important;
}

a span {
  margin-right: 5px;
}
</style>

<script>
/* eslint-disable */

export default {
  name: "Header",
  props: ["updateHeader"],
  data() {
    return {
      isLoggedIn: false,
    };
  },
  mounted() {
    console.log("mounted");
    if (this.$store.state.userStore.user._id) {
      this.isLoggedIn = true;
    }
  },
};
</script>

