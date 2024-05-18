import React, { useState, Changent } from 'react';
import { Button, Checkbox, FormControlLabel, FormGroup, TextField } from '@material-ui/core';

interface TodoItem {
  id: number;
  name: string;
  isEditing: boolean;
  isDone: boolean;
}

const Todo: React.FC = () => {
  const [todoArray, setTodoArray] = useState<TodoItem[]>([]);
  const [task, setTask] = useState<string>('');
  const [editTask, setEditTask] = useState<string>('');

  const onChangeTask = (e: React.FormEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const addTask = () => {
    const newTask: TodoItem = {
      id: todoArray.length === 0 ? 1 : todoArray[todoArray.length - 1].id + 1,
      name: task,
      isEditing: false,
      isDone: false,
    };
    setTodoArray([...todoArray, newTask]);
    setTask('');
  };

  const done = (e: React.FormEvent<HTMLInputElement>, object: TodoItem) => {
    const updatedArray = todoArray.map((task) => {
      if (task.id === object.id) {
        task.isDone = e.target.checked;
      }
      return task;
    });
    setTodoArray(updatedArray);
  };

  return (
    <div>
      <div>
        <h2>ToDo List</h2>
      </div>

      <div>
        <TextField
          id="standard-basic"
          autoComplete="off"
          value={task}
          onChange={onChangeTask}
          placeholder="Add TO DO"
        />
        <Button
          className="button_style"
          variant="contained"
          color="primary"
          size="small"
          disabled={task === ""}
          onClick={addTask}
        >
          Add
        </Button>
      </div>

      {todoArray.length > 0 ? (
        <div>
          <table className="centerTable" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Task</th>
                <th>Action</th>
              </tr>
            </thead>
            {todoArray.map((object) => (
              <tbody key={object.id}>
                <tr>
                  <td>
                    {object.isEditing ? (
                      <TextField
                        id="standard-basic"
                        value={editTask}
                        onChange={(e) => setEditTask(e.target.value)}
                      />
                    ) : object.isDone ? (
                      <s>{object.name}</s>
                    ) : (
                      <span>{object.name}</span>
                    )}
                  </td>
                  <td>
                    <div style={{ marginLeft: 40 }}>
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox checked={object.isDone} />}
                          label="Completed"
                          onChange={(e) => done(e, object)}
                        />
                      </FormGroup>
                    </div>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      ) : (
        <h2>Nothing to do!</h2>
      )}
    </div>
  );
};

export default Todo;
