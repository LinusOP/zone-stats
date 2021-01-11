<template>
  <v-card class="elevation-3 grey--text text--lighten-3" color="#23272A" dark>
    <v-card-title>
      {{ title }}
    </v-card-title>
    <v-divider></v-divider>
    <v-data-table
      :headers="headers"
      :items="entries"
      hide-default-footer
      must-sort
      sort-by="kills"
      :sort-desc="true"
      show-expand
      single-expand
      :expanded.sync="expanded"
      item-key="group"
    >
      <template #[`item.kd_ratio`]="{ item }">
        {{
          (item.deaths > 0 ? item.kills / item.deaths : item.kills)
            | formatPercentage
        }}
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <div class="d-flex justify-space-around">
            <span>Rebels killed: {{ item.killed_rebels }}</span>
            <span>Police killed: {{ item.killed_police }}</span>
            <span> Poseidon killed: {{ item.killed_poseidon }} </span>
          </div>
        </td>
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
    return {
      expanded: [],
      headers: [
        { text: "Gang", sortable: false, value: "group" },
        { text: "Kills", value: "kills", align: "center" },
        { text: "Deaths", value: "deaths", align: "center" },
        { text: "K/D Ratio", value: "kd_ratio", align: "center" },
        { text: "", value: "data-table-expand" },
      ],
    };
  },
  filters: {
    formatPercentage: (val) => val.toFixed(2),
  },
};
</script>
