module.exports = {
    "env": {
      "node": true,
      "browser": true,
      "commonjs": true,
      "es6": true,
      "mocha": true,
      "jest": true,
    },
    "extends": [
      "eslint:recommended",
      "plugin:react/recommended"
    ],
    "installedESLint": true,
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "globalReturn": false,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react", "compat"
    ],
    "rules": {
        // "indent": [
        //     "warn", 2, { "SwitchCase": 1 }
        // ],
        "linebreak-style": [
            "error", "unix"
        ],
        // "quotes": [
        //     "warn", "double", { "allowTemplateLiterals": true }
        // ],
        "semi": [
            "warn", "always"
        ],
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
        "react/prop-types": "warn",
        "react/no-find-dom-node": "off",
        "no-extra-boolean-cast": "off",
        "no-console": ["warn"],
        "compat/compat": 2
    }
};
