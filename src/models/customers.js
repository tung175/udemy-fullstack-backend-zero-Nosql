const mongoose = require("mongoose");
const mongoose_delete = require('mongoose-delete');
const customersSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
},
  address: String,
  phone: String,
  email: String,
  image: String,
  description: String,
},{ 
  timestamps: true,
  // statics: {
  //   findByName(name) {
  //     return this.find({ name: new RegExp(name, 'i') });
  //   }
  // }
 });

customersSchema.plugin(mongoose_delete, { overrideMethods: 'all' });
const Customers = mongoose.model("customers", customersSchema);

module.exports = Customers;
