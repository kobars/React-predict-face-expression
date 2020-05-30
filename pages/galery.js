import { useState } from 'react';
import axios from 'axios'
import Link from 'next/link'
import { generateUID } from '../utils/index'

export default function Galery() {
    const [file, setFile] = useState("");
    const [isLoading, setLoading] = useState(false)
    const [fileName, setFilename] = useState("Choose File");
    const [fileURL, setFileURL] = useState('')
    const [imgInput, setImgInput] = useState('')
    const [imageRes, setImgRes] = useState('')

    const onFileChange = (e) => {
        setImgRes('')
        setImgInput(e.target.value)
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);
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

    return (
        <div className="container px-0 text-center">
            <form onSubmit={handleUploadImage}>
                <div className="custom-file">
                    <input type="file" className="custom-file-input" id="customFile" onChange={onFileChange} />
                    <label className="custom-file-label" htmlFor="customFile" >
                        {fileName}
                    </label>
                </div>
                <br />
                {isLoading ?
                    <div>
                        <div className="lds-ripple"><div></div><div></div></div>
                        <p>Loading...</p>
                    </div> : null}
                <div className="mt-5">
                    <button className="btn btn-dark" disabled={!imgInput || isLoading}>Upload</button>
                </div>
                <div className="mt-5">
                    {imageRes && imageRes.image_public_url ? <img src={imageRes.image_public_url} alt="img" style={{ height: 'auto', width: '400px' }} /> : null}
                    <br />
                    <br />
                    {imageRes ? <h1>Expression: {imageRes.expression}</h1> : null}
                    {imageRes && imageRes.image_public_url ? <a className="btn btn-dark" href={fileURL} target="_blank">Open picture</a> : null}
                </div>
                <div className="footer">
                    <Link href="/">
                        <h5 className="btn btn-dark" style={{ marginTop: '300px' }}>Back to home</h5>
                    </Link>
                </div>

            </form>
            <style jsx>{`
            .footer {
                text-align: left;
                margin-left: 20px;
                position: fixed;
                left: 0;
                bottom: 0;
                width: 100%;
            }
            .lds-ripple {
                display: inline-block;
                position: relative;
                width: 80px;
                height: 80px;
            }
            .lds-ripple div {
                position: absolute;
                border: 4px solid #cef;
                opacity: 1;
                border-radius: 50%;
                animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
            }
            .lds-ripple div:nth-child(2) {
                animation-delay: -0.5s;
            }
            @keyframes lds-ripple {
                0% {
                    top: 36px;
                    left: 36px;
                    width: 0;
                    height: 0;
                    opacity: 1;
                }
                100% {
                    top: 0px;
                    left: 0px;
                    width: 72px;
                    height: 72px;
                    opacity: 0;
                }
            }`}</style>
        </div>
    );
}
