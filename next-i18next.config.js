const path = require("path");

module.exports = {
  i18n: {
    locales: ["fr", "en", "es", "de", "it"],
    defaultLocale: "fr",
    localeDetection: true,
  },
  localePath: path.resolve("./public/locales"),
};
