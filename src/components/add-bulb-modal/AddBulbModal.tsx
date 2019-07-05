import React from 'react';
import { Button, Modal, InputGroup, FormControl, Form } from 'react-bootstrap';
// import Form from 'react-bootstrap/FormGroup';

interface AddBulbModalProps {
    show: boolean,
    onClose: Function,
    onSuccess: Function,
}

interface AddBulbModalState {
    checked: boolean,
}

export class AddBulbModal extends React.Component<AddBulbModalProps, AddBulbModalState> {
    volumeInput: React.RefObject<any>
        = React.createRef();
    state: AddBulbModalState;

    constructor(props: AddBulbModalProps) {
        super(props);

        this.state = {
            checked: false,
        };
    }

    handleCheckboxClick(evt: any) {
        this.setState({ checked: evt.target.checked });
    }

    closeModal() {
        this.props.onClose();
        this.setState({ checked: false });
    }

    onSuccess() {
        const volume = +this.volumeInput.current.value;

        const waterLevel = this.state.checked
            ? volume || 1
            : 0;

        this.props.onSuccess({ volume, waterLevel });
        this.closeModal();
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={() => this.closeModal()}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Bulb volume</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            placeholder="0"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            ref={this.volumeInput}
                        />

                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Filled: </InputGroup.Text>
                        </InputGroup.Prepend>
                        <InputGroup.Checkbox
                            aria-label="Checkbox for following text input"
                            onClick={evt => this.handleCheckboxClick(evt)}
                            />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => this.closeModal()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => this.onSuccess()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
