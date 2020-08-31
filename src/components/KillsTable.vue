<template>
  <v-card class="elevation-3">
    <v-card-title>
      {{ this.title }}
    </v-card-title>
    <v-divider></v-divider>
    <v-data-table :headers="headers" :items="entries" hide-default-footer>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  props: {
    title: String,
    entries: Array,
  },
  data() {
    return ({
      headers: [
        {
          text: "Gang",
          align: "start",
          sortable: false,
          value: "group",
        },
        { text: "Kills", value: "kills" },
      ],
    });
  },
};
</script>

<style>
</style>
