const project = require("../models/project");
const aqp = require("api-query-params");
module.exports = {
  createAProject: async (data) => {
    try {
      if (data.type === "EMPTY-PROJECT") {
        let results = await project.create(data);
        console.log(results);
        return results;
      }
      if (data.type === "ADD-USER") {
        // let results = await project.create(data);
        console.log(">>> chack data:", data);
        let myProject = await project.findById(data.projectId).exec();
        for (let i = 0; i < data.userArr.length; i++) {
          myProject.usersInfor.push(data.userArr[i]);
        }
        console.log(myProject);
        let newResults = await myProject.save();
        return newResults;
      }
      if (data.type === "REMOVE-USERS") {
        let myProject = await project.findById(data.projectId).exec();
        console.log(data.userArr);
        for (let i = 0; i < data.userArr.length; i++) {
            myProject.usersInfor.pull(data.userArr[i]);
          }
          console.log(myProject);
          let newResults = await myProject.save();
          return newResults;
      }
      if (data.type === "ADD-TASKS") {
        let myProject = await project.findById(data.projectId).exec();
        console.log(data.taskArr);
        for (let i = 0; i < data.taskArr.length; i++) {
            myProject.tasks.push(data.taskArr[i]);
          }
          console.log(myProject);
          let newResults = await myProject.save();
          return newResults;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  getProjects: async (queryString) => {
    const page = queryString.page;
    const { filter, limit, population } = aqp(queryString);
    console.log("check filter: ", filter.page);

    delete filter.page;
    let offset = (page - 1) * limit;

    results = await project
      .find(filter)
      .populate(population)
      .skip(offset)
      .limit(limit)
      .exec();
    return results;
  },
  editAProject: async (data) => {
    let results = await project.updateOne(
        { _id: data.id }, {...data}
      );
      console.log(results);
      return results;
  },
  removeAProject: async (data) => {
    try {
        let results = await project.deleteById(data.id);
        console.log(results);
        return results;
    } catch (error) {
        console.log(error);
        return null; 
    }
  }
};
