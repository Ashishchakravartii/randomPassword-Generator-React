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
    <div className="w-100 vh-100 text-light p-1 bg-dark d-flex justify-content-center align-items-center ">
      <div className="w-50 h-25 bg-secondary-subtle rounded-5 p-3">
        <div className="w-100 h-50 d-flex align-items-center justify-content-center ps-4 pe-4 gap-3">
          <input ref={passRef} readOnly value={password} className="form-control p-3 w-50" type="text" />
          <button style={{backgroundColor:btncolor}}  onClick={copyPasswordToClipboard} className="text-light border-0 p-3 rounded-3 ">{btntext}</button>
        </div>
        <div className="w-100 h-50 d-flex align-items-center ps-4 pe-4 gap-1 justify-content-around">
          <div>
            <input value={length} min={6} max={100} onChange={(e)=>setLength(e.target.value)} type="range" />
            <label className="text-dark fs-5">&nbsp; character limit {length}</label>
          </div>
          <div>
            <input defaultChecked={numberallowed} onChange={()=>{setNumberAllowed((prev)=>!prev)}} type="checkbox" />
            <label className="text-dark fs-5">&nbsp; Numbers</label>
          </div>
          <div>
            <input defaultChecked={charallowed} onChange={()=>{setCharAllowed((prev)=>!prev)}} className='' type="checkbox" />
            <label className="text-dark fs-5">&nbsp; Special Characters</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App