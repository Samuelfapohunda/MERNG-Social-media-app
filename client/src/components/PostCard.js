import React, { useContext } from "react";
import { Card, Icon, Label, Image, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import person from "./image-1.jpg";
import moment from "moment";


import { AuthContext } from "../context/auth";
import MyPopup from '../utils/MyPopup'
import LikeButton from './LikeButton'
import DeleteButton from './DeleteButton'


function PostCard({
  post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) {
  const { user } = useContext(AuthContext);



  return (
    <Card fluid >
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src={person}
          // as={Link}
          // to={`/users/${id}`}
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`} >
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description style={{ marginTop: 30 }}>{body}</Card.Description>
      </Card.Content>
      <Card.Content
        extra

      >
       <LikeButton user={user} post={{id, likes, likeCount}}/>
  <MyPopup
  content="Comment on Post"
>
<Button labelPosition="right" as={Link} to={`/posts/${id}`} style={{marginLeft:280}}>
    <Button color="blue" basic>
      <Icon name="comments" />
    </Button>
    <Label basic color="blue" pointing="left">
      {commentCount}
    </Label>
  </Button>
</MyPopup>
      
        {user && user.username === username && <DeleteButton postId={id} />}
      </Card.Content>
    </Card>
  );
}

export default PostCard;
