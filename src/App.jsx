import { useState } from 'react'
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
  const [count, setCount] = useState(0)
  const [token, setToken] = useState('')

  return (
    <>
      <SignUp />
      <SignIn token={token} setToken={setToken}/>
      <CheckOut token={token} setToken={setToken}/>
      <SignOut token={token} setToken={setToken}/>
      {token && <TodoList token={token}/>}
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
      console.dir(res);
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
        <div className="alert alert-warning my-4 ml-3" role="alert" style={{ "whitSpace": "pre-line", "overflowWrap" : "break-word" }}>
          執行結果：<br />{msg}
        </div>
        <hr />
      </div>
    </>
  )
}

function SignIn({token, setToken}) {

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
      setMsg(`
      登入成功【status】 -> ${res.status}
      登入成功【Token】 -> 
      ${res.data.token}`)
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
        <div className="alert alert-warning my-4 ml-3" role="alert" style={{ "whiteSpace": "pre-line", "overflowWrap" : "break-word" }}>
          執行結果：<br /> {msg}
        </div>
        <hr />
      </div>
    </>
  )
}

function CheckOut({token, setToken}) {

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
        <div className="alert alert-warning my-4 ml-3" role="alert" style={{ "whiteSpace": "pre-line", "overflowWrap" : "break-word" }}>
          執行結果：<br /> {msg}
        </div>
        <hr />
      </div>
    </>
  )
}

function SignOut({token, setToken}) {

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
      const res = await axios.post(apiURL.baseURL + apiURL.signOutPath, {} , formHeaders)
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
        <div className="alert alert-warning my-4 ml-3" role="alert" style={{ "whiteSpace": "pre-line", "overflowWrap" : "break-word" }}>
          執行結果：<br /> {msg}
        </div>
        <hr />
      </div>
    </>
  )
}

function TodoList ({token}) {
  return (
    <>
      <div>123</div>
    </>
  )
}

export default App
