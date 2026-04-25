const fs = require("fs");
const path = require("path");

// This is for backward compatible when migration from Jekyll to Gatsby
exports.createPages = ({graphql, actions}) => {
  const {createRedirect} = actions;
  createRedirect({
    fromPath: '/big-data/parser/sqllineage-a-sql-lineage-analysis-tool/',
    toPath: '/blog/sqllineage-a-sql-lineage-analysis-tool/',
    redirectInBrowser: true
  });
  createRedirect({
    fromPath: '/python/unicode/how-python-does-unicode/',
    toPath: '/blog/how-python-does-unicode/',
    redirectInBrowser: true
  });
  createRedirect({
    fromPath: '/kaggle/classification/kaggle-instacart-market-basket-analysis-retrospect/',
    toPath: '/blog/kaggle-instacart-market-basket-analysis-retrospect/',
    redirectInBrowser: true
  });
  createRedirect({
    fromPath: '/big-data/log/a-review-of-log/',
    toPath: '/blog/a-review-of-log/',
    redirectInBrowser: true
  });
  createRedirect({
    fromPath: '/web/realtime/to-build-a-real-time-system-starting-with-websocket/',
    toPath: '/blog/to-build-a-real-time-system-starting-with-websocket/',
    redirectInBrowser: true
  });
}

// Generate meta-refresh HTML files for redirects (replaces gatsby-plugin-meta-redirect)
exports.onPostBuild = ({ store }) => {
  const { redirects, program, config } = store.getState();

  let pathPrefix = "";
  if (program.prefixPaths) {
    pathPrefix = config.prefixPaths;
  }

  const publicFolder = path.join(program.directory, "public");

  for (const redirect of redirects) {
    const { fromPath, toPath } = redirect;
    let url = toPath.trim();
    if (!url.includes("://")) {
      if (!url.startsWith("/")) url = `/${url}`;
      if (!url.includes(".")) url = `${url}/`.replace(/\/\/+/g, "/");
    }

    const filePath = path.join(publicFolder, fromPath.replace(pathPrefix, ""), "index.html");
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, `<meta http-equiv="refresh" content="0; URL='${url}'" />`);
    }
  }
};
