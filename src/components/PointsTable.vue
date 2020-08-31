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
          sortable: false,
          value: "group",
          width: "40%",
        },
        {
          text: "Total Points",
          value: "total_points",
          align: "center",
          width: "30%",
        },
        { text: "Percentage of points (%)", value: "points_percent", align: "center" },
      ],
    });
  },
  methods: {
    formatPercentage() {
      this.entries.forEach((entry, i) => {
        this.entries[i].points_percent = (entry.points_percent).toFixed(2);
      });
    },
  },
  mounted() {
    this.formatPercentage();
  },
  updated() {
    this.formatPercentage();
  },
};
</script>

<style>
</style>
