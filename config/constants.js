const devConfig = {
  MONGO_URL: 'mongodb://127.0.0.1/Aaas',
  JWT_SECRET: 'thisisAsecret'
};

const testConfig = {
  MONGO_URL: 'mongodb://127.0.0.1/Aaas',
  JWT_SECRET: 'thisisAsecret'
};

const prodConfig = {
  MONGO_URL: 'mongodb://127.0.0.1/Aaas',
  JWT_SECRET: 'thisisAsecret'
};

const defaultConfig = {
  PORT: process.env.PORT || 8080
};

function envConfig (env) {
  switch (env) {
    case 'development':
      return devConfig;
    case 'test':
      return testConfig;
    default:
      return prodConfig;
  }
}

module.exports = {
  ...defaultConfig,
  ...envConfig(process.env.NODE_ENV)
};
