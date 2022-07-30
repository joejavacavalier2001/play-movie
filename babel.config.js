module.exports = {
    "presets": [
        "@babel/preset-env",
        "@babel/preset-react"
    ],
    "plugins": [
      ["@babel/transform-runtime"],
      ["jsx-control-statements"],
      ["vanilla-shake", {
        defined: {
          DEBUGGING_NOW: process.env.NODE_ENV==="development" 
        }
      }]
    ]
};

