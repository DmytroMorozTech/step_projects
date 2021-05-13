import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { toggleModal } from '../../redux/modal/modalActions';
import { connect, useDispatch } from 'react-redux';
import PropTypes from "prop-types";
import ModalPost from '../ModalPost/ModalPost';

const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

const TransitionsModal = (props)=> {
    const classes = useStyles();
    const {modalIsOpen,activePostId, users, posts} = props;
    // ----------------------------
    const activePostObj = posts.find(post => post._id === activePostId );
    const authorId = activePostObj.author_id;
    const activeUserObj = users.find(user => user._id === authorId);
    // ----------------------------
    // number of likes -> activePostObj.likes_counter

    
    const dispatch = useDispatch()

    return (
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={modalIsOpen}
          onClose={()=>dispatch(toggleModal())}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={modalIsOpen}>
            <div className={classes.paper}>
              <ModalPost post={activePostObj} user={activeUserObj}/>
            </div>
          </Fade>
        </Modal>
      </div>
    );
  }


const mapStateToProps = (state) => {
  return {
    users: state.users.usersList,
    posts: state.posts.postsList,
    modalIsOpen: state.modal.modalIsOpen,
    activePostId: state.modal.activePostId,
  };
};

TransitionsModal.propTypes = {
  users: PropTypes.array,
  posts: PropTypes.array,
  modalIsOpen: PropTypes.bool,
  activePostId: PropTypes.string,
};

export default connect(mapStateToProps, null)(TransitionsModal);