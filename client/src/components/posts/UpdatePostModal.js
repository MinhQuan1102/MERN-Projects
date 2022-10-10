import React, { useContext, useState, useEffect } from 'react'
import { PostContext } from '../../contexts/PostContext'
import Button from 'react-bootstrap/Button'
import FormText from 'react-bootstrap/esm/FormText'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import FormControl from 'react-bootstrap/FormControl'

const UpdatePostModal = () => {
  const {showUpdatePostModal, setShowUpdatePostModal, updatePost, setShowToast, postState: {post}} = useContext(PostContext)
  const [updatedPost, setUpdatedPost] = useState(post)

  const {title, description, url, status} = updatedPost

  useEffect(() => {
    setUpdatedPost(post)
  }, [post])
  const onChangeUpdatePostForm = (e) => {
    setUpdatedPost({...updatedPost, [e.target.name]: e.target.value})
  }

  const onSubmitForm = async (e) => {
    e.preventDefault()
    const {success, message} = await updatePost(updatedPost)
    setShowUpdatePostModal(false)
    setShowToast({ show: true, message: message, type: success ? 'success' : 'danger'})
  }

  const closeDialog = () => {
    setUpdatedPost(post)
    setShowUpdatePostModal(false)
  }

  return (
    <Modal show={showUpdatePostModal} animation={false} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>Making progress?</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmitForm}>
        <Modal.Body>
          <Form.Group>
            <Form.Control type='text' placeholder='Title' name='title' required aria-describedby='title-help' value={title} onChange={onChangeUpdatePostForm}/>
            <FormText id='title-help' muted>Required</FormText>
          </Form.Group>
          <Form.Group>
            <Form.Control as='textarea' rows={3} placeholder='Description' name='description' value={description} onChange={onChangeUpdatePostForm}/>
          </Form.Group>
          <Form.Group>
            <Form.Control type='text' placeholder='Youtube Tutorial URL' name='' value={url} onChange={onChangeUpdatePostForm}/>
          </Form.Group>
          <Form.Group>
            <Form.Control as='select' value={status} name='status' onChange={onChangeUpdatePostForm}>
              <option value='TO_LEARN'>TO LEARN</option>
              <option value='LEARNING'>LEARNING</option>
              <option value='LEARNED'>LEARNED</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={closeDialog}>Cancel</Button>
          <Button variant='primary' type='submit'>LearnIt!</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default UpdatePostModal