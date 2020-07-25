import React, {useState, useCallback, useEffect} from 'react';
import api from '../../services/api';
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from 'react-icons/fa';
import {Container, Form, SubmitButton, List, DeleteBtn, ErrorAlert} from './styles';
import { Link } from 'react-router-dom';

export default function Main(){
  const [newRepo, setNewRepo] = useState('');
  const [repositorios, setRepositorios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msgError, setMsgError] = useState(null);

  //bucar informações
  useEffect(() => {
    const repoStorage = localStorage.getItem('repos');
    if(repoStorage){
      setRepositorios(JSON.parse(repoStorage));
    }
  }, [])
  
  //salvar alterações
  useEffect(() => {
    localStorage.setItem('repos', JSON.stringify(repositorios));
  }, [repositorios])

  const handleSubmit = useCallback((e)=>{
    e.preventDefault();

    async function submit(){
      setLoading(true);
      try{

        if(newRepo === ''){
          throw new Error('Digite o nome de um respositório.');
        }
        const response = await api.get(`repos/${newRepo}`);
        const hasRepo = repositorios.find(repo => repo.name === newRepo);
        const data = {
          name: response.data.full_name,
        }
        if(hasRepo){
          throw new Error('Este repositório já está listado.');
        }
       
    
        setRepositorios([...repositorios, data]);
        setNewRepo('');
      }catch(error){
        setMsgError(error.message);
      }finally{
        setLoading(false);
      }

    }

    submit();

  }, [newRepo, repositorios]);

  function handleinputChange(e){
    setNewRepo(e.target.value);
    setMsgError(null);
  }

  const handleDelete = useCallback((repo) => {
    const find = repositorios.filter(r => r.name !== repo);
    console.log(find);
    setRepositorios(find);
  }, [repositorios])

  return(
    <Container>
      
      <h1>
        <FaGithub size={25}/>
        Meus Repositorios
      </h1>

      <Form onSubmit={handleSubmit}>

        <div className='input-btn'>
          <input 
            type="text" 
            placeholder="Adicionar Repositorios"
            value={newRepo}
            onChange={handleinputChange}
            />
              <SubmitButton loading={loading ? 1 : 0}>
            {loading ? (
              <FaSpinner color="#FFF" size={14}/>
            ) : (
              <FaPlus color="#FFF" size={14}/>
            )}
          </SubmitButton> 
        </div>
          
        {msgError !== null && <ErrorAlert>{msgError}</ErrorAlert>}

      </Form>
      <List>
        {repositorios.map(repo => (
          <li key={repo.name}> 
            <span> 
              <DeleteBtn 
                type='button'
                onClick={()=>handleDelete(repo.name)}
              >
                <FaTrash size={16} />
              </DeleteBtn>
              {repo.name}
            </span>
            <Link to={`/repositorio/${encodeURIComponent(repo.name)}`}>
              <FaBars size={20}/>
            </Link>
          </li>
        ))}
      </List>

    </Container>
  )
}