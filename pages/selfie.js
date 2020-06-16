import { useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import axios from 'axios'
import { generateUID } from '../utils/index'
import BottomBar from './components/BottomBar'
const Camera = dynamic(
    () => import('react-html5-camera-photo'),
    { ssr: false }
)

export default function Selfie() {
    const [isLoading, setLoading] = useState(false)
    const [imageRes, setImgRes] = useState('')
    const [loadingHome, setLoadingHome] = useState(false)
    const [loadingGallery, setLoadingGallery] = useState(false)
    const [loadingSelfie, setLoadingSeflie] = useState(false)

    const DataURIToBlob = (dataURI) => {
        const splitDataURI = dataURI.split(',')
        const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
        const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

        const ia = new Uint8Array(byteString.length)
        for (let i = 0; i < byteString.length; i++)
            ia[i] = byteString.charCodeAt(i)

        return new Blob([ia], { type: mimeString })
    }

    const handleTakePhoto = async (dataUri) => {
        setImgRes('')
        setLoading(true)
        const uploadTime = Date.now();
        const uid = generateUID('S', uploadTime)
        const file = DataURIToBlob(dataUri)
        const data = new FormData()
        data.append("file", file, uid);
        const url = 'https://bangkit-face-exp.df.r.appspot.com/upload_photo'

        try {
            const res = await axios.post(url, data)
            const imgsData = res.data
            setImgRes(imgsData)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="text-center">
            <Camera
                onTakePhoto={(dataUri) => { handleTakePhoto(dataUri); }}
                idealFacingMode={'user'}
            />
            {isLoading ?
                <div>
                    <div className="lds-ripple"><div></div><div></div></div>
                    <p>Loading...</p>
                </div> : null}
            <div className="mt-5">
                {imageRes && imageRes.image_public_url ? <img src={imageRes.image_public_url} alt="img" style={{ height: 'auto', width: '200px' }} /> : null}
                <br />
                {imageRes ? <h1>Expression: {imageRes.expression}</h1> : null}
            </div>
            < BottomBar expressionLabel='happy' active='selfie' loadingHome={loadingHome} loadingGallery={loadingGallery} setLoadingHome={() => setLoadingHome(true)} setLoadingGallery={() => setLoadingGallery(true)} loadingSelfie={loadingSelfie} setLoadingSelfie={() => setLoadingSeflie(true)} />
            <style jsx>{`
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
