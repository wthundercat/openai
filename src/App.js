
import React, { useState } from 'react';
import Textarea from './components/StyledTextArea';

const App = () => {
  const [message, setMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('message is ', message)
    const res = await fetch('http://localhost:3001/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    const data = await res.json();
    setResponseMessage(data.message);
  };

  const handleTextChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Textarea value={message} onChange={handleTextChange} />
        <button type="submit">Submit</button>
      </form>
      {responseMessage && (
        <div>
          <p>Response message:</p>
          <p>{responseMessage}</p>
        </div>
      )}
    </div>
  );
};

export default App
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
