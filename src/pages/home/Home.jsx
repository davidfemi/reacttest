import Featured from "../../components/featured/Featured"
import FeaturedListing from "../../components/featuredListing/FeaturedListing"
import Footer from "../../components/footer/Footer"
import Header from "../../components/header/Header"
import MailList from "../../components/mailList/MailList"
import PropertyList from "../../components/propertyList/PropertyList"
import { useAuth } from "../../context/AuthContext"
import "./home.css"

const Home = () => {
    const { user } = useAuth();

    return (
        <div>
            <Header />
            <div className="homeContainer">
                {user && (
                    <div className="personalizedSection">
                        <h2>Welcome back to your journey, {user.name}</h2>
                        <div className="personalizedStats">
                            <div className="statItem">
                                <span className="statNumber">2</span>
                                <span className="statLabel">Saved properties</span>
                            </div>
                            <div className="statItem">
                                <span className="statNumber">120</span>
                                <span className="statLabel">Genius points</span>
                            </div>
                            <div className="statItem">
                                <span className="statNumber">3</span>
                                <span className="statLabel">Past trips</span>
                            </div>
                        </div>
                    </div>
                )}
                
                <Featured />
                <h1 className="homeTitle">
                    Browse by property type
                </h1>
                <PropertyList />
                <h1 className="homeTitle">{user ? 'Recommended for you' : 'Homes guests love'}</h1>
                <FeaturedListing />
                <MailList />
                <Footer />
            </div>
        </div>
    )
}

export default Home
