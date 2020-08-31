<template>
  <v-app>
    <v-app-bar app dark color="#141414" class="text-h4">
      <v-icon x-large class="mr-3">mdi-target-account</v-icon>
      RPUK Zone Stats
      <v-spacer></v-spacer>
      <span v-if="!loading" class="text-body-2 grey--text d-none d-sm-inline">
        Last Updated: {{ this.apiData.lastCall }}
      </span>
      <v-btn
        color="success"
        class="ml-4 d-none d-sm-inline"
        width="134px"
        v-if="!loading"
        :disabled="btnCooldown"
        @click="refresh"
        >{{ !this.btnCooldown ? "Refresh" : "Please Wait" }}</v-btn
      >
    </v-app-bar>
    <v-main>
      <v-container class="pa-0" fluid v-if="!loading">
        <v-tabs
          v-model="tab"
          color="white"
          background-color="#1e2124"
          dark
          show-arrows
        >
          <v-tab v-for="title in titles" :key="title">
            {{ title }}
          </v-tab>
          <v-tabs-items v-model="tab" class="pa-4" dark>
            <v-tab-item>
              <v-row justify="center">
                <v-col cols="12" lg="4" md="6" sm="12">
                  <PointsTable
                    title="Points in last 24 Hours"
                    :entries="apiData.points.rolling24h"
                  />
                </v-col>
                <v-col cols="12" lg="4" md="6" sm="12">
                  <KillsTable
                    title="Kills in last 24 Hours"
                    :entries="apiData.kills.rolling24h"
                  />
                </v-col>
              </v-row>
            </v-tab-item>
            <v-tab-item>
              <v-row>
                <v-col cols="12" lg="3" md="6" sm="12">
                  <PointsTable
                    title="Todays points"
                    :entries="apiData.points.currentDay"
                  />
                </v-col>
                <v-col cols="12" lg="3" md="6" sm="12">
                  <PointsTable
                    title="Yesterdays points"
                    :entries="apiData.points.lastDay"
                  />
                </v-col>
                <v-col cols="12" lg="3" md="6" sm="12">
                  <KillsTable
                    title="Todays kills"
                    :entries="apiData.kills.currentDay"
                  />
                </v-col>
                <v-col cols="12" lg="3" md="6" sm="12">
                  <KillsTable
                    title="Yesterdays kills"
                    :entries="apiData.kills.lastDay"
                  />
                </v-col>
              </v-row>
            </v-tab-item>
            <v-tab-item>
              <v-row>
                <v-col cols="12" lg="3" md="6" sm="12">
                  <PointsTable
                    title="This weeks points"
                    :entries="apiData.points.currentWeek"
                  />
                </v-col>
                <v-col cols="12" lg="3" md="6" sm="12">
                  <PointsTable
                    title="Last weeks points"
                    :entries="apiData.points.lastWeek"
                  />
                </v-col>
                <v-col cols="12" lg="3" md="6" sm="12">
                  <KillsTable
                    title="This weeks kills"
                    :entries="apiData.kills.currentWeek"
                  />
                </v-col>
                <v-col cols="12" lg="3" md="6" sm="12">
                  <KillsTable
                    title="Last weeks kills"
                    :entries="apiData.kills.lastWeek"
                  />
                </v-col>
              </v-row>
            </v-tab-item>
            <v-tab-item>
              <v-row>
                <v-col cols="12" lg="3" md="6" sm="12">
                  <PointsTable
                    title="This months points"
                    :entries="apiData.points.currentMonth"
                  />
                </v-col>
                <v-col cols="12" lg="3" md="6" sm="12">
                  <PointsTable
                    title="Last months points"
                    :entries="apiData.points.lastMonth"
                  />
                </v-col>
                <v-col cols="12" lg="3" md="6" sm="12">
                  <KillsTable
                    title="This months kills"
                    :entries="apiData.kills.currentMonth"
                  />
                </v-col>
                <v-col cols="12" lg="3" md="6" sm="12">
                  <KillsTable
                    title="Last months kills"
                    :entries="apiData.kills.lastMonth"
                  />
                </v-col>
              </v-row>
            </v-tab-item>
            <v-tab-item>
              <v-row justify="center">
                <v-col cols="12" lg="4" md="6" sm="12">
                  <PointsTable
                    title="Points of all time"
                    :entries="apiData.points.allTime"
                  />
                </v-col>
                <v-col cols="12" lg="4" md="6" sm="12">
                  <KillsTable
                    title="Kills of all time"
                    :entries="apiData.kills.allTime"
                  />
                </v-col>
              </v-row>
            </v-tab-item>
          </v-tabs-items>
        </v-tabs>
      </v-container>
      <v-container class="pa-0 d-flex justify-center" v-else fill-height fluid>
        <v-progress-circular
          indeterminate
          color="#171717"
          size="175"
          width="7"
        ></v-progress-circular>
      </v-container>
    </v-main>
    <v-footer class="justify-center text-caption py-1" app dark color="#1e2124">
      <span
        >Made by
        <a
          href="https://www.roleplay.co.uk/profile/40332-nomad/"
          target="_blank"
          rel="noopener noreferrer"
          >Nomad</a
        >
        | Data and API provided by
        <a
          href="https://www.roleplay.co.uk"
          target="_blank"
          rel="noopener noreferrer"
          >Roleplay UK</a
        >
      </span>
    </v-footer>
  </v-app>
</template>

<script>
import moment from "moment";
import getApiData from "./api";
import PointsTable from "./components/PointsTable.vue";
import KillsTable from "./components/KillsTable.vue";

export default {
  name: "App",
  components: {
    PointsTable,
    KillsTable,
  },
  data() {
    return ({
      loading: true,
      btnCooldown: false,
      apiData: {
        yeet: "yeet",
      },
      tab: null,
      titles: [
        "Last 24h",
        "Daily",
        "Weekly",
        "Monthly",
        "All Time",
      ],
    });
  },
  methods: {
    refreshData() {
      getApiData()
        .then((data) => {
          this.apiData = {
            lastCall: moment(new Date()).format("HH:mm:ss zz"),
            ...data,
          };
        });
    },
    refresh() {
      this.refreshData();
      this.btnCooldown = true;
      setTimeout(() => {
        this.btnCooldown = false;
      }, 30 * 1000);
    },
  },
  created() {
    getApiData()
      .then((data) => {
        this.loading = false;
        this.apiData = {
          lastCall: moment(new Date()).format("HH:mm:ss zz"),
          ...data,
        };
      });
  },
};
</script>

<style lang="scss">
html {
  overflow-y: hidden;
}

@media screen and (max-width: 1264px) {
  html {
    overflow-y: scroll;
  }
}

.v-data-table {
  background-color: #23272a !important;
}

tr:hover {
  background-color: #2c2f33 !important;
}

td {
  color: #e0e0e0;
}

.v-main__wrap,
.v-tabs-items {
  background-color: #2c2f33 !important;
}
</style>
