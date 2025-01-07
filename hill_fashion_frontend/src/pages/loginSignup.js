import React, { useState }  from "react";
import { memo } from "react";
import './css/loginSignup.css'

const LoginSignup = () =>{

    const [state, setState] = useState("Đăng nhập");
    const [formData,setFormData] = useState({
        username: "",
        password: "",
        email: ""
    })

    const login = async()=>{
        console.log("Chức năng đăng nhập đã được thực thi",formData);
        console.log("Chức năng đăng ký đã được thực thi",formData);
        let responseData;
        await fetch('http://localhost:4000/login',{
            method: 'POST',
            headers:{
                Accept:'application/form-data','Content-Type':'application/json',
            },
            body: JSON.stringify(formData),
        }).then((response)=> response.json()).then((data)=> responseData=data)

        if(responseData.success){
            localStorage.setItem('auth-token', responseData.token);
            window.location.replace("/");
        }
        else{
            alert(responseData.error)
        }
    }

    const signup = async()=>{
        console.log("Chức năng đăng ký đã được thực thi",formData);
        let responseData;
        await fetch('http://localhost:4000/signup',{
            method: 'POST',
            headers:{
                Accept:'application/form-data','Content-Type':'application/json',
            },
            body: JSON.stringify(formData),
        }).then((response)=> response.json()).then((data)=> responseData=data)

        if(responseData.success){
            localStorage.setItem('auth-token', responseData.token);
            window.location.replace("/");
        }
        else{
            alert(responseData.error)
        }
    }

    const changeHandler = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    return (
        <div  className="loginsignup">
            <div className="loginsignup-container">
                <h1>{state}</h1>
                <div className="loginsignup-fields">
                    {state==="Đăng ký" ?<input name="username" value={formData.username} onChange={changeHandler} type="text" placeholder="Tên dăng nhập"/>:<></>}
                    <input name="email" value={formData.email} onChange={changeHandler} type="email" placeholder="Địa chỉ email"/>
                    <input name="password" value={formData.password} onChange={changeHandler} type="password" placeholder="Mật khẩu"/>
                </div>
                <button onClick={()=>{state==="Đăng nhập"?login():signup()}}>Tiếp tục</button>
                {state==="Đăng ký"?<p className="loginsignup-login">Đã có tài khoản? <span onClick={()=>{setState("Đăng nhập")}}>Đăng nhập tại đây</span></p>
                :
                <p className="loginsignup-login">Tạo tài khoản <span onClick={()=>{setState("Đăng ký")}}>Nhấn vào đây</span></p>
                }
                <div className="loginsignup-agree">
                    <input type="checkbox" name="" id=""/>
                    <p>Tiếp tục nghĩa là bạn đồng ý với điều khoản sử dụng và chính sách bảo mật.</p>
                </div>
            </div>
        </div>
    );
}

export default memo(LoginSignup);