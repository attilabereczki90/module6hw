import React, { Component } from "react";
import {
  Button,
  Modal,
} from "react-bootstrap";
import { generateId } from "../../utils";

class EditMenuModal extends Component {

  constructor(props) {
    super(props);

    this.state = {
        actualMenu: this.props.showEditMenu.menu,
    };
    
    this.nameInputRef = React.createRef();
    this.descInputRef = React.createRef();
  }

  handleMenuDetailsChange = (event) => {
    const { actualMenu } = this.state;
    const { name, value } = event.target;
    if (name === 'name') {
      this.nameInputRef.current.classList.remove('is-invalid');
      this.nameInputRef.current.placeholder = ''
      if(!actualMenu.id) {
        actualMenu.id = generateId();
      }
      actualMenu.name = value;
    } else {
      this.descInputRef.current.classList.remove('is-invalid');
      this.descInputRef.current.placeholder = ''
      actualMenu[name] = value;
    }
    this.setState({actualMenu});
  }

  saveChanges = () => {
    if(!this.validateInputFields()) {
      return;
    }

    this.props.saveChanges(this.state.actualMenu);
  }

  closeModal = () => {
    this.setState({actualMenu: {
      id: '',
      name: '',
      description: '',
    }}, () => {
      this.props.closeMenuModal();
    });
  }

  validateInputFields = () => {
    let isValid = true;
    if(!this.nameInputRef.current.value) {
      this.nameInputRef.current.classList.add('is-invalid');
      this.nameInputRef.current.placeholder = 'Name must not be empty'
      isValid = false;
    }
    if(!this.descInputRef.current.value) {
      this.descInputRef.current.classList.add('is-invalid');
      this.descInputRef.current.placeholder = 'Description must not be empty'
      isValid = false;
    }

    return isValid;
  }

  render() {
    const { actualMenu } = this.state;

    return (
        <Modal
        show={this.props.showEditMenu.show}
        onShow={() => {
          this.setState({ actualMenu: {
            id: this.props.showEditMenu.menu.id,
            name: this.props.showEditMenu.menu.name,
            description: this.props.showEditMenu.menu.description,
          } });
        }}
        onHide={() => this.closeModal()}
        centered
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Menu
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
              onChange={this.handleMenuDetailsChange}
              name="name"
              ref={this.nameInputRef}
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
              onChange={this.handleMenuDetailsChange}
              name="description"
              ref={this.descInputRef}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-success" onClick={() => this.saveChanges()}>
            Save
          </Button>
          <Button variant="outline-danger" onClick={() => this.closeModal()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default EditMenuModal;