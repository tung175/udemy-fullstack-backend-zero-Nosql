const {createATask, getTasks, editATask, removeATask} = require('../services/taskService');
module.exports ={
    postATask: async (req, res) => {
        let data = await createATask(req.body)
        return res.status(200).json({
            EC: 0,
            data: data,
          });
    },
    getAllTasks: async (req, res) => {
        console.log(req.query);
        let data = await getTasks(req.query)
        return res.status(200).json({
            EC: 0,
            data: data,
          });
    },
    putATask: async (req, res) => {
        let data = await editATask(req.body)
        return res.status(200).json({
            EC: 0,
            data: data,
          });
    },
    deleteATask: async (req, res) => {
        let data = await removeATask(req.body.id)
        return res.status(200).json({
            EC: 0,
            data: data,
          });
    }
}
