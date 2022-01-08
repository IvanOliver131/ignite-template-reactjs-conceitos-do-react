import { useEffect, useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  useEffect(() => {
    setTasks(tasks);
  }, [tasks]);

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if (!newTaskTitle) {
      return alert('Você precisa informar algum titulo');
    } 
    const newTask: Task = {
      id: Math.floor(Date.now() * Math.random()),
      title: newTaskTitle,
      isComplete: false,
    }

    // Pego o estado antigo das tasks e adiciono o newTask no final
    setTasks(oldState => [...oldState, newTask]);
    setNewTaskTitle('');
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    
    // ######### FEITO POR MIM - INICIO #########
    // const teste = tasks.map((task) => {
    //   if (task.id == id) {
    //     if (task.isComplete == true) {
    //       task.isComplete = false;
    //     } else {
    //       task.isComplete = true;
    //     }        
    //   }

    //   return task
    // });

    // setTasks(teste);

    // ######### FEITO POR MIM - FIM #########

    const newTasks = tasks.map(task => task.id === id ? {
      ...task, 
      isComplete: !task.isComplete
    } : task);

    setTasks(newTasks);

    
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    // O filter remove a task que não cumpre a condição passada
    const filteredTasks = tasks.filter(task => task.id !== id);
  
    setTasks(filteredTasks);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}