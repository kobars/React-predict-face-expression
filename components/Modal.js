import { useState } from "react"

const Modal = () => {
    const [modal, setModal] = useState('in')
    const [backDrop, setBackDrop] = useState('modal-backdrop')
    const closeModal = () => {
        setModal('fade')
        setBackDrop('')
    }
    return (
        <div>
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
        </button>
            <div className={`${backDrop} fade show`}></div>
            <div className={`modal ${modal}`} id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: 'block' }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button onClick={closeModal} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            ...
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={closeModal}>Take Photo</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal