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

export class AddBulbModal extends React.Component<AddBulbModalProps, {}> {
    volumeInput: React.RefObject<any>
        = React.createRef();
    state: AddBulbModalState = {
        checked: false,
    }

    constructor(props: AddBulbModalProps) {
        super(props);
    }

    handleClick(asd: any) {
        console.log(asd.target.checked);
        this.setState({ checked: asd.target.checked })
    }

    onSuccess() {
        const volume = +this.volumeInput.current.value || 1;

        const waterLevel = this.state.checked
            ? volume
            : 0;

        this.props.onSuccess({ volume, waterLevel });
        this.props.onClose();
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={() => this.props.onClose()}>
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
                            onClick={asd => this.handleClick(asd)}
                            />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => this.props.onClose()}>
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
