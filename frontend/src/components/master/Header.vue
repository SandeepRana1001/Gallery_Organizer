<template>
  <nav class="navbar navbar-expand-lg navbar-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Photo-Organizer</a>
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
        <form class="d-flex" role="search">
          <a href="#" class="btn btn-success" type="submit">
            <i class="fa-solid fa-user"></i>
            Register
          </a>
        </form>
      </div>
    </div>
  </nav>
</template>


<style scoped>
nav {
  background: linear-gradient(100deg, #8e44ad 0%, #9b59b6 25%);
}
</style>

<script>
/* eslint-disable */

export default {
  name: "Header",
};
</script>

