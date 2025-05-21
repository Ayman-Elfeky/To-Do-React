import React, { memo, useState } from 'react';
import '../styles/TodoItem.css';

const TodoItem = memo(({ todo, onToggle, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);

    const handleEdit = () => {
        if (isEditing && editText.trim()) {
            onEdit(todo.id, editText);
        }
        setIsEditing(!isEditing);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && editText.trim()) {
            handleEdit();
        }
    };

    return (
        <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <input
                type="checkbox"
                className="todo-checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
            />
            {isEditing ? (
                <input
                    type="text"
                    className="todo-edit-input"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    autoFocus
                />
            ) : (
                <span className="todo-text">{todo.text}</span>
            )}
            <div className="todo-actions">
                <button
                    className="todo-edit-btn"
                    onClick={handleEdit}
                    disabled={isEditing && !editText.trim()}
                >
                    {isEditing ? 'Save' : 'Edit'}
                </button>
                <button className="todo-delete-btn" onClick={() => onDelete(todo.id)}>
                    Delete
                </button>
            </div>
        </div>
    );
});

export default TodoItem;
