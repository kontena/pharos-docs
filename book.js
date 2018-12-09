module.exports = {
  title: "Kontena Pharos",
  plugins: [
    "edit-link", "prism", "-highlight", "github", "anchorjs", "ga", "scripts", "versions",
    "mikxpanel@git+https://github.com/kontena/gitbook-plugin-mikxpanel.git"
  ],
  pluginsConfig: {
    fontsettings: {
      "theme": "night"
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
        //gitbookConfigURL: "https://raw.githubusercontent.com/rackt/history/gh-pages/book.json",
        options: [
            {
                "value": "https://pharos.sh/docs/master/",
                "text": "Version 2.1.x",
                "selected": true
            },
            {
                "value": "https://pharos.sh/docs/2-0/",
                "text": "Version 2.0.x"
            },
            {
                "value": "https://pharos.sh/docs/1-3/",
                "text": "Version 1.3.x",
            },
            {
                "value": "https://pharos.sh/docs/1-2/",
                "text": "Version 1.2.x"
            },
            {
                "value": "https://pharos.sh/docs/1-1/",
                "text": "Version 1.1.x"
            },
            {
                "value": "https://pharos.sh/docs/1-0/",
                "text": "Version 1.0.x"
            }
        ]
    }
  },
  variables: {
  }
};
