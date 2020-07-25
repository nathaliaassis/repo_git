import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import {FaArrowLeft} from 'react-icons/fa';
import {Container, Datas, List, Labels, Label, PageActions, FilterList} from './styles';
import { Link } from 'react-router-dom';

export default function Repositorio({match}){

  const [repo, setRepo] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState([
    {state: 'all', label: 'Todas', active: true},
    {state: 'open', label: 'Abertas', active: false},
    {state: 'closed', label: 'Fechadas', active: false},
  ])
  const [filterIndex, setFilterIndex] = useState(0);

  useEffect(() => {
    async function load(){
    const repoName = decodeURIComponent(match.params.repositorio);
      const [repoData, issuesData] = await Promise.all([
        api.get(`/repos/${repoName}`),
        api.get(`/repos/${repoName}/issues`,{
          params: {
            state: filters.find(f => f.active).state, 
            per_page: 5
          }
        })
      ]);
      setRepo(repoData.data);
      setIssues(issuesData.data);
      setLoading(false);
    }
    load();
  }, [filters, match.params.repositorio])

  useEffect(() => {
    async function loadIssues(){
      const repoName = decodeURIComponent(match.params.repositorio);
      const response = api.get(`/repos/${repoName}/issues`,{
        params:{
          state: filters[filterIndex].state, 
          page,
          per_page: 5
        },
      });
      setIssues(response.data);
    }
    loadIssues();
  }, [filterIndex, filters, match.params.repositorio, page])

  function handlePage(action){
    setPage(action === 'back' ? page-1 : page+1);
    console.log(page);
  }

  function handleFilter(index){
    setFilterIndex(index);
  }

  return (
    <Container>
      <Link to='/'>
        <FaArrowLeft size={20}/>
      </Link>
      {loading ? <span>Carregando...</span> : 
        <>
          <Datas>
            <img 
              src={repo.owner && repo.owner.avatar_url} 
              alt={`Logo do repositório ${repo.name}`} 
              className='img'
            />
            <h1>{repo.name}</h1>
            <h4>{repo.description}</h4>
          </Datas>
          <FilterList active={filterIndex}>
            {filters.map((filter, index) => (
              <button 
                type='button'
                className='btn-filter'
                key={filter.label}
                onClick={()=> handleFilter(index)}
              >
                {filter.label}
              </button>
            ))}
          </FilterList>
          <h3>Issues</h3>
          <List>

            {issues ? issues.map(i => 
                <li key={String(i.id)}>
                  <a href={i.html_url}>
                  <img 
                    src={i.user.avatar_url}
                    alt={`Imagem da issue ${i.user.login}`}
                  />
                  <div className='datas'>
                    <strong>
                      {i.title}
                    </strong>
                    <Labels>
                      {i.labels.map(l => 
                        <Label key={l.id}>{l.name}
                        </Label>
                      )}
                    </Labels>
                    <span>{i.user.login}</span>
                  </div>
                  </a>
                </li>
              ) : <span>Este respositório não possui issues para serem exibidas.</span>
            }
          </List>
          <PageActions>
            <button 
              type='button' 
              onClick={()=>handlePage('back')}
              disabled={page < 2}
            >
              Voltar
            </button>
            <button type='button' onClick={()=>handlePage('next')}>
              Próxima
            </button>
          </PageActions> 
        </>
      }
    </Container>
  )
}
