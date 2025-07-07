import React, { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const TaskManager = () => {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('All');

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, { id: Date.now(), text: input.trim(), completed: false }]);
      setInput('');
    }
  };

  const toggleComplete = id => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  const deleteTask = id => setTasks(tasks.filter(task => task.id !== id));

  const filteredTasks = tasks.filter(task => {
    if (filter === 'Active') return !task.completed;
    if (filter === 'Completed') return task.completed;
    return true;
  });

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 w-full"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Add a new task"
        />
        <button
          type="button"
          onClick={addTask}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        {['All', 'Active', 'Completed'].map(f => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded ${
              filter === f ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <ul className="space-y-2">
        {filteredTasks.map(task => (
          <li
            key={task.id}
            className="flex items-center justify-between p-2 border rounded bg-white dark:bg-gray-700"
          >
            <span
              onClick={() => toggleComplete(task.id)}
              className={`cursor-pointer ${task.completed ? 'line-through text-gray-500' : ''}`}
            >
              {task.text}
            </span>
            <button
              type="button"
              onClick={() => deleteTask(task.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
