import { useState } from 'react';

export default function App() {
  const [input, setInput] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (input.trim() === '') return;
    setTasks([...tasks, { text: input.trim(), completed: false }]);
    setInput('');
  };

  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <>
      <style>{`
        .notebook-card {
          background: #fff8dc; /* off-white paper color */
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          font-family: 'Courier New', Courier, monospace;
        }
        .notebook-list {
          background-image:
            repeating-linear-gradient(0deg, transparent, transparent 23px, #c0c0c0 24px);
          border-left: 4px solid #ff9999; /* margin line */
          padding-left: 12px;
          border-radius: 8px;
          min-height: 200px;
        }
        .notebook-list li {
          position: relative;
          padding: 8px 12px;
          border-bottom: 1px solid #ddd;
          cursor: pointer;
          color: #333;
        }
        .notebook-list li.completed {
          text-decoration: line-through;
          color: #a9a9a9;
        }
        .notebook-list li span {
          user-select: none;
        }
        .notebook-list button {
          border-radius: 50%;
          width: 26px;
          height: 26px;
          padding: 0;
          font-size: 16px;
          line-height: 26px;
          text-align: center;
        }
        .card-title {
          font-family: 'Caveat', cursive; /* handwriting font if loaded */
          font-size: 2.5rem;
          color: #d9534f;
          margin-bottom: 1.5rem;
          user-select: none;
        }
      `}</style>

      <div className="d-flex align-items-center justify-content-center col-md-6">
        <div className="card notebook-card shadow-sm">
          <div className="card-body">
            <h1 className="card-title text-center">Task Tracker</h1>
            <div className="input-group mb-3">
              <input
                type="text"
                value={input}
                placeholder="Enter a Task..."
                onChange={(e) => setInput(e.target.value)}
                className="form-control"
                onKeyDown={(e) => e.key === 'Enter' && addTask()}
                style={{ fontFamily: "'Courier New', monospace" }}
              />
              <button className="btn btn-danger" onClick={addTask}>
                Add
              </button>
            </div>
            <ul className="list-group notebook-list">
              {tasks.map((task, index) => (
                <li
                  key={index}
                  className={`list-group-item d-flex justify-content-between align-items-center ${task.completed ? 'completed' : ''
                    }`}
                >
                  <span onClick={() => toggleTask(index)}>{task.text}</span>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => deleteTask(index)}
                    aria-label="Delete Task"
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                </li>
              ))}
              {tasks.length === 0 && (
                <li className="list-group-item text-center text-muted" style={{ userSelect: 'none' }}>
                  No tasks added yet.
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
