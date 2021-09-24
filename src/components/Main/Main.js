import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AbouteProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';

const Main = () => {
   return (
      <main className="main__container">
            <Promo />
            <AboutProject />
            <Techs />
            <AboutMe />
            <Portfolio />
      </main>
      
   )
}

export default Main;