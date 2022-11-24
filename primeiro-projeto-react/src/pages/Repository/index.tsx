import React, { useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useParams, Link } from 'react-router-dom';

import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

import { Header, RepositoryInfo, Issues } from './styles';

interface Repository {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface Issue {
  id: number;
  html_url: string;
  title: string;
  user: {
    login: string;
  };
}

const Repository: React.FC = () => {
  const { repository, author } = useParams();

  const [repo, setRepo] = useState<Repository | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);

  useEffect(() => {
    // api.get(`repos/${author}/${repository}`).then(response => {
    //   console.log(response.data);
    // });

    // api.get(`repos/${author}/${repository}/issues`).then(response => {
    //   console.log(response.data);
    // });

    async function loadData(): Promise<void> {
      /* await força com que a segunda linha só execute depois da primeira requisição completar, portanto, caso não seja
      necessário, uma das recomendações é utilizar o promise all */
      // const repo = await api.get(`repos/${author}/${repository}`);
      // const issues = await api.get(`repos/${author}/${repository}/issues`);

      // Promise all executa juntas porque a segunda nao depende da primeira
      // const response = await Promise.all([
      //   api.get(`repos/${useParams().repository}/${useParams().repository}`),
      //   api.get(`repos/${useParams().author}/${useParams().repository}/issues`),
      // ]);
      // const [repos, issues] = response;
      // console.log(repos, issues);

      // Porém seram mantidas as promises separadas
      await api.get(`repos/${author}/${repository}`).then(response => {
        setRepo(response.data);
      });
      await api.get(`repos/${author}/${repository}/issues`).then(response => {
        setIssues(response.data);
      });
    }

    loadData();
  }, [author, repository]);

  return (
    <>
      <Header>
        <img src={logoImg} alt="Github Explorer" />
        <Link to="/">
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </Header>

      {repo ? (
        <RepositoryInfo>
          <header>
            <img src={repo.owner.avatar_url} alt={repo.owner.login} />
            <div>
              <strong>{repo.full_name}</strong>
              <p>{repo.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{repo.stargazers_count}</strong>
              <span>Stars</span>
            </li>
            <li>
              <strong>{repo.forks_count}</strong>
              <span>Forks</span>
            </li>
            <li>
              <strong>{repo.open_issues_count}</strong>
              <span>Issues Abertas</span>
            </li>
          </ul>
        </RepositoryInfo>
      ) : (
        <p>Loading</p>
      )}

      <Issues>
        {issues.map(issue => (
          <a key={issue.id} href={issue.html_url}>
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>
            </div>
            <FiChevronRight size={20} />
          </a>
        ))}
      </Issues>
    </>
  );
};

export default Repository;
