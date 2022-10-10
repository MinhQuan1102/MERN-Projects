import React, { useContext, useState } from 'react'
import { PostContext } from '../../contexts/PostContext'
import Button from 'react-bootstrap/Button'
import FormText from 'react-bootstrap/esm/FormText'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import FormControl from 'react-bootstrap/FormControl'

const AddPostModal = () => {
  const {showAddPostModal, setShowAddPostModal, addPost, setShowToast} = useContext(PostContext)
  const [newPost, setNewPost] = useState({
    title: '',
    description: '',
    url: '',
    status: ''
  })

  const {title, description, url, status} = newPost

  const onChangeNewPostForm = (e) => {
    setNewPost({...newPost, [e.target.name]: e.target.value})
  }

  const onSubmitForm = async (e) => {
    e.preventDefault()
    const {success, message} = await addPost(newPost)
    closeDialog()
    setShowToast({
      show: true,
      type: success ? 'success': 'danger',
      message: message
    })
  }

  const closeDialog = () => {
    setNewPost({
      title: '',
      description: '',
      url: '',
      status: ''
    })
    setShowAddPostModal(false)
  }

  return (
    <Modal show={showAddPostModal} animation={false} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>What do you want to learn?</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmitForm}>
        <Modal.Body>
          <Form.Group>
            <Form.Control type='text' placeholder='Title' name='title' required aria-describedby='title-help' value={title} onChange={onChangeNewPostForm}/>
            <FormText id='title-help' muted>Required</FormText>
          </Form.Group>
          <Form.Group>
            <Form.Control as='textarea' rows={3} placeholder='Description' name='description' value={description} onChange={onChangeNewPostForm}/>
          </Form.Group>
          <Form.Group>
            <Form.Control type='text' placeholder='Youtube Tutorial URL' name='' value={url} onChange={onChangeNewPostForm}/>
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

export default AddPostModal