const ImageKit = require("imagekit");
const config = require("./environments/config");

const imagekit = new ImageKit({
  publicKey: config.imagekitPublicKey,
  privateKey: config.imagekitPrivateKey,
  urlEndpoint: config.imagekitUrlEndpoint,
});

module.exports = imagekit;
