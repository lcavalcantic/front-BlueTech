<template>
  <AgendaView />
</template>

<script>
import AgendaView from "./view/AgendaView.vue";
export default {
  name: "App",
  components: {
    AgendaView,
  },
};
</script>

<style>
body {
  background-color: #f4f4f4;
  color: #4b5563;
}
</style>
