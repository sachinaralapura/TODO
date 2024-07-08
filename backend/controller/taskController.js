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
    res.status(500).send({ message: err });
  }
};

//------------------------------------------------------------------

const addTask = async (req, res) => {
  try {
    const newTask = new taskModel({
      title: req.body.taskTitle,
      description: req.body.description || " ",
      completed: req.body.completed,
      created_at: Date(),
      scheduledAt: Date.parse(req.body.scheduleAt),
      userId: req.user._id,
    });

    const addedTask = await newTask.save();
    return res.send(addedTask);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

// ---------------------------------------------------------------------

const deleteTask = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    taskModel
      .findByIdAndDelete(id)
      .then((value) => {
        console.log(value);
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

export { getAllTasks, addTask, deleteTask };
