import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import TaskForm from './TaskForm';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks/');
      setTasks(response.data);
    } catch (err) {
      console.error('Erro ao buscar tarefas:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar esta tarefa?')) {
      try {
        await api.delete(`/tasks/${id}`);
        fetchTasks();
      } catch (err) {
        console.error('Erro ao deletar tarefa:', err);
      }
    }
  };

  const handleToggleComplete = async (id, currentStatus) => {
    try {
      await api.patch(`/tasks/${id}/complete`);
      fetchTasks();
    } catch (err) {
      console.error('Erro ao atualizar tarefa:', err);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingTask(null);
    fetchTasks();
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Minhas Tarefas</h1>
        <button onClick={handleLogout} style={styles.logoutButton}>
          Sair
        </button>
      </div>

      <button onClick={() => setShowForm(!showForm)} style={styles.addButton}>
        {showForm ? 'Cancelar' : 'Nova Tarefa'}
      </button>

      {showForm && (
        <TaskForm
          task={editingTask}
          onSuccess={handleFormSuccess}
          onCancel={() => {
            setShowForm(false);
            setEditingTask(null);
          }}
        />
      )}

      <div style={styles.taskList}>
        {tasks.length === 0 ? (
          <p style={styles.emptyMessage}>Nenhuma tarefa encontrada. Crie uma!</p>
        ) : (
          tasks.map((task) => (
            <div key={task.id} style={styles.taskCard}>
              <div style={styles.taskHeader}>
                <h3 style={task.completed ? styles.completedTitle : styles.title}>
                  {task.title}
                </h3>
                <div>
                  <button
                    onClick={() => handleEdit(task)}
                    style={styles.editButton}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    style={styles.deleteButton}
                  >
                    Deletar
                  </button>
                </div>
              </div>
              <p style={styles.description}>{task.description}</p>
              <div style={styles.taskFooter}>
                <label>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleComplete(task.id, task.completed)}
                  />
                  Concluída
                </label>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  logoutButton: {
    padding: '10px 20px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  addButton: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '20px',
  },
  taskList: {
    display: 'grid',
    gap: '15px',
  },
  taskCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  taskHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  title: {
    margin: 0,
    color: '#333',
  },
  completedTitle: {
    margin: 0,
    color: '#999',
    textDecoration: 'line-through',
  },
  description: {
    color: '#666',
    marginBottom: '10px',
  },
  taskFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  editButton: {
    padding: '5px 10px',
    backgroundColor: '#ffc107',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '5px',
  },
  deleteButton: {
    padding: '5px 10px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#999',
    fontSize: '18px',
    marginTop: '50px',
  },
};

export default TaskList;