import React from 'react';
import Users from './Users';
import ChatArea from './ChatArea';

function App() {

  return (
    <React.StrictMode>
         <div className='wrapper'>
            <Users />
        </div>
        <div className='wrapper'>
            <ChatArea />
        </div>
    </React.StrictMode>
  );
}

export default App;
