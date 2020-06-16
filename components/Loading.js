import dynamic from 'next/dynamic'
const BottomBar = dynamic(() => import('../components/BottomBar'))

const Loading = () => {
    return (
        <div>
            < BottomBar active="home" />
        </div>
    )
}

export default Loading