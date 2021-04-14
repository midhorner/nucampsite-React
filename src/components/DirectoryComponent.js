import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';

function RenderDirectoryItem({campsite}) {
  // campsite passed through as a prop from Directory then destructured
  return (
    <Card>
      <CardImg width="100%" src={campsite.image} alt={campsite.name} />
      <CardImgOverlay>
        <CardTitle>{campsite.name}</CardTitle>
      </CardImgOverlay>
    </Card>
  );
}

function Directory(props) {
  const directory = props.campsites.map(campsite => {
    return (
      <div key={campsite.id} className="col-md-5 m-1">
          <RenderDirectoryItem campsite={campsite} />
          {/* campsite is then passed to render function and used to display cards */}
      </div>
    );
  });

  return(
    <div className="container">
      <div className="row">
        {directory}
      </div>
    </div>
  );
}

export default Directory;