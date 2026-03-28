import React, { useState, useEffect } from 'react';
import api from '../services/api';

function TaskForm({ task, onSuccess, onCancel }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (task) {
        await api.put(`/tasks/${task.id}`, { title, description });
      } else {
        await api.post('/tasks/', { title, description });
      }
      onSuccess();
    } catch (err) {
      console.error('Erro ao salvar tarefa:', err);
    }
  };

  return (
    <div style={styles.container}>
      <h3>{task ? 'Editar Tarefa' : 'Nova Tarefa'}</h3>
      <form onSubmit={handleSubmit}>
        <div style={styles.inputGroup}>
          <label>Título:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label>Descrição:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={styles.textarea}
          />
        </div>
        <div style={styles.buttonGroup}>
          <button type="submit" style={styles.saveButton}>
            Salvar
          </button>
          <button type="button" onClick={onCancel} style={styles.cancelButton}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    marginBottom: '20px',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    marginTop: '5px',
  },
  textarea: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px',
    marginTop: '5px',
    minHeight: '80px',
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
  },
  saveButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  cancelButton: {
    padding: '10px 20px',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default TaskForm;