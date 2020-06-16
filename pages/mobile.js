import { useState } from 'react'
import dynamic from 'next/dynamic'
import useSWR, { SWRConfig } from 'swr'
import { groupBy, generateReport, fetcher, COLORS } from '../utils/index'
import Link from 'next/link'
const Slider = dynamic(() => import('react-slick'))
const ExpChart = dynamic(() => import('../components/ExpChart'))
const BottomBar = dynamic(() => import('../components/BottomBar'))
const Loading = dynamic(() => import('../components/Loading'))

const Mobile = () => (
    <SWRConfig value={{ revalidateOnFocus: false, fetcher }}>
        <Fetching />
    </SWRConfig>
)


const Fetching = () => {
    const url = 'https://bangkit-face-exp.df.r.appspot.com/'
    const { data, error } = useSWR(url, fetcher)
    if (error) {
        return <div>Error</div>
    }
    if (!data) {
        return <Loading />
    }
    const allData = data['all images and expressions']
    const groupedData = groupBy(allData, 'expression')
    const report = generateReport(groupedData)
    return (
        <DisplayMobile fetchData={report} />
    )
}

const DisplayMobile = ({ fetchData }) => {
    const [active, setActive] = useState(0)
    const [loadingHome, setLoadingHome] = useState(false)
    const [loadingGallery, setLoadingGallery] = useState(false)
    const [loadingSelfie, setLoadingSeflie] = useState(false)

    const expressionLabel = ['happy', 'sad', 'neutral', 'angry', 'fear', 'surprise']

    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "90px",
        slidesToShow: 1,
        arrows: false,
        speed: 500,
        easing: 'ease-out',
        beforeChange: (prev, next) => {
            setActive(next);
        },
    };

    const validationData = fetchData[active].validation
    return (
        <div style={{ height: '100vh', maxWidth: '500px', margin: '0 auto' }}>
            <h1 className="app-title text-center pt-4">Bangkit Expression</h1>
            <div className="container">
                <div className="row">
                    <div className="col-9">
                        <ExpChart data={validationData} />
                    </div>
                    <div className="col-3 legend-container">
                        {validationData.map((el, idx) => (
                            <p style={{
                                background: COLORS[idx],
                                color: 'white', fontWeight: idx === active ? 800 : 500,
                                width: idx === active ? '120%' : '100%',
                                lineHeight: idx === active ? '34px' : '26px'
                            }}
                                className="legend" key={idx}>
                                {el.name}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
            <Slider {...settings}>
                {expressionLabel.map((el, idx) => (
                    <div key={idx} className={`slider-slide${idx === active ? ' active-test' : ''}`}>
                        <div className="h3">
                            <div className="card">
                                <img className="card-img-top" src={`/${el}.webp`} alt="Card image cap" />
                                <div className="card-body">
                                    <Link href={`/expression-reviews/${el}`}><a className="btn btn-dark">See gallery</a></Link>
                                </div>
                            </div>
                        </div>
                    </div>))
                }
            </Slider>
            < BottomBar expressionLabel={expressionLabel[active]} active='home' loadingHome={loadingHome} loadingGallery={loadingGallery} setLoadingHome={() => setLoadingHome(true)} setLoadingGallery={() => setLoadingGallery(true)} loadingSelfie={loadingSelfie} setLoadingSelfie={() => setLoadingSeflie(true)} />
            <style jsx>{`
                    .app-title {
                        font-family: Muli, sans-serif;
                        font-size: 26px;
                        color: #2c3e50;
                        font-weight: 800;
                        margin-bottom: 15px;
                    }
                    .legend {
                        text-align: center;
                        padding: 0px;
                        margin: 5px 0px;
                        font-size: 14px;
                        font-family: Muli, sans-serif;
                        border-radius: 5px;
                    }
                    .legend-container {
                        top: 20px;
                        right: 24px;
                    }
                    .active-test .h3 {
                        background: #303952;
                        transition: 0.5s;
                        border-radius: 10px;
                        opacity: 1;
                    }
                    *:focus {
                        outline: 0 !important;
                        outline: none !important;
                    }
                    .h3 {
                        margin: 30px 10px 10px 10px;
                        padding: 2%;
                        position: relative;
                        text-align: center;
                    }
                    .slick-slide: {
                        margin-right: 1px;
                    }
                    .card {
                        border-radius: 10px;
                        opacity: 0.8;
                        transition-timing-function: ease;
                        border: 2px solid #303952;
                    }
                    .card-img-top {
                        margin-top: -1px;
                        background: #303952;
                        border-radius: 7px 7px 0 0;
                        padding: 0.2px;
                    }
                `}
            </style>
        </div>
    );
}

export default Mobile