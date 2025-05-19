import React, { useState } from 'react';
import '../styles/TodoItem.css';

const TodoItem = ({ task, onToggle, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(task.text);

    const handleEdit = () => {
        if (isEditing) {
            onEdit(task.id, editText.trim());
        }
        setIsEditing(!isEditing);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleEdit();
        }
    };

    return (
        <div className={`todo-item ${task.completed ? 'completed' : ''}`}>
            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggle(task.id)}
                className="todo-checkbox"
            />

            {isEditing ? (
                <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="todo-edit-input"
                    autoFocus
                />
            ) : (
                <span className="todo-text">{task.text}</span>
            )}

            <div className="todo-actions">
                <button
                    onClick={handleEdit}
                    className="todo-edit-btn"
                >
                    {isEditing ? 'Save' : 'Edit'}
                </button>
                <button
                    onClick={() => onDelete(task.id)}
                    className="todo-delete-btn"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TodoItem;
