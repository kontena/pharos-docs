module.exports = {
  title: "Kontena Pharos",
  plugins: [
    "edit-link", "prism", "-highlight", "github", "anchorjs",
    "ga", "scripts", "versions-select", "insert-logo",
    "mikxpanel@git+https://github.com/kontena/gitbook-plugin-mikxpanel.git"
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
    },
    versions: {
        gitbookConfigURL: "https://raw.githubusercontent.com/kontena/pharos-docs/master/versions.json",
        options: [
        ]
    },
    "insert-logo": {
        "url": "https://kontena.io/images/kontena-logo-solid-horizontal.svg",
        "style": "background: none;"
    }
  },
  variables: {
  }
};
