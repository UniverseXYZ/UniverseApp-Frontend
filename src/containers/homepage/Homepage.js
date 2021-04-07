import About from '../../components/homepage/About';
import '../../components/homepage/Homepage.scss';
import Welcome from "../../components/homepage/Welcome"

const Homepage = () => {
    return (
        <div className='homepage'>
            <Welcome />
            <About />
        </div>
    )
}

export default Homepage;