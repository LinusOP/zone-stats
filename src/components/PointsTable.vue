<template>
  <v-card class="elevation-3 grey--text text--lighten-3" color="#23272A" dark>
    <v-card-title>
      {{ title }}
    </v-card-title>
    <v-divider></v-divider>
    <v-data-table
      :headers="headers"
      :items="entries"
      item-class="table-row"
      hide-default-footer
      must-sort
      sort-by="total_points"
      :sort-desc="true"
    >
      <template #[`item.points_percent`]="{ value }">
        {{ value | formatPercentage }}%
      </template>
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
        { text: "Gang", sortable: false, value: "group" },
        { text: "Total Points", value: "total_points", align: "center" },
        { text: "Percentage of points", value: "points_percent", align: "center" },
      ],
    });
  },
  filters: {
    formatPercentage: (val) => val.toFixed(2),
  },
};
</script>

<style>
</style>
