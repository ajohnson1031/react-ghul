import React, { useState, useEffect } from "react";
import { Card } from "semantic-ui-react";
import RepoItem from "../RepoItem";

const RepoList = ({ userdata }) => {
  const [rpState, setRPState] = useState({
    allRepos: null,
  });

  useEffect(() => {
    fetch(`${userdata.repos_url}?page=1&per_page=15`)
      .then((res) => res.json())
      .then((res) =>
        setRPState({
          ...rpState,
          allRepos: res,
        })
      );
  }, [rpState.allRepos]);

  return (
    rpState.allRepos && (
      <Card.Content className='mycontent repo-list'>
        <div className='h4-container'>
          <h4>Repos:</h4>
        </div>
        <div className='list-container'>
          <div className='repos-listed'>
            {rpState.allRepos.map((repo, i) => {
              return (
                <RepoItem name={repo.name} url={repo.html_url} id={i} key={i} />
              );
            })}
          </div>
          {userdata.public_repos >= 15 && (
            <a
              href={`https://github.com/${userdata.login}?tab=repositories`}
              rel='noopener noreferrer'
              target='_blank'
            >
              <div className='github-linkto'>
                <p>{`See All Repositories (${
                  userdata.public_repos - 15
                } more...)`}</p>
              </div>
            </a>
          )}
        </div>
      </Card.Content>
    )
  );
};

export default RepoList;
