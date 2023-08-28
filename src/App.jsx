import { useEffect, useState } from 'react'
import axios from 'axios'

const apiURL = {
  baseURL: 'https://todolist-api.hexschool.io',
  signUpPath: '/users/sign_up',
  sighInPath: '/users/sign_in',
  checkOutPath: '/users/checkout',
  signOutPath: '/users/sign_out',
  todoPath: '/todos/'
}


function App() {
  const [token, setToken] = useState('')
  const [nickName, setNickName] = useState('')

  return (
    <>
      <div className="container my-5 overflow-hidden">
        <div className="row gx-3">
          <div className="col-6">
            <SignUp />
            <SignIn setToken={setToken} setNickName={setNickName} />
            <CheckOut token={token} setToken={setToken} />
            <SignOut token={token} setToken={setToken} />
          </div>
          <div className="container col-6">
            {token ? <TodoList token={token} nickName={nickName} /> :
              <><div className="container my-4 mx-3"><h1><span className="badge badge-secondary">《代辦事項清單》</span></h1><div className="alert alert-secondary ml-3" role="alert">  請先登入！ </div></div></>}
          </div>
        </div>
      </div>
    </>
  )
}


function SignUp() {

  // console.log(apiURL.baseURL + apiURL.signUpPath);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nickName, setNickName] = useState('')
  const [msg, setMsg] = useState('')

  const formData = {
    "email": email,
    "password": password,
    "nickname": nickName
  }

  async function handleSubmit() {
    if (!email || !password || !nickName) {
      // alert('資訊填寫不完整')
      setMsg(`資訊填寫不完整：Email、密碼、暱稱皆為必填欄位。`)
      return
    }
    try {
      const res = await axios.post(apiURL.baseURL + apiURL.signUpPath, formData)
      setMsg(`
        註冊成功【status】 -> ${res.status}
        註冊成功【message】 -> UID： ${res.data.uid}
      `)
      // console.dir(res);
    } catch (error) {
      setMsg(`
        註冊失敗【error】 -> ${error}  
        註冊失敗【message】 -> ${error.response.data.message}
      `)
    }
  }

  return (
    <>
      <div className="container my-4 mx-3">
        <h1><span className="badge badge-secondary">《註冊》</span></h1>
        <form>
          <div className="form-group ml-3">
            <label htmlFor="SignUpInputEmail1">Email：</label>
            <input type="email" className="form-control" id="SignUpInputEmail1" value={email} aria-describedby="emailHelp" placeholder="請輸入Email" onChange={
              (e) => { setEmail(e.target.value) }
            } />
          </div>
          <div className="form-group ml-3">
            <label htmlFor="SignUPInputPassword1">密碼：</label>
            <input type="password" className="form-control" id="SignUPInputPassword1" value={password} placeholder="請輸入密碼" onChange={
              (e) => { setPassword(e.target.value) }
            } />
          </div>
          <div className="form-group ml-3">
            <label htmlFor="nickName">暱稱：</label>
            <input type="text" className="form-control" id="nickName" value={nickName} placeholder="請輸入暱稱" onChange={
              (e) => { setNickName(e.target.value) }
            } />
          </div>
          <button type="button" className="btn btn-primary ml-3" onClick={handleSubmit}>註冊</button>
        </form>
        <div className="alert alert-warning my-4 ml-3" role="alert" style={{ "whitSpace": "pre-line", "overflowWrap": "break-word" }}>
          執行結果：<br />{msg}
        </div>
        <hr />
      </div>
    </>
  )
}

function SignIn({ setToken, setNickName }) {

  // console.log(apiURL.baseURL + apiURL.signUpPath);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')

  const formData = {
    "email": email,
    "password": password,
  }

  async function handleSubmit() {
    if (!email || !password) {
      // alert('資訊填寫不完整')
      setMsg(`資訊填寫不完整：Email、密碼皆為必填欄位。`)
      return
    }
    try {
      const res = await axios.post(apiURL.baseURL + apiURL.sighInPath, formData)
      setToken(res.data.token)
      setNickName(res.data.nickname)
      setMsg(`
      登入成功【status】 -> ${res.status}
      登入成功【Token】 -> 
      ${res.data.token}`)
      // console.dir(res)
      // console.log(nickName)
    } catch (error) {
      setMsg(`
      登入失敗【error】 -> ${error}     
      登入失敗【message】 -> ${error.response.data.message}
      `)
    }
  }

  return (
    <>
      <div className="container my-4 mx-3">
        <h1><span className="badge badge-secondary">《登入》</span></h1>
        <form>
          <div className="form-group ml-3">
            <label htmlFor="SignInInputEmail1">Email：</label>
            <input type="email" className="form-control" id="SignInInputEmail1" value={email} aria-describedby="emailHelp" placeholder="請輸入Email" onChange={
              (e) => { setEmail(e.target.value) }
            } />
          </div>
          <div className="form-group ml-3">
            <label htmlFor="SignInInputPassword1">密碼：</label>
            <input type="password" className="form-control" id="SignInInputPassword1" value={password} placeholder="請輸入密碼" onChange={
              (e) => { setPassword(e.target.value) }
            } />
          </div>
          <button type="button" className="btn btn-primary ml-3" onClick={handleSubmit}>登入</button>
        </form>
        <div className="alert alert-warning my-4 ml-3" role="alert" style={{ "whiteSpace": "pre-line", "overflowWrap": "break-word" }}>
          執行結果：<br /> {msg}
        </div>
        <hr />
      </div>
    </>
  )
}

function CheckOut({ token, setToken }) {

  // console.log(apiURL.baseURL + apiURL.signUpPath);
  const [msg, setMsg] = useState('')

  const formData = {
    "headers": {
      authorization: token
    }
  }

  async function handleSubmit() {
    if (!token) {
      // alert('資訊填寫不完整')
      setMsg(`資訊填寫不完整：Token皆為必填欄位。`)
      return
    }
    try {
      const res = await axios.get(apiURL.baseURL + apiURL.checkOutPath, formData)
      setMsg(`
        驗證成功【status】 -> ${res.status}
        驗證成功【message】 -> UID： ${res.data.uid}
        驗證成功【message】 -> NickName： ${res.data.nickname}
      `)
    } catch (error) {
      setMsg(`
        驗證失敗【error】 -> ${error}     
        驗證失敗【message】 -> ${error.response.data.message}
      `)
    }
  }

  return (
    <>
      <div className="container my-4 mx-3">
        <h1><span className="badge badge-secondary">《驗證》</span></h1>
        <form>
          <div className="form-group ml-3">
            <label htmlFor="token">Token：</label>
            <input type="text" className="form-control" id="checkOutToken" value={token} placeholder="請輸入Token" onChange={
              (e) => { setToken(e.target.value) }
            } />
          </div>
          <button type="button" className="btn btn-primary ml-3" onClick={handleSubmit}>驗證</button>
        </form>
        <div className="alert alert-warning my-4 ml-3" role="alert" style={{ "whiteSpace": "pre-line", "overflowWrap": "break-word" }}>
          執行結果：<br /> {msg}
        </div>
        <hr />
      </div>
    </>
  )
}

function SignOut({ token, setToken }) {

  // console.log(apiURL.baseURL + apiURL.signUpPath);
  const [msg, setMsg] = useState('')

  const formHeaders = {
    "headers": {
      authorization: token
    }
  }

  async function handleSubmit() {
    if (!token) {
      // alert('資訊填寫不完整')
      setMsg(`資訊填寫不完整：Token皆為必填欄位。`)
      return
    }
    try {
      const res = await axios.post(apiURL.baseURL + apiURL.signOutPath, {}, formHeaders)
      setToken('')
      setMsg(`
        登出成功【status】 -> ${res.status}
        登出成功【message】 -> ${res.data.message}
      `)
      // console.dir(res)
    } catch (error) {
      setMsg(`
        登出失敗【error】 -> ${error}     
        登出失敗【message】 -> ${error.response.data.message}
      `)
    }
  }

  return (
    <>
      <div className="container my-4 mx-3">
        <h1><span className="badge badge-secondary">《登出》</span></h1>
        <form>
          <div className="form-group ml-3">
            <label htmlFor="token">Token：</label>
            <input type="text" className="form-control" id="sighOutToken" value={token} placeholder="請輸入Token" onChange={
              (e) => { setToken(e.target.value) }
            } />
          </div>
          <button type="button" className="btn btn-primary ml-3" onClick={handleSubmit}>登出</button>
        </form>
        <div className="alert alert-warning my-4 ml-3" role="alert" style={{ "whiteSpace": "pre-line", "overflowWrap": "break-word" }}>
          執行結果：<br /> {msg}
        </div>
        <hr />
      </div>
    </>
  )
}

function TodoList({ token, nickName }) {
  const [msg, setMsg] = useState('')
  const [todo, setTodo] = useState([])
  const [newTodo, setNewTodo] = useState('')
  const [editId, setEditId] = useState('')
  const [newContent, setNewContent] = useState('')
  const [saveID, setsaveID] = useState('') //用來記錄哪個項目被編輯後仍待送到後端保存

  const headers = {
    "headers": {
      authorization: token
    }
  }

  const addPayload = {
    "content": newTodo
  }

  const updatePayload = {
    "content": newContent
  }

  useEffect(() => {
    getTodoList()
  }, [token])

  async function getTodoList() {
    try {
      const res = await axios.get(apiURL.baseURL + apiURL.todoPath, headers)
      setMsg(`
        清單讀取成功【status】 -> ${res.status}`)
      setTodo(res.data.data)
    } catch (error) {
      console.dir(error)
      setMsg(`
          清單讀取失敗【error】 -> ${error.message}     
          清單讀取失敗【message】 -> ${error.response.data.message}
        `)
    }
    setNewContent('')
  }

  async function addTodoList() {
    try {
      const res = await axios.post(apiURL.baseURL + apiURL.todoPath, addPayload, headers)
      setMsg(`
        新增成功【status】 -> ${res.status}
        新增成功【content】 -> 「${res.data.newTodo.content}」 已加入待辦清單
        `)
      getTodoList()
      // console.dir(res.data.newTodo.content)

    } catch (error) {
      // console.dir(error)
      setMsg(`
          新增失敗【error】 -> ${error.message}     
          新增失敗【message】 -> ${error.response.data.message}
        `)
    }
    setNewTodo('')
    setNewContent('')
  }

  function handleAddTodo() {
    addTodoList()
  }

  async function delTodoList(id) {
    try {
      const res = await axios.delete(apiURL.baseURL + apiURL.todoPath + id, headers)
      setMsg(`
        刪除成功【status】 -> ${res.status}
        刪除成功【content】 -> ${res.data.message}
        `)
      getTodoList()
      // console.dir(res)

    } catch (error) {
      // console.dir(error)
      setMsg(`
          刪除失敗【error】 -> ${error.message}     
          刪除失敗【message】 -> ${error.response.data.message}
        `)
    }
    setNewContent('')
  }

  function handleDelete(id) {
    delTodoList(id)
  }

  async function updateTodoList(id, newContent) {
    try {
      const res = await axios.put(apiURL.baseURL + apiURL.todoPath + id, updatePayload, headers)
      setMsg(`
        修改成功【status】 -> ${res.status}
        修改成功【content】 -> ${res.data.message}
        `)
      getTodoList()
      // console.dir(res)

    } catch (error) {
      // console.dir(error)
      setMsg(`
          修改失敗【error】 -> ${error.message}     
          修改失敗【message】 -> ${error.response.data.message}
        `)
    }
    setNewContent('')
  }

  function handleUpdate(id, newContent) {
    updateTodoList(id, newContent)
  }

  async function toggleTodoList(id) {
    try {
      const res = await axios.patch(apiURL.baseURL + apiURL.todoPath + id + '/toggle', {}, headers)
      setMsg(`
        變更成功【status】 -> ${res.status}
        變更成功【content】 -> ${res.data.message}
        `)
      getTodoList()
      // console.dir(res)

    } catch (error) {
      // console.dir(error)
      setMsg(`
          變更失敗【error】 -> ${error.message}     
          變更失敗【message】 -> ${error.response.data.message}
        `)
    }
  }

  function handleToggle(id) {
    toggleTodoList(id)
  }

  return (
    <>
      <div className="container my-4 mx-3">
        <h1><span className="badge badge-secondary">《待辦事項》</span></h1>
        <div className="alert alert-success ml-3" role="alert"> Hi, {nickName}.   歡迎使用！ </div>

        <div className="alert alert-info ml-3" role="alert">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              value={newTodo}
              placeholder="請輸入新的待辦事項"
              aria-label="請輸入新的待辦事項"
              aria-describedby="button-addon2"
              onChange={(e) => setNewTodo(e.target.value)}
            />
            <div className="input-group-append">
              <button className="btn btn-info btn-sm" type="button" id="button-addon2" onClick={handleAddTodo}>新增</button>
            </div>
          </div>
          <ul className="list-group">
            {todo.map((item) => {
              return (
                <li className={item.status
                  ? "list-group-item  d-flex justify-content-between align-items-center list-group-item-secondary"
                  : "list-group-item  d-flex justify-content-between align-items-center"} key={item.id}
                >
                  {(editId === item.id)
                    ?
                    <input
                      type="text"
                      class="form-control-sm"
                      value={newContent}
                      autoFocus
                      onChange={(e) => {
                        setsaveID(item.id) // 當該項目被編輯時，紀錄ID為未存檔項目
                        setNewContent(e.target.value)}}
                      onBlur={() => {
                        setEditId('')
                      }}
                    />
                    :
                    <span style={{ "textDecoration": item.status ? "line-through" : "none" }} onClick={() => {
                      setEditId(item.id)                      
                      setNewContent(item.content)
                    }}
                      // onBlur={() => setEditId(0)}
                    >{item.content}</span>
                  }
                  <div className="btn-group">
                    <button
                      type="button"
                      className={item.status ? "btn btn-outline-secondary btn-sm" : "btn btn-outline-info btn-sm"}
                      disabled={editId && editId !== item.id}
                      // style={{"display" : (editId && editId !== item.id) ? "none" : ""}}
                      onClick={() => handleToggle(item.id)}> {item.status ? '↶' : '✓'}
                    </button>
                    <button
                      type="button"
                      className={item.status ? "btn btn-outline-secondary btn-sm" : "btn btn-outline-info btn-sm"}
                      disabled={editId && editId !== item.id}
                      // style={{"display" : (editId && editId !== item.id) ? "none" : ""}}
                      onClick={() => {
                        if(saveID === item.id) { // 點選未存檔項目的更新按鈕才能觸發"更新&存檔"功能
                          handleUpdate(item.id, newContent)
                          setsaveID('')
                        }
                        setNewContent('')
                      }}>↻</button>
                    <button
                      type="button"
                      className={item.status ? "btn btn-outline-secondary btn-sm" : "btn btn-outline-info btn-sm"}
                      disabled={editId && editId !== item.id}
                      // style={{"display" : (editId && editId !== item.id) ? "none" : ""}}
                      onClick={() => handleDelete(item.id)}>⨂</button>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="alert alert-warning my-4 ml-3" role="alert" style={{ "whiteSpace": "pre-line", "overflowWrap": "break-word" }}>
          執行結果：<br /> {msg} <br />
        </div>

      </div>

      {/* debug */}
      {/* <div>
        <label htmlFor='ntd' value='newTodo'>newTodo</label>
        <input type='textarea' value={newTodo} id='ntd' />
      </div>
      <div>
        <label htmlFor='nct' value='newContent'>newContent</label>
        <input type='textarea' value={newContent} id='nct' />
      </div>
      <div>
        <label htmlFor='nct' value='editId'>editId</label>
        <input type='textarea' value={editId} id='nct' />
      </div>
      <div>
        <label htmlFor='nct' value='saveID'>saveID</label>
        <input type='textarea' value={saveID} id='nct' />
      </div> */}
    </>
  )
}

export default App


