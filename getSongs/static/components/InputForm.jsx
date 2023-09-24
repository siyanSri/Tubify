import React, { useState , useEffect} from 'react';
import ProgressDisplay from './ProgressDisplay' 


function InputForm() {
  const [inputData, setInputData] = useState('');
  const [output, setOutput] = useState('');

  const handleSubmit = async (e) => {
    setOutput('');
    e.preventDefault();

    try {
      const response = await fetch('/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input_data: inputData }),
      });


      const data = await response.json();
      setOutput(data.output);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <form id="myForm" onSubmit={handleSubmit}>
        <input
          id="inputData"
          type="text"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          placeholder="Enter Playlist URL here"
        />
        <button type="submit" id="submitButton">
          <i className="fas fa-solid fa-magnifying-glass"></i>
        </button>
      </form>


      { (!(inputData === '') && (output === ''))  ? 
        (<ProgressDisplay inputData={inputData} output={output}/>) : null 
      }

      <div id="output">{output}</div>
        
      {
        (!(output === '') && !(output === 'Not A Valid Playlist URL, Try Again')) ?
        <a className="btn" href="/download">
          Download
        </a> : null 
      }
    
    </div>
  );
}

export default InputForm;