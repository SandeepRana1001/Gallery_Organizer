<template>
  <section class="toastComponent">
    <div class="toast-container p-3 bottom-0 start-0">
      <div
        :class="`toast align-items-center border-0  ${color}`"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        id="liveToast"
      >
        <div class="d-flex">
          <div class="toast-body">
            <span>
              <i :class="icon"></i>
            </span>
            <span> {{ msg }} </span>
          </div>
          <button
            type="button"
            class="btn-close btn-close-white me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.toast-body span {
  margin: 0 5px;
}
</style>

<script>
export default {
  name: "toastComponent",
  props: ["color", "icon", "msg"],
};
</script>