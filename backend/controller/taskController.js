import { taskModel } from "../models/taskModel.js";

const getAllTasks = async (req, res) => {
  if (!req.user)
    return res.status(401).send({
      message: "Not authorized",
    });

  try {
    const allTasks = await taskModel.find({ userId: req.user._id });
    res.status(200).json(allTasks);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal server error" });
  }
};

//------------------------------------------------------------------

const addTask = async (req, res) => {
  try {
    const newTask = new taskModel({
      title: req.body.title,
      description: req.body.description,
      completed: req.body.completed,
      schedule: req.body.schedule,
      userId: req.user._id,
    });

    const addedTask = await newTask.save();
    return res.status(200).send(addedTask);
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: "failed to add new task",
    });
  }
};

// ---------------------------------------------------------------------

const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    taskModel
      .findByIdAndDelete(id)
      .then((value) => {
        res.status(200).send({
          message: "task deleted succesfully",
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({
          message: "failed to delete",
        });
      });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "internal server error",
    });
  }
};

// ---------------------------------------------------------------

const editTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = {
      _id  : id,
      title: req.body.title,
      description: req.body.description,
      completed: req.body.completed,
      schedule: req.body.schedule,
    };
    const result = await taskModel.findByIdAndUpdate(id, task); // result is the task before editing
    if (result) {
      res.status(200).send(task);
    }
  } catch (err) {
    res.status(500).send({
      message: "Internal server error",
    });
  }
};

export { getAllTasks, addTask, deleteTask, editTask };
