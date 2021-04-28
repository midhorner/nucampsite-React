import React, { Component } from 'react';
import Directory from './DirectoryComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent'
import Contact from './ContactComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import About from './AboutComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { postComment, fetchCampsites, fetchComments, fetchPromotions } from '../redux/ActionCreators';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
  return{
    campsites: state.campsites,
    comments: state.comments,
    partners: state.partners,
    promotions: state.promotions
  }
}

const mapDispatchToProps = {
  postComment: (campsiteId, rating, author, text) => (postComment(campsiteId, rating, author, text)),
  fetchCampsites: () => (fetchCampsites()),
  resetFeedbackForm: () => (actions.reset('feedbackForm')),
  fetchComments: () => (fetchComments()),
  fetchPromotions: () => (fetchPromotions())
};

class Main extends Component {

  componentDidMount() {
    this.props.fetchCampsites();
    this.props.fetchComments();
    this.props.fetchPromotions();
  }
  
  render() {

    const HomePage = () => {
      // arrow function binds the function-inherits 'this' of parent scope
      return(
        <Home 
          campsite={this.props.campsites.campsites.filter(campsite => campsite.featured)[0]}
          // the featured campsite object [0]index is pulled from the new array (remember filter makes a new array)
          campsitesLoading={this.props.campsites.isLoading}
          campsitesErrMess={this.props.campsites.errMess}
          promotion={this.props.promotions.promotions.filter(promotion => promotion.featured)[0]}
          promotionLoading={this.props.promotions.isLoading}
          promotionErrMess={this.props.promotions.errMess}
          partner={this.props.partners.filter(partner => partner.featured)[0]}
          // state passed from reducer as props to separate components, then used to display info - see HomeComponent for details
        />
      );
    }

    const CampsiteWithId = ({match}) => {
      // arrow function binds the function
      // match is the object passed in as props from the Route component; it is now destructured and can be used in this function directly
      return(
      <CampsiteInfo 
        campsite={this.props.campsites.campsites.filter(campsite => campsite.id === +match.params.campsiteId)[0]}
        isLoading={this.props.campsites.isLoading}
        errMess={this.props.campsites.errMess}
        comments={this.props.comments.comments.filter(comment => comment.campsiteId === +match.params.campsiteId)}
        commentsErrMess={this.props.comments.errMess}
        postComment={this.props.postComment}
      />
      // + converts numbers stored as strings back to a number; [0] grabs the object not the array
      );
    }

    return (
        <>
            <Header />
              <TransitionGroup>
                <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                  {/* key is provided by routes */}
                  <Switch>
                    <Route path='/home' component={HomePage} />
                    {/* the 'component' attribute tells the route which component to render - used when the component you are routing to does not require state data */}
                    <Route exact path='/directory' render={() => <Directory campsites={this.props.campsites} />} />
                    {/* 'render method' used in directory because state data is being passed - for a different way, see HomePage */}
                    <Route path='/directory/:campsiteId' component={CampsiteWithId} />
                    {/* the : in :campsiteId tells the router that what follows is a parameter which it takes and stores inside the property campsiteId; The route component stores an object named 'match' in its state; match has an object as a property named 'params';
                    campsiteId (or whatever follows the : ) gets stored as a property of the params object; the match object gets passed as a prop to the specified component automatically (CampsiteWithId) */}
                    <Route exact path='/aboutus' render={() => <About partners={this.props.partners} />} />
                    <Route exact path='/contactus' render={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
                    <Redirect to='/home' />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            <Footer />
        </>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
