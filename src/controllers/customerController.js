const { UploadSingleFile } = require("../services/fileService");
const {
  createCustomerService,
  createArraycustomerService,
  getAllCustomersService,
  UpdateCustomerService,
  deleteCustomerService,
  deleteArraycustomerService,
} = require("../services/customerService");
const Joi = require('joi');
module.exports = {
  postCreateCustomer: async (req, res) => {
    let { name, address, phone, email, description } = req.body;
    // console.log('>>> name', name);
    const schema = Joi.object({
      name: Joi.string()
          .alphanum()
          .min(3)
          .max(30)
          .required(),
  
      address: Joi.string(),
  
      phone: Joi.string().pattern(new RegExp('^[0-9]{8,11}$')),

      email: Joi.string()
              .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

      description: Joi.string(),
  })
  const {error} = schema.validate(req.body, {abortEarly: false} );
  console.log(error);
  if (error) {
    return res.status(200).json({
      msg: error
    })
  } else {
    let imageUrl = "";
    if (!req.files || Object.keys(req.files).length === 0) {
      // return res.status(400).send('No files were uploaded.');
    } else {
      let results = await UploadSingleFile(req.files.image);
      imageUrl = results.path;
      console.log(">>> check results", results);
    }

    let customerData = {
      name,
      address,
      phone,
      email,
      description,
      image: imageUrl,
    };

    let customer = await createCustomerService(customerData);

    return res.status(200).json({
      EC: 0,
      data: customer,
      // err: error
    });
  }
  },
  postArrayCreateCustomer: async (req, res) => {
    let customer = await createArraycustomerService(req.body.customers);
    console.log(">>> check data", req.body);
    return res.status(200).json({
      EC: 0,
      data: customer,
    });
  },
  getCustomers: async (req, res) => {
    let { limit, page, name } = req.query;
    let customer = null;
    if (limit && page) {
      customer = await getAllCustomersService(limit, page, req.query);
    } else {
      customer = await getAllCustomersService();
    }
    return res.status(200).json({
      EC: 0,
      data: customer,
    });
  },
  putACustomer: async (req, res) => {
    let { id, name, email, address } = req.body;
    let customer = await UpdateCustomerService(id, name, email, address);
    return res.status(200).json({
      EC: 0,
      data: customer,
    });
  },
  deleteACustomer: async (req, res) => {
    let id = req.body.id;
    console.log(id);
    let customer = await deleteCustomerService(id);
    return res.status(200).json({
      EC: 0,
      data: customer,
    });
  },
  deleteCustomers: async (req, res) => {
    let customer = await deleteArraycustomerService(req.body.customersId);
    console.log(">>> check data", req.body);
    return res.status(200).json({
      EC: 0,
      data: customer,
    });
  },
};
