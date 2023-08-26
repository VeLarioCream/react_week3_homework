import { useState } from 'react'
import axios from 'axios'

const apiURL = {
  baseURL : 'https://todolist-api.hexschool.io',
  signUpPath : '/users/sign_up',
  sighInPath : '/users/sign_in',
  checkOutPath : '/users/checkout',
  signOutPath : '/users/checkout',
  todoPath : '/todos/'
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
    if(!email || !password || !nickName) {
      // alert('資訊填寫不完整')
      setMsg(`資訊填寫不完整：Email、密碼、暱稱皆為必填欄位。`)
      return
    }
    try {
      const res = await axios.post(apiURL.baseURL + apiURL.signUpPath, formData) 
      setMsg(`註冊成功 -> UID： ${res.data.uid}`)
    } catch (error) {
      setMsg(`註冊失敗 -> ${error.response.data.message}`)
    }     
  }

  return (
    <>
      <div className="container my-4 mx-3">
      <h1><span className="badge badge-secondary">《註冊》</span></h1>
        <form>
          <div className="form-group ml-3">
            <label htmlFor="exampleInputEmail1">Email：</label>
            <input type="email" className="form-control" id="exampleInputEmail1" value={email} aria-describedby="emailHelp" placeholder="請輸入Email" onChange={
              (e) => {setEmail(e.target.value)}
            }/>
            </div>
          <div className="form-group ml-3">
            <label htmlFor="exampleInputPassword1">密碼：</label>
            <input type="password" className="form-control" id="exampleInputPassword1" value={password} placeholder="請輸入密碼" onChange={
              (e) => {setPassword(e.target.value)}
            }/>
          </div>
          <div className="form-group ml-3">
            <label htmlFor="nickName">暱稱：</label>
            <input type="text" className="form-control" id="nickName" value={nickName} placeholder="請輸入暱稱" onChange={
              (e) => {setNickName(e.target.value)}
            }/>
          </div>
          <button type="button" className="btn btn-primary ml-3" onClick={handleSubmit}>送出</button>
        </form>
        <div className="alert alert-warning my-4 ml-3" role="alert">
          執行結果：<br/><br/>{msg}
        </div>
        <hr />
      </div>
    </>
  )
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <SignUp />
    </>
  )
}

export default App
