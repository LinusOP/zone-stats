<template>
  <v-card>
    <v-card-title>
      {{ this.title }}
    </v-card-title>
    <v-divider></v-divider>
    <v-data-table
      :headers="headers"
      :items="entries"
      class="elevation-1"
      hide-default-footer
    >
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
        { text: "Total Points", value: "total_points" },
        { text: "Percentage of points", value: "points_percent" },
      ],
    });
  },
  methods: {
    formatPercentage() {
      this.entries.forEach((entry, i) => {
        this.entries[i].points_percent = `${(entry.points_percent).toFixed(2)}%`;
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
