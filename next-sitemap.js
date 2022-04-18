/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: process.env.REACT_APP_BASE_URL,
  generateRobotsTxt: true,
  outDir: ".next"
}
