<template>
  <section class="BreadCrumbs">
    <div class="container">
      <nav aria-label="breadcrumb" style="--bs-breadcrumb-divider: '>'">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link :to="`/dashboard`"> Dashboard </router-link>
          </li>
          <!-- <li
            class="breadcrumb-item"
            :class="length === index ? `active` : ``"
            v-for="(item, index) in breadCrumb"
            :key="index"
          >
            <router-link :to="`/folder/${item.id}`" v-if="length !== index">
              {{ item.name }}
            </router-link>
            <span v-if="length === index">
              {{ item.name }}
            </span>
          </li> -->
        </ol>
      </nav>
    </div>
  </section>
</template>


<script>
export default {
  name: "BreadCrumbs",
  //   props: ["path_list"],
  data() {
    return {
      length: 0,
      breadCrumb: [],
    };
  },
  methods: {},
  mounted() {
    console.log("Mounted BreadCrumb");
    this.breadCrumb = this.$store.state.fileStore.bread_crumb;
    this.length = this.breadCrumb.length - 1;
  },
};
</script>