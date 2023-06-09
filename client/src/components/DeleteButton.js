import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { Button, Confirm, Icon } from "semantic-ui-react";


import MyPopup from '../utils/MyPopup'
import { FETCH_POSTS_QUERY } from "../utils/graphql";
function DeleteButton({ postId, commentId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

  const [deletePostorMutation] = useMutation(mutation, {
    update(proxy) {
      if (!commentId) {
        setConfirmOpen(false);
        const data = proxy.readQuery({
          query: FETCH_POSTS_QUERY,
        });
        proxy.writeQuery({
          query: FETCH_POSTS_QUERY,
          data: { getPosts: data.getPosts.filter((p) => p.id !== postId) },
        });
      }
      if (callback) callback();
    },
    variables: {
      postId,
      commentId,
    },
  });

  return (
    <>
      <MyPopup
      content={commentId ? 'Delete Comment' : 'Delete Post'}
     >
 <Button
        as="div"
        color="black"
        floated="right"
        onClick={() => setConfirmOpen(true)}
      >
        <Icon name="trash" style={{ margin: 0 }} />
      </Button>

     </MyPopup>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostorMutation}
      />
    </>
  );
}

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;

export default DeleteButton;
