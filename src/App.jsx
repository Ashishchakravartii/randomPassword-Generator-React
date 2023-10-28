import React, { useCallback, useEffect, useRef, useState } from 'react'

const App = () => {
  const [password, setPassword] = useState("")
  const [charallowed, setCharAllowed] = useState(false)
  const [numberallowed, setNumberAllowed] = useState(false)
  const [length, setLength] = useState(8)
const [btntext, setBtntext] = useState("Copy")
const [btncolor, setBtncolor] = useState("CornflowerBlue");
 const passRef = useRef(null)  

 const passwordgenerator=useCallback(
   () => {
   let pass= "";
   let str= "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
   if(numberallowed) str += "1234567890"
   if(charallowed) str+= "!@#$%^&*(){}[]`~"

   for (let i = 1; i <= length; i++) {
     let char = Math.floor(Math.random() * str.length + 1);
     pass += str.charAt(char);
    //  console.log(char);
   }

   setPassword(pass);
   },
   [length,numberallowed,charallowed,setPassword],
 )

 useEffect(() => {
   
 passwordgenerator();
 setBtncolor("CornflowerBlue");
 setBtntext("Copy")
  
 }, [length,charallowed,numberallowed,setPassword])
 
 const copyPasswordToClipboard=useCallback(() => {
    passRef.current?.select();
    passRef.current?.setSelectionRange(0,100);
    window.navigator.clipboard.writeText(password)
    setBtntext("Copied")
    setBtncolor("DarkOrange");
   },
   [password],
 )
 


  return (
    <div
      className="w-100 vh-100 text-light p-1 bg-dark d-flex  flex-column align-items-center "
      style={{
        backgroundImage:
          "url(https://images.pexels.com/photos/1287075/pexels-photo-1287075.jpeg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* --------nav------ */}

      <nav class="ps-5 navbar navbar-expand-lg bg-body-tertiary vw-100 p-3">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            Securify
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav w-100 ms-5 gap-4">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Features
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Pricing
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link " aria-disabled="true">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="vw-100 h-100  d-flex justify-content-center align-items-center">
        <div className="w-50 bg-secondary-subtle rounded-5 p-5 d-flex flex-column justify-content-center">
          <div className="w-100 h-50 d-flex align-items-center flex-column justify-content-center ps-4 pe-4 gap-3">
            <h2 className="text-dark fw-light">Random Password Generator</h2>
            <div className="p-2 d-flex w-75 ">
              <input
                ref={passRef}
                readOnly
                value={password}
                className="form-control ps-5 pe-5 w-100"
                type="text"
              />
              <button
                style={{ backgroundColor: btncolor }}
                onClick={copyPasswordToClipboard}
                className="text-light border-0 p-3 rounded-3 ms-2 "
              >
                {btntext}
              </button>
            </div>
          </div>
          <div className="w-100 h-50 d-flex align-items-center pt-5 gap-1 justify-content-around">
            <div>
              &nbsp;&nbsp;
              <input
                value={length}
                min={6}
                max={100}
                onChange={(e) => setLength(e.target.value)}
                type="range"
              /> <br />
              <label className="text-dark fs-5">
                &nbsp; character limit {length}
              </label>
            </div>
            <div>
              <input
                defaultChecked={numberallowed}
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                }}
                type="checkbox"
              />
              <label className="text-dark fs-5">&nbsp; Numbers</label>
            </div>
            <div>
              <input
                defaultChecked={charallowed}
                onChange={() => {
                  setCharAllowed((prev) => !prev);
                }}
                className=""
                type="checkbox"
              />
              <label className="text-dark fs-5">
                &nbsp; Special Characters
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App