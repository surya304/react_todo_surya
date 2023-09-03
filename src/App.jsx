import { useState, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid';


export default function App() {

  const [currentInput, setcurrentInput] = useState("")
  const [currenEditedtInput, setcurrenEditedtInput] = useState("")

  const [todoList, settodoList] = useState(() => {

    const localValue = localStorage.getItem("todolist");

    if (localValue == null) return [];




    var parsedJSON = JSON.parse(localValue);

    return parsedJSON.map(todo => {
      if (todo.is_edit == true) {
        return { ...todo, is_edit: false }
      }

      return todo
    })



  })


  useEffect(() => {
    localStorage.setItem("todolist", JSON.stringify(todoList))
  }, [todoList])



  function submitdata() {


    settodoList((currentdata => {
      return [
        ...currentdata,
        { 'id': uuidv4(), 'name': currentInput, 'current': true, is_edit: false }
      ]
    }))






  }

  function deletelist(id) {



    settodoList((currentInput => {

      return currentInput.filter(item => item.id != id);
    }))




  }


  function Editdata(id) {

    var filtereddata = todoList.filter(item => item.id == id)[0];

    // console.log(filtereddata, "filtered")

    settodoList(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, is_edit: true }
        }

        return todo
      })
    })




    setcurrenEditedtInput(filtereddata.name)

  }

  // function editedtyped(data, id) {

  //   console.log(data,"data")


  //   settodoList((item => {

  //     return item.map(item1 => {
  //       if (item1.id === id) {
  //         return { ...item1, name: data }
  //       }
  //     })
  //   }))

  // }


  function saveEditedData(id) {


    settodoList((item => {

      return item.map(i1 => {

        if (i1.id === id) {
          return { ...i1, name: currenEditedtInput ,is_edit:false }
        }

        return i1

      })
    }))

  }

  return (
    <>


      <div className="w-60">


        <input
          type="text"
          value={currentInput}
          onChange={e => setcurrentInput(e.target.value)}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />


      </div>


      <button

        onClick={submitdata}
        type="button"
        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Button text
      </button>




      <div>


        {todoList.map((item) => (
          <div
            key={item.id}
          >

            {item.is_edit == false && <a>
              {item.name}
            </a>}


            {/* {item.is_edit == true && <input type="text" value={item.name} onChange={e => editedtyped(e.target.value, item.id)} placeholder="Please Edite here" />} */}
            {item.is_edit == true && <input type="text" value={currenEditedtInput} onChange={e => setcurrenEditedtInput(e.target.value)} placeholder="Please Edite here" />}


            {item.is_edit == true && <button

              onClick={() => saveEditedData(item.id)}
              type="button"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save EDited Data
            </button>
            }
{item.is_edit == false && 
            <button

              onClick={() => Editdata(item.id)}
              type="button"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              EDit
            </button>

}

            <button
              onClick={() => deletelist(item.id)}

              style={{ 'border': '1px solid red' }}> Delete  </button>
          </div>
        ))}
      </div>


    </>
  )
}


