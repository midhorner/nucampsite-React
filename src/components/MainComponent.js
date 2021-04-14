import React, { Component } from 'react';
import Directory from './DirectoryComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent'
import Contact from './ContactComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import { Switch, Route, Redirect } from 'react-router-dom';
import { CAMPSITES } from '../shared/campsites';
import { COMMENTS} from '../shared/comments';
import { PARTNERS } from '../shared/partners';
import { PROMOTIONS } from '../shared/promotions';


class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campsites: CAMPSITES,
      comments: COMMENTS,
      partners: PARTNERS,
      promotions: PROMOTIONS
    };
  }

  render() {

    const HomePage = () => {
      // arrow function binds the function
      return(
        <Home 
          campsite={this.state.campsites.filter(campsite => campsite.featured)[0]}
          promotion={this.state.promotions.filter(promotion => promotion.featured)[0]}
          partner={this.state.partners.filter(partner => partner.featured)[0]}
          // state passed as props to separate components, then used to display info - see HomeComponent for details
        />
      );
    }

    const CampsiteWithId = ({match}) => {
      // arrow function binds the function
      // match is the object passed in as props from the Route component; it is now destructured and can be used in this function directly
      return(
      <CampsiteInfo 
        campsite={this.state.campsites.filter(campsite => campsite.id === +match.params.campsiteId)[0]} 
        comments={this.state.comments.filter(comment => comment.campsiteId === +match.params.campsiteId)}
      />
      // + converts numbers stored as strings back to a number; [0] grabs the object not the array
      );
    }

    return (
        <div>
            <Header />
            <Switch>
              <Route path='/home' component={HomePage} />
              <Route exact path='/directory' render={() => <Directory campsites={this.state.campsites} />} />
              {/* render method used in directory because state data is being passed - for a different way, see HomePage */}
              <Route path='/directory/:campsiteId' component={CampsiteWithId} />
              {/* the : in :campsiteId tells the router that what follows is a parameter which it takes and stores inside property campsiteId;
              The route component stores an object named 'match' in its state; match has an object as a property named 'params';
              campsiteId (or whatever follows the : ) gets stored as a property of the params object;
              the match object gets passed as a prop to the specified component automatically (CampsiteWithId) */}
              <Route exact path='/contactus' component={Contact} />
              <Redirect to='/home' />
            </Switch>
            <Footer />
        </div>
    );
  }
}

export default Main;
