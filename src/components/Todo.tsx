import {useState} from 'react'

type todoProps = {
    markTodo: () => void
    text: string
    handleDelete: () => void
    completed: number
    id: number
}
function Todo({markTodo, text, handleDelete, completed, id}: todoProps) {
  const [visible, setVisible] = useState(false)

  return (
    <div onMouseEnter={()=> setVisible(true)} onMouseLeave={()=> setVisible(false)} className="transition duration-500 flex justify-between items-center border-b dark:border-b-dark-close border-b-light-border pb-4 px-4 pt-4">
    <div className="flex gap-3 items-center">
        <input id={id.toString()} className="invisible absolute left-[200%]" onChange={markTodo} type="checkbox" />
        <label htmlFor={id.toString()} className={`cursor-pointer transition duration-500 w-[30px] h-[30px] rounded-full  border ${completed === 1 ? 'bg-completed' : 'bg-transparent'} dark:border-dark-close border-light-border flex items-center justify-center`}>
            {completed === 1   
            ? 
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg>
            :
            ''
            }
        </label>

        <p className={`transition duration-500 dark:text-dark-text text-light-text ${completed === 1 ? 'line-through opacity-60' : ''}`}>{text}</p>
    </div>
    <svg className={`transition duration-300 cursor-pointer ${visible ? 'lg:opacity-100 lg:pointer-events-auto' : 'lg:opacity-0 lg:pointer-events-none'}`} onClick={handleDelete} xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path className="dark:fill-dark-close fill-light-close" fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
    </div>
  )
}

export default Todo