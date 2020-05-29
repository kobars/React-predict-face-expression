import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Bangkit Face Expression Prediction</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container pt-1 pb-5">
        <h1 className="text-center">Bangkit</h1>
        <h3 className="text-center">Face Expression Prediction</h3>
        <div className="row">
          <div className="col-md-6 mt-3">
            <Link href="/selfie">
              <div className="card" style={{ width: "310px" }}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQWXeJWmy6sJc1iFdy54jbsnSZvPkCFVY2MX7FakIjtOU9dqFai&usqp=CAU" className="card-img-top" alt="selfie" width="256px" height="256px" />
                <a className="btn btn-info text-white">Take Selfie</a>
              </div>
            </Link>
          </div>
          <div className="col-md-6 mt-3">
            <Link href="/galery">
              <div className="card" style={{ width: "310px" }}>
                <img src="https://cdn.icon-icons.com/icons2/1551/PNG/512/if-traveling-icon-flat-outline15-3405105_107384.png" className="card-img-top" alt="galery" width="256px" height="256px" />
                <a className="btn btn-info text-white">From files / gallery</a>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
