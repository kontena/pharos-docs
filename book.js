module.exports = {
  title: "Kontena Pharos",
  plugins: [
    "edit-link", "prism", "-highlight", "github", "anchorjs", "ga", "scripts", "versions"
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
    scripts: {
        files: [
            "./_scripts/menu.js"
        ]
    },
    versions: {
        //gitbookConfigURL: "https://raw.githubusercontent.com/rackt/history/gh-pages/book.json",
        options: [
            {
                "value": "https://pharos.sh/docs/v0.6/",
                "text": "Version 0.6.x",
                "selected": true
            },
            {
                "value": "https://github.com/kontena/pharos-cluster/blob/v0.5.0/README.md#pharos-cluster",
                "text": "Version 0.5.x"
            }
        ]
    }
  },
  variables: {
  }
};
