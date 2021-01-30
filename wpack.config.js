//
// Gleaned off the web - but doesn't offer anything over 
// mode production when running webpack AFAIK
//
// Rename to webpack.config.js to enable
// 

const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({

//        3.9mb 5s
//        terserOptions: {
//            compress: false, mangle: false,
//        },

//        3.08mb 8s
//        terserOptions: {
//            compress: false, mangle: true,
//        },

       //Still running after 8 minutes
      //  terserOptions: {
      //      compress: true, mangle: true,
      //  }


    })],
  },
};