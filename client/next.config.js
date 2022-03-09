// const withImages = require('next-images')

// module.exports = withImages({
//   fileExtensions: ["jpg", "jpeg", "png", "gif"],
//   images: {
//     disableStaticImages: true
//   },
//   reactStrictMode: true,
//   webpack(config) {
//     config.module.rules.push({
//       test: /\.svg$/i,
//       issuer: /\.[jt]sx?$/,
//       use: ['@svgr/webpack'],
//     })

//     return config
//   },
// })

module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
  }
}
