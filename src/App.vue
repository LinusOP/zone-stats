<template>
  <v-app>
    <v-app-bar app dark color="secondary" class="title darken-1">
      RPUK Zone Stats
      <v-spacer></v-spacer>
      <span class="text-body-2">
        Last Updated: {{ this.apiData.lastCall }}
      </span>
      <v-btn
        color="success"
        class="ml-4"
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
          slider-color="white"
          background-color="secondary"
          dark
        >
          <v-tab v-for="title in titles" :key="title">
            {{ title }}
          </v-tab>
          <v-tabs-items v-model="tab" class="pa-4">
            <v-tab-item>
              <v-row>
                <v-col>
                  <PointsTable
                    title="Points in last 24 Hours"
                    :entries="apiData.points.rolling24h"
                  />
                </v-col>
                <v-col>
                  <KillsTable
                    title="Kills in last 24 Hours"
                    :entries="apiData.kills.rolling24h"
                  />
                </v-col>
              </v-row>
            </v-tab-item>
            <v-tab-item>
              <v-row>
                <v-col>
                  <PointsTable
                    title="Todays points"
                    :entries="apiData.points.currentDay"
                  />
                </v-col>
                <v-col>
                  <KillsTable
                    title="Todays kills"
                    :entries="apiData.kills.currentDay"
                  />
                </v-col>
              </v-row>
            </v-tab-item>
            <v-tab-item>
              <v-row>
                <v-col>
                  <PointsTable
                    title="This weeks points"
                    :entries="apiData.points.currentWeek"
                  />
                </v-col>
                <v-col>
                  <KillsTable
                    title="This weeks kills"
                    :entries="apiData.kills.currentWeek"
                  />
                </v-col>
              </v-row>
            </v-tab-item>
            <v-tab-item>
              <v-row>
                <v-col>
                  <PointsTable
                    title="This months points"
                    :entries="apiData.points.currentMonth"
                  />
                </v-col>
                <v-col>
                  <KillsTable
                    title="This months kills"
                    :entries="apiData.kills.currentMonth"
                  />
                </v-col>
              </v-row>
            </v-tab-item>
            <v-tab-item>
              <v-row>
                <v-col>
                  <PointsTable
                    title="Points of all time"
                    :entries="apiData.points.allTime"
                  />
                </v-col>
                <v-col>
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
      <v-container v-else fill-height fluid>
        <v-row align="center" justify="center">
          <v-col cols="1">
            <v-progress-circular
              indeterminate
              color="primary"
              size="150"
            ></v-progress-circular>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer class="justify-center text-subtitle-2" app dark>
      Made by Nomad | Data and API provided by
      <a href="https://roleplay.co.uk" target="_blank"> Roleplay UK</a>
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
        "Last 24",
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
  overflow: hidden;
}
</style>
