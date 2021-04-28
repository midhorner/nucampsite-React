import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

function RenderDirectoryItem({campsite}) {
  // campsite passed through as a prop from Directory then destructured
  return (
    <Card>
      <Link to={`/directory/${campsite.id}`}>
        {/* dynamic link created with vanilla js 'template literal' - whichever card is clicked on, it will create a link with that cards id */}
        <CardImg width="100%" src={baseUrl + campsite.image} alt={campsite.name} />
        <CardImgOverlay>
          <CardTitle>{campsite.name}</CardTitle>
        </CardImgOverlay>
      </Link>
    </Card>
  );
}

function Directory(props) {
  const directory = props.campsites.campsites.map(campsite => {
    return (
      <div key={campsite.id} className="col-md-5 m-1">
          <RenderDirectoryItem campsite={campsite} />
          {/* campsite is then passed to render function and used to display cards */}
      </div>
    );
  });
  if (props.campsites.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  }
  if (props.campsites.errMess) {
    return(
      <div className="row">
        <div className="col">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  }
  return(
    <div className="container">
      <div className="row">
        <div className="col">
          <Breadcrumb>
            <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
            <BreadcrumbItem active>Directory</BreadcrumbItem>
          </Breadcrumb>
          <h2>Directory</h2>
          <hr />
        </div>
      </div>
      <div className="row">
        {directory}
      </div>
    </div>
  );
}

export default Directory;