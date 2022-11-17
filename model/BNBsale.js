var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var BNBsaleSchema = new Schema({
  id: Number,
  address: String,
  saleToken: {
    name: String,
    symbol: String,
    address: { type: String, require },
  },

  saleParams: {
    softCap: Number,
    hardCap: Number,
    startDate: Number,
    endDate: Number,
    minBuy: Number,
    maxBuy: Number,
    price: Number,
    saleOwner: {
      type: String,
      default: "0x0000000000000000000000000000000000000000",
    },
    round1: Number,
    round2: Number,
    round3: Number,
    round4: Number,
    round5: Number,
    publicroundDelta: Number,
  },

  saleLinks: {
    logo: String,
    fb: String,
    git: String,
    insta: String,
    reddit: String,
    web: String,
    twitter: String,
    telegram: String,
    discord: String,
    youtube: String,
  },

  saleDetails: {
    saleAddress: {
      type: String,
      default: "0x0000000000000000000000000000000000000000",
    },
    listingDate: { type: Date, default: () => Date.now() },
    description: String,
    whilelist: String,
    saleID: Number,
    deployed: { type: Boolean, default: () => false },
    featured: { type: Boolean, default: () => false },
  },
});

module.exports = mongoose.model("bnbsale", BNBsaleSchema);
