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
