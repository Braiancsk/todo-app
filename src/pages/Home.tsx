import React, { useState, useEffect } from 'react';
import {useGlobalContext} from '../context/darkModeContext'
import '../App.css';
import Todo from '../components/Todo';
import '../server'
import axios from 'axios'
import {AiOutlineLoading3Quarters} from 'react-icons/ai'
function Home() {
const { darkMode, setDarkMode } = useGlobalContext()


const [isPending, setIsPending] = useState(false)
  useEffect(()=>{
    if(localStorage.getItem('darkMode')){
      setDarkMode(localStorage.getItem('darkMode')) 
    }else{
      localStorage.setItem('darkMode', 'light')
      setDarkMode('light')
    }},[])

    const handleDarkMode = () =>{
        if(localStorage.getItem('darkMode') === 'light'){
            setDarkMode('dark')
            localStorage.setItem('darkMode', 'dark')
        }else{
            setDarkMode('light')
            localStorage.setItem('darkMode', 'light')
        }
        
    }

    //get all the tasks from the db
    type taskProps = {
      text:string
      id: number
      completed: number
    }
    const [tasks, setTask] = useState<taskProps[]>([])
    useEffect(()=>{
      handleGetTasks()
    },[])

    const handleGetTasks = async () =>{
      try{
        setIsPending(true)

        const response = await axios.get('/api/reminders')
        console.log(response.data.reminders)
        setTask(response.data.reminders)
        switch(filterTask){
          case 'all':
          setFilterTask('all')
          let allTasks = response.data.reminders.map((task:any) => task)
          setFilteredTasks(allTasks)
          break
          case 'active':
          setFilterTask('active')
          let filteredActiveTask = response.data.reminders.filter((task:any) => task.completed === 0)
          setFilteredTasks(filteredActiveTask)
          break
          case 'completed':
          setFilterTask('completed')
          let filteredCompletedTask = response.data.reminders.filter((task:any) => task.completed === 1)
          setFilteredTasks(filteredCompletedTask)
          break
          default:
          setFilteredTasks(response.data.reminders)
          
        }
        
        setIsPending(false)
      }catch(err:any){
        console.error(err.message)
      }
     
    }

    //create a todo
    const [taskText, setTaskText] = useState('')
    const handleCreateNewTodo = async (e: React.FormEvent<HTMLFormElement>) =>{
      e.preventDefault()
      const data = {
        text: taskText,
        completed: 0
      }

      try{
        setIsPending(true)
        const response = await axios.post('/api/reminders', data)
        console.log(response)
        handleGetTasks()
        setTaskText('')
        setIsPending(false)
      }catch(err:any){
        console.error(err.message)
      }
    }

    //complete a todo
   const handleCompleteTodo = async (id:number, completed:number) =>{
    try{
      setIsPending(true)
      if(completed === 0){
        await axios.put('/api/reminders/'+id, {completed: 1})
        handleGetTasks()
      }else{
        await axios.put('/api/reminders/'+id, {completed: 0})
        handleGetTasks()
      }
      setIsPending(false)
    }catch(err:any){
      console.error(err.message)
      setIsPending(false)
    }
 
   } 

    //delete a todo
   const handleDeleteTodo = async (id:number) =>{
    try{
      setIsPending(true)
      let response = await axios.delete(`/api/reminders/${id}`)
      handleGetTasks()
      console.log(response)
      setIsPending(false)
    }catch(err:any){
      console.log(err.message)
    }
  } 

  //delete all todos
  const handleDeleteTodos = async (e:any) =>{
     e.preventDefault()
      
      try{
        setIsPending(true)
        const response = await axios.post('/api/reminders/all', 1)
        console.log(response)
        handleGetTasks()
        setIsPending(false)
      }catch(err:any){
        console.error(err.message)
        setIsPending(false)
      }
  }

//filter tasks
//state for filter tasks
const [filterTask, setFilterTask] = useState('all')
const [filteredTasks, setFilteredTasks] = useState<taskProps[]>([])
  const filterTasks = async (filter:string) =>{

    switch(filter){
      case 'all':
      setFilterTask('all')
      let allTasks = tasks.map(task => task)
      setFilteredTasks(allTasks)
      break
      case 'active':
      setFilterTask('active')
      let filteredActiveTask = tasks.filter(task => task.completed === 0)
      setFilteredTasks(filteredActiveTask)
      break
      case 'completed':
      setFilterTask('completed')
      let filteredCompletedTask = tasks.filter(task => task.completed === 1)
      setFilteredTasks(filteredCompletedTask)
      break
      default:
      setFilteredTasks(tasks)
      
    }
  }





  return (
    <div className="transition duration-500 min-h-screen dark:bg-dark-fundo bg-light-fundo">
        <header className="transition-image dark:bg-desktop-dark bg-desktop-light bg-cover min-h-[300px] w-full">

            <section className="container max-w-[600px] w-full pt-10 px-5">
            <div className="flex justify-between items-center">
                <h1 className="font-bold text-lg lg:text-3xl tracking-widest text-white">TODO</h1>

                {darkMode === 'light' ? 
                <svg className="cursor-pointer" onClick={handleDarkMode} xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fill-rule="evenodd" d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"/></svg>
                :
                <svg className="cursor-pointer" onClick={handleDarkMode} xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fill-rule="evenodd" d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"/></svg>
                }
            </div>

            <form onSubmit={(e)=>handleCreateNewTodo(e)} className="transition duration-500 mt-10 flex gap-3 items-center dark:bg-dark-board bg-white p-4 rounded-lg shadow">
                <span className="transition duration-500 w-[30px] h-[30px] flex items-center justify-center rounded-full bg-transparent border dark:border-dark-close border-light-border">{isPending && <AiOutlineLoading3Quarters className="dark:text-dark-text text-[#B1B0B6] rotate-center"/>}</span>
                <input value={taskText} onChange={(e) => setTaskText(e.target.value)} className="transition duration-500 focus:outline-none bg-transparent border-0 placeholder:dark:text-dark-close dark:text-white placeholder:text-light-close text-light-text" type="text" placeholder="Create a new todo..." />
            </form> 
            </section>
        
        </header>


        <section className="px-5 container max-w-[600px] w-full">
          <div className="relative top-[-80px] transition duration-500 dark:bg-dark-board bg-white  rounded-lg shadow">
          
          {filteredTasks.map(task =>{
              return(
                <Todo
                key={task.id}
                id={task.id}
                markTodo={() => handleCompleteTodo(task.id, task.completed)}
                handleDelete={() => handleDeleteTodo(task.id)}
                text={task.text}
                completed={task.completed}
                />    
              )
          })}

          {filteredTasks.length === 0 && <p className="transition duration-500 dark:text-dark-text text-[#B1B0B6] text-lg p-4 text-center border-b dark:border-b-dark-close border-b-light-border">All done! :)</p>}
        
        
           {/* <Todo
            id={'1'}
            markTodo={() => handleCompleteTodo(1)}
            handleDelete={() => handleDeleteTodo(1)}
            text="Learn React"
            completed={0}
           /> */}

            <div className="p-4 flex justify-between items-center">
                <p className="transition duration-500 dark:text-dark-text text-[#B1B0B6] text-sm">
                  {filteredTasks.length} items left
                </p>

                <div className="md:flex hidden gap-3">
                  <input onChange={() => filterTasks('all')} className="absolute opacity-0 left-[-200%]" type="radio" name="tasks" id="all" />
                  <label htmlFor="all" className={`text-sm cursor-pointer ${filterTask === 'all' ? 'text-completed' : 'dark:text-dark-text text-[#B1B0B6]'}`}>All</label>

                  <input onChange={() => filterTasks('active')} className="absolute opacity-0 left-[-200%]" type="radio" name="tasks" id="active" />
                  <label htmlFor="active" className={`text-sm cursor-pointer ${filterTask === 'active' ? 'text-completed' : 'dark:text-dark-text text-[#B1B0B6]'}`}>Active</label>

                  <input onChange={() => filterTasks('completed')} className="absolute opacity-0 left-[-200%]" type="radio" name="tasks" id="completed" />
                  <label htmlFor="completed" className={`text-sm cursor-pointer ${filterTask === 'completed' ? 'text-completed' : 'dark:text-dark-text text-[#B1B0B6]'}`}>Completed</label>
                </div>

                <p onClick={handleDeleteTodos} className="cursor-pointer text-sm dark:text-dark-text text-[#B1B0B6]">Clear Completed</p>
           </div>

          </div>
         
       
        </section>

        <section className="px-5 container max-w-[600px] w-full">
          <div className="relative top-[-80px] transition duration-500 dark:bg-dark-board bg-white  rounded-lg shadow">
    
              <div className="md:hidden flex justify-center mt-5 gap-3 p-4">
                  <input onChange={() => filterTasks('all')} className="absolute opacity-0 left-[-200%]" type="radio" name="tasks" id="all" />
                  <label htmlFor="all" className={`text-sm cursor-pointer ${filterTask === 'all' ? 'text-completed' : 'dark:text-dark-text text-[#B1B0B6]'}`}>All</label>

                  <input onChange={() => filterTasks('active')} className="absolute opacity-0 left-[-200%]" type="radio" name="tasks" id="active" />
                  <label htmlFor="active" className={`text-sm cursor-pointer ${filterTask === 'active' ? 'text-completed' : 'dark:text-dark-text text-[#B1B0B6]'}`}>Active</label>

                  <input onChange={() => filterTasks('completed')} className="absolute opacity-0 left-[-200%]" type="radio" name="tasks" id="completed" />
                  <label htmlFor="completed" className={`text-sm cursor-pointer ${filterTask === 'completed' ? 'text-completed' : 'dark:text-dark-text text-[#B1B0B6]'}`}>Completed</label>
                </div>
           </div>
        </section>
    </div>
  )
}

export default Home