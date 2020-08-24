import React, {useEffect, useState} from "react";
import api from "./services/api.js"
import "./styles.css";


function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(()=>{
    api.get('repositories').then(response =>{
      setRepositories(response.data);
    })
  }, []) 

  async function handleAddRepository() {
    const response = await api.post('repositories',{
      "title" : "my-repositories"+`${Date.now()}`,
      "url" : "https://github.com/GJurask/my-repositories",
      "techs" : ["JavaScript","Node.js","JavaScript1","Node.js2","JavaScript3","Node.js4"]
    })
    const repository = response.data;
    setRepositories([...repositories,repository])
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete('repositories/'+id)
    if (response.status === 204){
      const newRepositories = repositories.filter(repository => repository.id !== id )
      setRepositories(newRepositories)
    } 
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key ={repository.id}>
            <p>{repository.title}</p>           
            <p>{repository.url}</p>
            {repository.techs.map(tech => <p key={tech+repository.id}>{tech}</p>)}
            
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>          
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
