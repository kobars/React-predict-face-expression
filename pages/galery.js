import { useState, useEffect } from 'react';
import axios from 'axios'
import Link from 'next/link'
import { generateUID } from '../utils/index'
import dynamic from 'next/dynamic'
const BottomBar = dynamic(() => import('../components/BottomBar'))
import Resizer from 'react-image-file-resizer'
import { storage } from '../components/Firebase'
// const utils = require('utils')

export default function Galery() {
    const [file, setFile] = useState("");
    const [isLoading, setLoading] = useState(false)
    const [fileName, setFilename] = useState("Choose File");
    const [fileURL, setFileURL] = useState('')
    const [imgInput, setImgInput] = useState('')
    const [imageRes, setImgRes] = useState('')
    const [preview, setPreview] = useState(null)
    const [compressedImage, setCompressed] = useState(null)
    const [openCV, setCv] = useState(null)
    const [previewGray, setGray] = useState(null)

    const secondUpload = (name) => {
        const uploadTask = storage.ref(`images/${name}`).put(file)
        uploadTask.on(
            "state_changed",
            snapshot => { },
            error => {
                console.log(error)
            },
            () => {
                storage
                    .ref("images")
                    .child(name)
                    .getDownloadURL()
                    .then(url => {
                        console.log(url)
                    })
            }
        )
    }

    const compressImage = (e) => {
        const { uploadTime, fileName } = generateFileInfo()
        Resizer.imageFileResizer(
            e.target.files[0],
            48,
            48,
            'PNG',
            100,
            0,
            uri => {
                const file = new File([uri], fileName, { lastModified: uploadTime });
                console.log('file', file)
                setCompressed(file)
            },
            'blob'
        );
    }

    const testocv = async () => {
    }

    const onFileChange = (e) => {
        console.log('cv', cv)
        // console.log('asdadsa')
        let fileInput = false
        if (e.target.files[0]) {
            fileInput = true
        }
        if (fileInput) {
            compressImage(e)
            setImgRes('')
            setImgInput(e.target.value)
            setFile(e.target.files[0]);
            setFilename(e.target.files[0].name);
            setPreview(URL.createObjectURL(e.target.files[0]))
            // const src = cv.imread('img-preview')
            // console.log('srcccc', src)
        }

    }

    const generateFileInfo = () => {
        const uploadTime = Date.now();
        const fileName = generateUID('G', uploadTime)
        return {
            uploadTime,
            fileName
        }
    }

    const handleUploadImage = async (ev) => {
        setLoading(true)
        const uid = generateFileInfo().fileName
        ev.preventDefault();
        const data = new FormData();
        data.append('file', compressedImage, uid);
        const url = 'https://bangkit-face-exp.df.r.appspot.com/upload_photo'

        try {
            const res = await axios.post(url, data)
            const imgsData = res.data
            setFileURL(res.data.image_public_url)
            setImgRes(imgsData)
            setLoading(false)
            secondUpload(uid)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        window.document.getElementById('customFile');
        const script = document.createElement("script");
        script.src = "/js/opencv3.js";
        script.async = true;
        const imgElement = window.document.getElementById('img-preview')
        imgElement.onload = () => {
            const src = cv.imread(imgElement)
            console.log(src)
            let gray = new cv.Mat();
            cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);
            cv.imshow('img-preview-gray', gray);
            let faces = new cv.RectVector();
            let faceCascade = new cv.CascadeClassifier();

            // let utils = new Utils('errorMessage'); //use utils class
            // let faceCascadeFile = '/haarcascade_frontalface_default.xml'; // path to xml
            // use createFileFromUrl to "pre-build" the xml
            // utils.createFileFromUrl(faceCascadeFile, faceCascadeFile, () => {
            //     classifier.load(faceCascadeFile); // in the callback, load the cascade from file 
            // });

            // faceCascade.load('/haarcascade_frontalface_default.xml');
            // console.log(faceCascade)
            // let msize = new cv.Size(0, 0);
            // faceCascade.detectMultiScale(gray, faces, 1.1, 3, 0, msize, msize);

            // for (let i = 0; i < faces.size(); ++i) {
            //     let roiGray = gray.roi(faces.get(i));
            //     let roiSrc = src.roi(faces.get(i));
            //     let point1 = new cv.Point(faces.get(i).x, faces.get(i).y);
            //     let point2 = new cv.Point(faces.get(i).x + faces.get(i).width,
            //         faces.get(i).y + faces.get(i).height);
            //     cv.rectangle(src, point1, point2, [255, 0, 0, 255]);
            //     roiGray.delete();
            //     roiSrc.delete();
            // }
            // cv.imshow('img-preview-gray', src);
            src.delete();
            gray.delete();
            // faceCascade.delete();
            // faces.delete();
        };

        document.body.appendChild(script);
    }, [])
    return (
        <div className="container pt-3 text-center" style={{ maxWidth: '500px', margin: '0 auto' }}>
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
                                <img id="img-preview" className="img-fluid" src={preview} />
                            </div>
                            <div className="container img-container">
                                <canvas id="img-preview-gray" className="img-fluid" />
                            </div>
                            <h5 className="pt-4" style={{ textTransform: 'capitalize' }}>{imageRes.expression}</h5>
                            {preview}
                            <form onSubmit={handleUploadImage}>
                                <div>
                                    <br />
                                    <div className="btn btn-dark custom-file mr-5" style={{ width: '120px', height: '50px', borderRadius: '8px' }}>
                                        <input type="file" accept="image/*" capture="user" id="customFile" onChange={onFileChange} />
                                        <i aria-hidden className="fa fa-camera" style={{ fontSize: '20px', paddingTop: '8px' }}></i>
                                    </div>
                                    <button disabled={!file || isLoading ? true : false} className="btn btn-dark" style={{ width: '120px', height: '50px', borderRadius: '8px' }}>{isLoading ?
                                        <div>
                                            <i className="fa fa-spinner fa-spin"></i>
                                        </div> : 'Upload'}
                                    </button>
                                </div>
                            </form>
                            <button onClick={testocv}>asdasdasd</button>
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
