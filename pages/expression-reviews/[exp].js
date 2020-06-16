import { useState } from 'react'
import dynamic from 'next/dynamic'
import Slider from "react-slick";
const BottomBar = dynamic(() => import('../components/BottomBar'))

export const SnackBar = ({ exp, validation }) => (
    <div>
        {
            !validation || exp === validation ?
                <div style={{ backgroundColor: '#34e7e4', width: '120px', marginLeft: '-10px', height: '36px', padding: '5px', borderRadius: '5px' }}>
                    <p className="text-center" style={{ color: 'white' }}><i className="fas fa-check pr-1" aria-hidden ></i>{validation || exp}</p>
                </div> :
                <div style={{ backgroundColor: '#f53b57', width: '120px', marginLeft: '-10px', height: '36px', padding: '5px', borderRadius: '5px' }}>
                    <p className="text-center" style={{ color: 'white' }}><i className="fas fa-times-circle pr-1" aria-hidden></i>{validation || exp}</p>
                </div>
        }

    </div>
)


export const Modal = ({ defaultExp, changeExp, dupkey }) => {
    const [activeExp, setActive] = useState(defaultExp)
    return (
        <div>
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-hidden>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">What expression should it be?</h5>
                            <button onClick={() => setActive(defaultExp)} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p className="text-center">{activeExp}</p>
                            <div className="container">
                                <div className="row mt-3">
                                    <div className="col-4">
                                        <div onClick={() => setActive('happy')} className={`wrapper${activeExp === 'happy' ? ' active' : ''}`}><i className="fas fa-laugh-beam" aria-hidden></i></div>
                                    </div>
                                    <div className="col-4">
                                        <div onClick={() => setActive('sad')} className={`wrapper${activeExp === 'sad' ? ' active' : ''}`}><i className="fas fa-sad-tear" aria-hidden></i></div>
                                    </div>
                                    <div className="col-4">
                                        <div onClick={() => setActive('neutral')} className={`wrapper${activeExp === 'neutral' ? ' active' : ''}`}><i className="fas fa-meh-blank" aria-hidden></i></div>
                                    </div>
                                </div>
                                <div className="row mt-5">
                                    <div className="col-4">
                                        <div onClick={() => setActive('angry')} className={`wrapper${activeExp === 'angry' ? ' active' : ''}`}><i className="fas fa-angry" aria-hidden></i></div>
                                    </div>
                                    <div className="col-4">
                                        <div onClick={() => setActive('fear')} className={`wrapper${activeExp === 'fear' ? ' active' : ''}`}><i className="fas fa-grimace" aria-hidden></i></div>
                                    </div>
                                    <div className="col-4">
                                        <div onClick={() => setActive('surprise')} className={`wrapper${activeExp === 'surprise' ? ' active' : ''}`}><i className="fas fa-surprise" aria-hidden></i></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-dark" data-dismiss="modal" onClick={() => changeExp(activeExp)}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
            h6 {
                padding-bottom: 16px;
            }
            .wrapper {
                display: table;
                width: 64px; height:64px; 
                background-color: #74b9ff;
                border-radius: 999px;
            }
            .wrapper i {
                display: table-cell;
                vertical-align: middle;
                text-align: center;
                color: #ecf0f1;
                font-size: 38px
            }
            .wrapper.active {
                font-size: 22px;
                border: 4px solid #0984e3;
            }
            .wrapper.active i {
                color: #0984e3 !important;
            }
            .text-center {
                text-transform: capitalize;
            }
    `}</style>
        </div>
    )
}

const Expressions = ({ expParamQuery, defaultExpData }) => {
    const [expData, setExpData] = useState(defaultExpData)
    const [active, setActive] = useState(0)
    const [loadingHome, setLoadingHome] = useState(false)
    const [loadingGallery, setLoadingGallery] = useState(false)
    const [loadingSelfie, setLoadingSeflie] = useState(false)
    const [mode, setMode] = useState('text')

    const expressionLabel = ['happy', 'sad', 'neutral', 'angry', 'fear', 'surprise']
    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "20px",
        slidesToShow: 5,
        arrows: false,
        speed: 0,
        easing: 'linear',
        beforeChange: (prev, next) => {
            setActive(next);
        },
    };
    const changeExp = async (activeExp) => {
        const res = await fetch(`http://bangkit-face-exp.df.r.appspot.com/update-validation/${expData[active].blob_name}/${activeExp}`, {
            method: 'POST'
        })
        const resp = await res.json()
        const changedArr = [...expData]
        changedArr[active] = resp.data
        setExpData(changedArr)
    }

    return (
        <div>
            <div className="container">
                <div className="container img-container">
                    <img className="img-fluid" alt={expData[0].image_public_url} src={expData[active].image_public_url} />
                </div>
                <div className="d-flex justify-content-center mt-5 mb-5">
                    <div className="wrapper mr-5" data-toggle="modal" data-target="#exampleModal">
                        <i className="fas fa-exclamation" aria-hidden />
                    </div>
                    <div className="middle-container">
                        {mode === 'text'
                            ? <div>
                                <h4 className="text-center" style={{ textTransform: 'capitalize' }}>{expParamQuery}</h4>
                                < SnackBar exp={expParamQuery} validation={expData[active].validation} />
                            </div>
                            : <img className="middle-container" src={expData[active].image_public_url} />}
                    </div>
                    <div className="wrapper ml-5" onClick={() => setMode(mode === 'text' ? 'photo' : 'text')}>
                        <i className="fas fa-image" aria-hidden />
                    </div>

                </div>
                <Modal key={`${active}${expData[active].validation}`} dupkey={`${active}${expData[active].validation}`} defaultExp={expData[active].validation || expParamQuery} name={expData[active].blob_name} changeExp={changeExp} />
                <Slider {...settings}>
                    {expData.map((el, idx) => (
                        <div key={idx} className={`slider-slide${idx === active ? ' active-test' : ''}`}>
                            <div className="h3">
                                <div className="card">
                                    <img className="card-img-top" src={el.image_public_url} alt="Card image cap" style={{ width: '67px', height: '67px' }} />
                                </div>
                            </div>
                        </div>))
                    }
                </Slider>
            </div>
            <BottomBar expressionLabel={expressionLabel[active]} active='gallery' loadingHome={loadingHome} loadingGallery={loadingGallery} setLoadingHome={() => setLoadingHome(true)} setLoadingGallery={() => setLoadingGallery(true)} loadingSelfie={loadingSelfie} setLoadingSelfie={() => setLoadingSeflie(true)} />
            <style jsx>{`
                .wrapper{
                    display: table;
                    width: 50px; height: 50px; 
                    background-color: #dfe6e9;
                    border-radius: 999px;
                }
                .wrapper i {
                    display: table-cell;
                    vertical-align: middle;
                    text-align: center;
                    color: #636e72;
                }
                .wrapper:active {
                    font-size: 22px;
                    border: 1px solid #b2bec3;
                }
                .middle-container {
                    width: 96px;
                    height: 96px;
                    border-radius: 5px;
                }
 
                div.row {
                    padding: 5px;
                    border: 1px solid red;
                    margin: 5px;
                }
                .container {
                    padding-top: 20px
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
                .active-test .h3 .card img {
                    border: 6px solid #303952;
                    }
            `}</style>
        </div >)
}

export async function getServerSideProps(context) {
    const expParamQuery = context.query.exp
    const resp = await fetch(`https://bangkit-face-exp.df.r.appspot.com/get-expression/${expParamQuery}`)
    const res = await resp.json()
    const data = res['expressions']

    return {
        props: {
            expParamQuery,
            defaultExpData: data
        }
    }
}

export default Expressions