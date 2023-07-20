const customer = require("../models/customers");
const aqp = require("api-query-params");

const createCustomerService = async (customerData) => {
  try {
    let results = await customer.create({
      name: customerData.name,
      address: customerData.address,
      phone: customerData.phone,
      email: customerData.email,
      description: customerData.description,
      image: customerData.image,
    });
    return results;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const createArraycustomerService = async (arr) => {
  try {
    let results = await customer.insertMany(arr);
    return results;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getAllCustomersService = async (limit, page, queryString) => {
  try {
    let results = null;
    if (limit && page) {
      let offset = (page - 1) * limit;
      const { filter } = aqp(queryString);
      delete filter.page
      console.log("check filter: ", filter);
        results = await customer.find(filter).skip(offset).limit(limit).exec();
    //   if (name) {
    //     results = await customer
    //       .find({ name: { $regex: ".*" + name + ".*" } })
    //       .skip(offset)
    //       .limit(limit)
    //       .exec();
    //   } else {
    //     results = await customer.find({}).skip(offset).limit(limit).exec();
    //   }
    } else {
      results = await customer.find({});
    }
    return results;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const UpdateCustomerService = async (id, name, email, address) => {
  try {
    let results = await customer.updateOne(
      { _id: id },
      { name, email, address }
    );
    console.log(results);
    return results;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const deleteCustomerService = async (id) => {
  try {
    let results = await customer.deleteById(id);
    console.log(results);
    return results;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const deleteArraycustomerService = async (arrIds) => {
  try {
    let results = await customer.delete({ _id: { $in: arrIds } });
    return results;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = {
  createCustomerService,
  createArraycustomerService,
  getAllCustomersService,
  UpdateCustomerService,
  deleteCustomerService,
  deleteArraycustomerService,
};
