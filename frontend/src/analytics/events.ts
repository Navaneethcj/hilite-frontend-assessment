import mixpanel from "./mixpanel";

export const AnalyticsEvents = {
  appLoaded() {
    mixpanel.track("App Loaded");
  },
};