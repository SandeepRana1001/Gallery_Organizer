<template>
  <section class="RegisterPage">
    <div v-for="(err, index) in error" :key="index">
      <toast-component
        color="text-bg-danger"
        icon="fas fa-exclamation-circle"
        :msg="err"
        :key="index"
      />
    </div>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-xl-6 col-lg-6 col-md-8 col-sm-10 col-12">
          <form class="card">
            <div class="card-body">
              <h3>Register</h3>
              <div class="form-group mt-3">
                <label for="name"> Name </label>
                <input
                  type="text"
                  placeholder="Full Name"
                  class="form-control"
                  id="name"
                  v-model="data.name"
                  autocomplete="off"
                />
              </div>
              <div class="form-group mt-3">
                <label for="email"> Email </label>
                <input
                  type="email"
                  placeholder="Email Address"
                  class="form-control"
                  id="email"
                  v-model="data.email"
                  autocomplete="off"
                />
              </div>
              <div class="form-group mt-3">
                <label for="password"> Password </label>
                <input
                  type="text"
                  placeholder="Password"
                  class="form-control"
                  id="Password"
                  v-model="data.password"
                  autocomplete="off"
                />
              </div>
              <p class="mt-3">
                <router-link to="/signIn">
                  Already A User ? Sign In
                </router-link>
              </p>
              <input
                type="button"
                class="btn theme"
                name="submit"
                value="Register"
                v-on:click="submitForm"
                :disabled="isDisabled"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  margin: 20px 0;
}

.theme {
  width: 100%;
}
a {
  text-decoration: none;
}
</style>


<script>
import $ from "jquery";
import axios from "axios";
import ToastComponent from "@/components/shared/Toast-Component.vue";

export default {
  components: { ToastComponent },
  name: "RegisterPage",
  data() {
    return {
      data: {
        name: "Sandeep Rana",
        email: "sr36358@gmail.com",
        password: "1234567",
      },
      error: [],
      isDisabled: false,
    };
  },
  methods: {
    checkIfValid() {
      this.error = [];
      if (this.data.name.trim().length < 3)
        this.error.push("A Valid Name Is Required");

      if (this.data.email.trim().length < 3)
        this.error.push("A Valid Email Is Required");

      if (this.data.password.trim().length < 6)
        this.error.push("A Valid Password Is Required");

      if (this.error.length > 0) {
        $("#liveToast").addClass("show").fadeIn(2000);
        return false;
      } else {
        $("#liveToast").removeClass("show");
        return true;
      }
    },
    async submitForm(e) {
      e.preventDefault();
      if (this.checkIfValid()) {
        // this.isDisabled = true;
        const formData = new FormData();
        formData.append("name", this.data.name);
        formData.append("email", this.data.email);
        formData.append("password", this.data.password);
        const options = {
          url: process.env.VUE_APP_SERVER + "users/createAccount",
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
          },
          data: {
            name: this.data.name,
            email: this.data.email,
            password: this.data.password,
          },
        };
        const response = await axios(options);

        if (response.status === 201) {
          const data = response.data.user;
          this.$store.dispatch("updateUser", data);
          localStorage.setItem("email", data.email);
          localStorage.setItem("_id", data._id);
          localStorage.setItem("name", data.name);
          this.$router.push("/dashboard");
        }
      }
    },
  },
  mounted() {
    if (this.$store.state.userStore.user._id) {
      this.$router.push("/dashboard");
    }
  },
};
</script>