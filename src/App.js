import RootRoutes from './routes';
import React from 'react';

import './css/base.css';
import './css/layout.css';
import './css/component.css';
import './css/page.css';
import './css/response.css';

function App() {

  return (

    <div className="wrap">
      <React.StrictMode>
        <RootRoutes />
      </React.StrictMode>
    </div>
  )
}

console.log("process.env.NODE_ENV", process.env.NODE_ENV);
console.log("process.env.REACT_APP_EGOV_CONTEXT_URL", process.env.REACT_APP_EGOV_CONTEXT_URL);

// 디폴트 브랜치는 수정함
// 여기서 주석 더 늘리지 말 것

export default App
