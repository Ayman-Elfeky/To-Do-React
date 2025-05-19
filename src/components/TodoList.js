import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import '../styles/TodoList.css';

const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    // Load tasks from localStorage on component mount
    useEffect(() => {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }
    }, []);

    // Save tasks to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (e) => {
        e.preventDefault();
        if (!newTask.trim()) return;

        const task = {
            id: Date.now(),
            text: newTask.trim(),
            completed: false
        };

        setTasks([...tasks, task]);
        setNewTask('');
    };

    const toggleTask = (taskId) => {
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        ));
    };

    const deleteTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    const editTask = (taskId, newText) => {
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, text: newText } : task
        ));
    };

    return (
        <div className="todo-container">
            <h1>Todo List</h1>
            <form onSubmit={addTask} className="todo-form">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add a new task..."
                    className="todo-input"
                />
                <button type="submit" className="todo-button">Add Task</button>
            </form>
            <div className="todo-list">
                {tasks.length === 0 ? (
                    <p className="no-tasks">No tasks yet. Add one above!</p>
                ) : (
                    tasks.map(task => (
                        <TodoItem
                            key={task.id}
                            task={task}
                            onToggle={toggleTask}
                            onDelete={deleteTask}
                            onEdit={editTask}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default TodoList;
