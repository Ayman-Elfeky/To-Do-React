import React, { useState, useCallback, useEffect, useMemo } from 'react';
import TodoItem from './TodoItem';
import '../styles/TodoList.css';

const TodoList = () => {
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem('todos');
        return savedTodos ? JSON.parse(savedTodos) : [];
    });
    const [inputText, setInputText] = useState('');

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const handleAddTodo = useCallback((e) => {
        e.preventDefault();
        if (inputText.trim()) {
            setTodos(prev => [
                ...prev,
                {
                    id: Date.now(),
                    text: inputText.trim(),
                    completed: false
                }
            ]);
            setInputText('');
        }
    }, [inputText]);

    const handleToggle = useCallback((id) => {
        setTodos(prev => prev.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    }, []);

    const handleDelete = useCallback((id) => {
        setTodos(prev => prev.filter(todo => todo.id !== id));
    }, []);

    const handleEdit = useCallback((id, newText) => {
        if (newText.trim()) {
            setTodos(prev => prev.map(todo =>
                todo.id === id ? { ...todo, text: newText.trim() } : todo
            ));
        }
    }, []);

    const sortedTodos = useMemo(() => {
        return [...todos].sort((a, b) => {
            // Sort by completion status and then by creation time
            if (a.completed === b.completed) {
                return b.id - a.id; // Newer todos first
            }
            return a.completed ? 1 : -1; // Incomplete todos first
        });
    }, [todos]);

    const stats = useMemo(() => ({
        total: todos.length,
        completed: todos.filter(todo => todo.completed).length,
        remaining: todos.filter(todo => !todo.completed).length
    }), [todos]);

    return (
        <div className="todo-container">
            <h1>Todo List</h1>

            <form className="todo-form" onSubmit={handleAddTodo}>
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Add a new task..."
                    className="todo-input"
                />
                <button
                    type="submit"
                    className="todo-add-btn"
                    disabled={!inputText.trim()}
                >
                    Add
                </button>
            </form>

            <div className="todo-stats">
                <span>Total: {stats.total}</span>
                <span>Completed: {stats.completed}</span>
                <span>Remaining: {stats.remaining}</span>
            </div>

            <div className="todo-list">
                {sortedTodos.map(todo => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onToggle={handleToggle}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                    />
                ))}
                {!todos.length && (
                    <p className="no-todos">No tasks yet. Add one above!</p>
                )}
            </div>
        </div>
    );
};

export default TodoList;
