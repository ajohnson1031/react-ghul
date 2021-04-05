import React, { useState, useEffect } from "react";
import { Container, Card } from "semantic-ui-react";
import GitHubCalendar from "react-github-calendar";
import SearchForm from "../SearchForm";
import UserDetails from "../UserDetails";
import RepoList from "../RepoList";
import FollowCard from "../FollowCard";

const UserCard = () => {
  const [appState, setAppState] = useState({
    username: "ajohnson1031",
    userdata: null,
  });

  useEffect(() => {
    fetch(`https://api.github.com/users/${appState.username}`)
      .then((res) => res.json())
      .then((res) => {
        return setAppState({ username: res.login, userdata: res });
      });
  }, [appState.username]);

  const orangeTheme = {
    background: "transparent",
    text: "#FFF",
    grade4: "#FF8F00",
    grade3: "#FFA724",
    grade2: "#FFC400",
    grade1: "#ffd195",
    grade0: "#FFF5E8",
  };

  return (
    appState.userdata && (
      <Container className='main-wrapper'>
        <Card>
          <Card.Header>
            <SearchForm appState={appState} onFormSubmit={setAppState} />
            <h1>GitHub User: {appState.username}</h1>
          </Card.Header>
          <Card.Content className='content user-calendar'>
            <GitHubCalendar username={appState.username} theme={orangeTheme} />
          </Card.Content>
          <UserDetails userDetails={appState.userdata} />
          <RepoList userdata={appState.userdata} />
          <FollowCard
            followLink={appState.userdata.followers_url}
            name={appState.userdata.login}
          />
        </Card>
      </Container>
    )
  );
};

export default UserCard;
