import { useState , useEffect} from 'react'
import InputForm from '../components/InputForm'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <img id="logo" src='https://www.svgrepo.com/show/499708/radio.svg' />
      </div>

      <h1 id='title'>Tubify</h1>

      <InputForm />

      <p className="read-the-docs">
        Testing prototype
      </p>
    </>
  )
}

export default App
