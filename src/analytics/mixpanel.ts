import mixpanel from "mixpanel-browser";

export const initMixpanel = () => {
  mixpanel.init(import.meta.env.VITE_MIXPANEL_TOKEN, {
    debug: true,
    track_pageview: true,
    persistence: "localStorage",

    // IMPORTANT: EU project
    api_host: "https://api-eu.mixpanel.com",
  });
};

export default mixpanel;