import React, { useEffect, useState } from "react";
import { Card, Image } from "semantic-ui-react";

const FollowCard = ({ followLink, name }) => {
  const [followInfo, setFollowInfo] = useState("");

  useEffect(() => {
    followLink &&
      fetch(`${followLink}`)
        .then((res) => res.json())
        .then((res) => {
          return setFollowInfo(res);
        })
        .catch((err) => console.log(err));
  }, [followLink]);

  return (
    followInfo.length && (
      <Card.Content className="mycontent following-content">
        <div className="h4-container">
          <h4>{`Followers:`}</h4>
        </div>
        <div className="list-container more-off">
          <div className="follower-list ">
            {followInfo.map((follower, i) => {
              return (
                <a href={follower.html_url} rel="noopener noreferrer" target="_blank" key={follower.id}>
                  <div className="follower-tab">
                    <Image src={follower.avatar_url} />
                    <p>{follower.login}</p>
                  </div>
                </a>
              );
            })}
          </div>
          {followInfo.length >= 20 && (
            <a href={`https://github.com/${name}?tab=followers`} rel="noopener noreferrer" target="_blank">
              <div className="github-linkto">
                <p>{`See All Followers`}</p>
              </div>
            </a>
          )}
        </div>
      </Card.Content>
    )
  );
};

export default FollowCard;
