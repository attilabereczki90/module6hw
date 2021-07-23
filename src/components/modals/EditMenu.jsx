import React, { useState } from "react";
import {
  Button,
  Modal,
} from "react-bootstrap";
import { generateId } from "../../utils";

function EditMenu({ showEditMenu, isNew, closeMenuModal, saveMenu }) {
  const [ actualMenu, setMenu ] = useState(showEditMenu.menu);
  const nameInputRef = React.createRef();
  const descInputRef = React.createRef();

  const handleMenuDetailsChange = (event) => {
    const { name, value } = event.target;
    if (name === 'name') {
      nameInputRef.current.classList.remove('is-invalid');
      nameInputRef.current.placeholder = ''
      if(!actualMenu.id) {
        setMenu({
          ...actualMenu,
          id: generateId(),
          name: value,
        });
      } else {
        setMenu({
          ...actualMenu,
          name: value,
        });
      }
    } else {
      descInputRef.current.classList.remove('is-invalid');
      descInputRef.current.placeholder = ''
      
      setMenu({
        ...actualMenu,
        [name]: value,
      })
    }
  };

  const saveChanges = () => {
    if(!validateInputFields()) {
      return;
    }

    saveMenu(actualMenu);
  };

  const closeModal = () => {
    setMenu({
      id: '',
      name: '',
      description: '',
    });
    closeMenuModal();
  };

  const validateInputFields = () => {
    let isValid = true;
    if(!nameInputRef.current.value) {
      nameInputRef.current.classList.add('is-invalid');
      nameInputRef.current.placeholder = 'Name must not be empty'
      isValid = false;
    }
    if(!descInputRef.current.value) {
      descInputRef.current.classList.add('is-invalid');
      descInputRef.current.placeholder = 'Description must not be empty'
      isValid = false;
    }

    return isValid;
  };

  return (
    <Modal
      show={showEditMenu.show}
      onShow={() => {
        setMenu({
          id: showEditMenu.menu.id,
          name: showEditMenu.menu.name,
          description: showEditMenu.menu.description,
        });
      }}
      onHide={() => closeModal()}
      centered
      animation={false}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {isNew && 'Add Menu'}
          {!isNew && 'Edit Menu'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="menu-modal-name"
            required
            value={actualMenu.name}
            onChange={handleMenuDetailsChange}
            name="name"
            ref={nameInputRef}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            rows="10"
            cols="100"
            className="form-control"
            id="menu-modal-description"
            required
            value={actualMenu.description}
            onChange={handleMenuDetailsChange}
            name="description"
            ref={descInputRef}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-success" onClick={() => saveChanges()}>
          {isNew && 'Add'}
          {!isNew && 'Save'}
        </Button>
        <Button variant="outline-danger" onClick={() => closeModal()}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditMenu;