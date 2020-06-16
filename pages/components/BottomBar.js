import Link from 'next/link'

const BottomBar = ({ active, loadingHome, loadingGallery, loadingSelfie, setLoadingHome, setLoadingGallery, expressionLabel, setLoadingSelfie }) => {
    const allLoading = loadingGallery || loadingSelfie || loadingHome
    return (
        <div className="bottom-appbar">
            <div className="tabs">
                <Link href="/mobile">
                    <div className={`tab${active === 'home' ? ' is-active' : ''} tab--left`} onClick={active === 'home' || allLoading ? null : setLoadingHome}>
                        {loadingHome ? <i className="fa fa-spinner fa-spin"></i> : <i className="fas fa-home"></i>}
                        {!loadingHome ? <span>Home</span> : null}
                    </div>
                </Link>
                <Link href="/selfie">
                    <div className="tab tab--fab" aria-hidden onClick={active === 'selfie' || allLoading ? null : setLoadingSelfie}>
                        <div className="top">
                            <div className="fab" aria-hidden style={{ backgroundColor: active === 'selfie' ? '#2c3e50' : '' }}>
                                {loadingSelfie ? <i className="fa fa-spinner fa-spin"></i> : <i className="fas fa-record-vinyl" ></i>}
                            </div>
                        </div>
                    </div>
                </Link>
                <Link href={`/expression-reviews/${expressionLabel}`}>
                    <div className={`tab${active === 'gallery' ? ' is-active' : ''} tab--right`} onClick={active === 'gallery' || allLoading ? null : setLoadingGallery}>
                        {loadingGallery ? <i className="fa fa-spinner fa-spin"></i> : <i className="fas fa-photo-video"></i>}
                        {!loadingGallery ? <span>Gallery</span> : null}
                    </div>
                </Link>
            </div>
            <style jsx>{`
                .bottom-appbar {
                    height: 70px;
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    z-index: 20;
                }
                .bottom-appbar .tabs {
                    display: flex;
                    flex-direction: row;
                    height: 100%;
                }
                .bottom-appbar .tabs .tab {
                    background-color: #fff;
                    width: 33.4%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    border-top: 1px solid #eee;
                    box-shadow: 1x 1x 3px #ccc, -1px -1px 3px #ccc;
                    font-size: 24px;
                }
                .bottom-appbar .tabs .tab--left {
                    width: 100%;
                    border-top-right-radius: 30px;
                    -webkit-box-shadow: 0px -4px 5px 0px rgba(242,242,242,1);
                    -moz-box-shadow: 0px -4px 5px 0px rgba(242,242,242,1);
                    box-shadow: 0px -4px 5px 0px rgba(242,242,242,1);
                }
                .bottom-appbar .tabs .tab--right {
                    width: 100%;
                    border-top-left-radius: 30px;
                    -webkit-box-shadow: 15px 4px 15px 0px rgba(23, 23, 23, 0.28);
                    -moz-box-shadow: 15px 4px 15px 0px rgba(23, 23, 23, 0.28);
                    box-shadow: 15px 4px 15px 0px rgba(23, 23, 23, 0.28);
                }
                .bottom-appbar .tabs .tab--fab {
                    width: 180px;
                    height: 100%;
                    background: transparent;
                    border: none;
                    display: flex;
                }
                .bottom-appbar .tabs .tab--fab .top {
                    width: 100%;
                    height: 50%;
                    border-bottom-left-radius: 100px;
                    border-bottom-right-radius: 100px;
                    background-color: transparent;
                    box-shadow: 0px 30px 0px 25px #fff;
                    display: flex;
                }
                .bottom-appbar .tabs .tab span {
                    font-size: 12px;
                    color: #d2dae2;
                }
                .bottom-appbar .tabs .tab i {
                    font-size: 24px;
                }
                .bottom-appbar .tabs .tab {
                    color: #d2dae2;
                    font-family: Muli, sans-serif;
                    font-weight: 700;
                }
                .bottom-appbar .tabs .tab.is-active {
                    color: #2c3e50;
                }
                .bottom-appbar .tabs .tab.is-active span {
                    color: #2c3e50;
                }
                .bottom-appbar .tabs .fab {
                    border-radius: 50%;
                    background-color: #d2dae2;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 70px;
                    height: 70px;
                    font-weight: bold;
                    font-size: 22px;
                    color: #fff;
                    position: relative;
                    justify-content: center;
                    transform: translate(2px, -60%);
                }
            `}</style>
        </div>
    )
}


export default BottomBar