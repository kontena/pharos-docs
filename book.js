module.exports = {
  title: "Kontena Pharos",
  plugins: [
    "edit-link", "prism", "-highlight", "github", "anchorjs", "ga", "scripts", "versions", "mixpanel"
  ],
  pluginsConfig: {
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
    mixpanel: {
      token: process.env.MIXPANEL_TOKEN || ""
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
                "value": "https://pharos.sh/docs/1-1/",
                "text": "Version 1.1.x",
                "selected": true
            },
            {
                "value": "https://pharos.sh/docs/1-0/",
                "text": "Version 1.0.x"
            },
            {
                "value": "https://pharos.sh/docs/0-6/",
                "text": "Version 0.6.x"
            }
        ]
    }
  },
  variables: {
  }
};
