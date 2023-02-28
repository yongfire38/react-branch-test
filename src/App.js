import { useState, useEffect } from 'react';

function Header(props) {
  return(
    <a href="/" onClick={e=>{
      e.preventDefault();
      props.onChangeMode();
    }}>
      <h1>{props.title}</h1>
    </a>
  );
}

function Nav(props) {

  const [detailNav, setDetailNav] = useState({});
  let navDetail =  [];

  useEffect(()=> { 
    fetch('list.json')
    .then(response => {
      return response.json();
    })
    .then(json => {
      //console.log('json:::::'+json);
      setDetailNav(json);
      //console.log('detailNav:::::'+detailNav); 
      //console.log('detailNav.length:::::'+detailNav.length); 
    })
  },[]); // eslint-disable-line react-hooks/exhaustive-deps

  for(let i = 0; i < detailNav.length; i++){
    navDetail.push(
      <li key={detailNav[i].id}>
        <a id={detailNav[i].id} href={detailNav[i].id} onClick={e=>{
          e.preventDefault();
          props.onChangeMode(e.target.id);
        }}>{detailNav[i].title}</a>
      </li>)
  }

  return(
    <nav>
      <ul>
        {navDetail}
      </ul>
    </nav>
  );
}

function Article(props) {
  return(
    <article>
      <h2>{props.title}</h2>
      {props.body}
    </article> 
  );
}

function App() {

  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  const [topics, setTopics] = useState({});

  let content = null;

  useEffect(()=>{
    fetch('1.json')
      .then(response => {
        return response.json();
      })
      .then(json => {
        setTopics(json);
      })
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if(mode === 'WELCOME') {
    content = <Article title="WELCOME" body="Hello, React &amp; Ajax"></Article>
  } else if(mode === 'READ') {
    for(let i = 0; i < topics.length; i++) {
      let title, desc = null;

      if(topics[i].id === Number(id)){
        title = topics[i].title;
        desc = topics[i].desc;

        content = <Article title={title} body={desc}></Article>
      }
    }
  }

  return (
    <div className="App">
      <Header title="REACT" onChangeMode={()=>{
        setMode('WELCOME');
      }}></Header>
        <Nav onChangeMode={id=>{
          setMode('READ');
          setId(id);
        }}>
        </Nav>
      {content}
    </div>
  );
}

export default App;
