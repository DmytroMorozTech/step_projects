import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import { NavLink } from 'react-router-dom';
import {toggleModal} from "../../redux/modal/modalActions";
import {useDispatch} from "react-redux";


const useStyles = makeStyles((theme) => ({
  comment: {
    display:'flex',
    // margin:'0 auto',
    width:'100%',
    '& > *': {
    margin: theme.spacing(1),
    },
  },
    text: {
      fontSize: '12px',
      width:'70%',
    },
    username:{
      width:'106px'
    },
    postCommentLink: {
        textDecoration: 'none',
        color: '#013B8A',
        fontWeight: 'bold'
    },
}));


const Comments = (props)=> {
    const {comment,allUsers, modalIsOpen} = props
    const classes = useStyles();
    const dispatch = useDispatch();
    const authorOfCommentObj = allUsers.find( user => user._id === comment.author_id );

  return (

      <CardActions
          className={classes.comment} >
          <NavLink 
              onClick = {()=> {
                  if (modalIsOpen) dispatch(toggleModal())
              }}
              className={classes.postCommentLink}
              to={`/account/${authorOfCommentObj._id}`
              }>
            <Typography className={classes.username}>{authorOfCommentObj.username} </Typography>
          </NavLink>
           <Typography className={classes.text}>{comment.text}</Typography>
      </CardActions>
    
  );
}

export default Comments;