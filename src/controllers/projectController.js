const {createAProject, getProjects, editAProject, removeAProject } = require('../services/productService');

module.exports = {
    postAProject: async (req, res) => {
        // console.log(req.body);
        let data = await createAProject(req.body)
        return res.status(200).json({
            EC: 0,
            data: data,
          });
    },
    getAllProjects: async (req, res) =>{
        let data = await getProjects(req.query)
        return res.status(200).json({
            EC: 0,
            data: data,
          });
    },
    putAProject: async (req, res) => {
        let data = await editAProject(req.body)
        return res.status(200).json({
            EC: 0,
            data: data,
          });
    },
    deleteAProject: async (req, res) => {
        let data = await removeAProject(req.body)
        return res.status(200).json({
            EC: 0,
            data: data,
          });
    }
}

 