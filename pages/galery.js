import { useState, useEffect } from 'react';
import axios from 'axios'
import Link from 'next/link'
import { generateUID } from '../utils/index'
import dynamic from 'next/dynamic'
const BottomBar = dynamic(() => import('../components/BottomBar'))

export default function Galery() {
    const [file, setFile] = useState("");
    const [isLoading, setLoading] = useState(false)
    const [fileName, setFilename] = useState("Choose File");
    const [fileURL, setFileURL] = useState('')
    const [imgInput, setImgInput] = useState('')
    const [imageRes, setImgRes] = useState('')
    const [preview, setPreview] = useState(null)

    const onFileChange = (e) => {
        setImgRes('')
        setImgInput(e.target.value)
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
        setPreview(URL.createObjectURL(e.target.files[0]))
    }

    const handleUploadImage = async (ev) => {
        setLoading(true)
        const uploadTime = Date.now();
        const uid = generateUID('G', uploadTime)
        ev.preventDefault();
        const data = new FormData();
        data.append('file', file, uid);
        const url = 'https://bangkit-face-exp.df.r.appspot.com/upload_photo'

        try {
            const res = await axios.post(url, data)
            const imgsData = res.data
            setFileURL(res.data.image_public_url)
            setImgRes(imgsData)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        window.document.getElementById('customFile');
    }, [])
    return (
        <div className="container pt-3 text-center" style={{ height: '100vh', maxWidth: '500px', margin: '0 auto' }}>
            <div className="modal-backdrop fade show"></div>
            <button style={{ opacity: '0' }} type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal in" data-backdrop="static" data-show="true" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: 'block' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Take picture</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <Link href="/">
                                    <span aria-hidden="true">&times;</span>
                                </Link>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="container img-container">
                                <img className="img-fluid" src={preview} />
                            </div>
                            <h5 className="pt-4" style={{ textTransform: 'capitalize' }}>{imageRes.expression}</h5>
                            <form onSubmit={handleUploadImage}>
                                <div className="modal-footer">
                                    <br />
                                    <div className="btn btn-dark custom-file mr-5" style={{ width: '120px', height: '50px', borderRadius: '8px' }}>
                                        <input type="file" accept="image/*" capture="user" id="customFile" onChange={onFileChange} />
                                        <i aria-hidden className="fa fa-camera" style={{ fontSize: '20px', paddingTop: '8px' }}></i>
                                    </div>
                                    <button disabled={!file ? true : false} className="btn btn-dark" style={{ width: '120px', height: '50px', borderRadius: '8px' }}>{isLoading ?
                                        <div>
                                            <i className="fa fa-spinner fa-spin"></i>
                                        </div> : 'Upload'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <BottomBar active='selfie' />

            <style jsx>{`
            #customFile {
                position: absolute;
                left: -3px;
                width: 140px;
                opacity: 0;
                z-index-2;
            }
            .container .img-container {
                    border-radius: 3px;
                    padding-top: 0px;
                    height: 250px;
                    max-width: 370px;
                    position: relative;
                    background: #1e272e;
                }
                .img-fluid {
                    margin: 0;
                    padding: 6px 7px;
                    border-radius: 3px;
                    position: absolute;
                    height:250px;
                    top: 50%;
                    left: 50%;
                    opacity: 0.95;
                    -ms-transform: translate(-50%, -50%);
                    transform: translate(-50%, -50%);
                }
            .footer {
                text-align: left;
                margin-left: 20px;
                position: fixed;
                left: 0;
                bottom: 0;
                width: 100%;
            }
            `}</style>
        </div>
    );
}
