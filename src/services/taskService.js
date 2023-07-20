const task = require("../models/task");
const aqp = require("api-query-params");
module.exports = {
    createATask: async (data) => {
      try {
        if (data.type === "EMPTY-TASK") {
          let results = await task.create(data);
          console.log(results);
          return results;
        }
        
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    getTasks: async (queryString) => {
      const page = queryString.page;
      const { filter, limit, population } = aqp(queryString);
      console.log("check filter: ", filter.page);
  
      delete filter.page;
      let offset = (page - 1) * limit;
  
      results = await task
        .find(filter)
        .populate(population)
        .skip(offset)
        .limit(limit)
        .exec();
      return results;
    },
    editATask: async (data) => {
      let results = await task.updateOne(
          { _id: data.id }, {...data}
        );
        console.log(results);
        return results;
    },
    removeATask: async (data) => {
      try {
          let results = await task.deleteById(data);
          console.log(results);
          return results;
      } catch (error) {
          console.log(error);
          return null; 
      }
    }
  };
  