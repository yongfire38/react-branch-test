import RootRoutes from './routes';
import React from 'react';

import './css/base.css';
import './css/layout.css';
import './css/component.css';
import './css/page.css';
import './css/response.css';

function App() {

  return (
    // 테스트 주석
    // main branch에서 수정
    // main branch에만 반영시킬 코드
    <div className="wrap">
      <React.StrictMode>
        <RootRoutes />
      </React.StrictMode>
    </div>
  )
}

console.log("process.env.NODE_ENV", process.env.NODE_ENV);
console.log("process.env.REACT_APP_EGOV_CONTEXT_URL", process.env.REACT_APP_EGOV_CONTEXT_URL);

//main 내용 수정
export default App;
