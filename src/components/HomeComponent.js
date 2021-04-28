import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform } from 'react-animation-components';

function RenderCard({item, isLoading, errMess}) {
  // item passed through as a prop from home then destructured - destructuring makes it so we don't have to keep typing 'props.item'
  if (isLoading) {
    return <Loading />;
  }
  if (errMess) {
    return <h4>{errMess}</h4>
  }
  return(
    <FadeTransform in transformProps={{exitTransform: 'scale(0.5) translateY(50%)'}}>
      <Card>
        <CardImg src={baseUrl + item.image} alt={item.name} />
        <CardBody>
          <CardTitle>{item.name}</CardTitle>
          <CardText>{item.description}</CardText>
        </CardBody>
      </Card>
    </FadeTransform>
  );
}

function Home(props) {
  // props passed from main and used as props for display component RenderCard
  return (
    <div className="container">
      <div className="row">
        <div className="col-md m-1">
          <RenderCard
            item={props.campsite}
            isLoading={props.campsitesLoading}
            errMess={props.campsitesErrMess} 
          />         
        </div>
        <div className="col-md m-1">
          <RenderCard
            item={props.promotion}
            isLoading={props.promotionLoading}
            errMess={props.promotionErrMess}          
          />
        </div>
        <div className="col-md m-1">
          <RenderCard item={props.partner} />
        </div>
      </div>
    </div>
  );
}

export default Home;