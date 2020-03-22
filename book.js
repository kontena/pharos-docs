module.exports = {
  title: "Kontena Pharos",
  plugins: [
    "edit-link", "prism", "-highlight", "github", "anchorjs",
    "ga", "scripts"
  ],
  pluginsConfig: {
    fontsettings: {
      "theme": "white"
    },
    "edit-link": {
      base: "https://github.com/kontena/pharos-docs/tree/master",
      label: "Edit This Page"
    },
    github: {
      url: "https://github.com/kontena/pharos-docs/"
    },
    ga: {
      token: process.env.GA_CODE || ""
    },
    mikxpanel: {
      token: process.env.MIXPANEL_TOKEN || "",
      event_prefix: "docs.pharos"
    },
    scripts: {
        files: [
            "./_scripts/menu.js"
        ]
    }
  },
  variables: {
  }
};
