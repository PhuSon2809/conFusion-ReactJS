import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
} from "reactstrap";

export function RenderDish({ dish }) {
  return (
    <div>
      <Card>
        <CardImg top src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle tag="h5">{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

export function RenderComments({ comments }) {
  const comment = comments.map((item) => {
    return (
      <div key={item.id}>
        <p>{item.comment}</p>
        <p>
          {item.author} {item.date}
        </p>
      </div>
    );
  });
  return (
    <div>
      <h2>Comments</h2>
      {comment}
    </div>
  );
}

class DishDetail extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.dish != null) {
      const dish = this.props.dish;
      const comments = this.props.comments;
      return (
        <div className="container">
          <div className="row">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/menu">Menu</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
              <h3>{dish.name}</h3>
              <hr />
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-5 m-1 mb-2">
              <RenderDish dish={dish} />
            </div>
            <div className="col-12 col-md-5 m-1">
              <RenderComments comments={comments} />
            </div>
          </div>
          <div className="row mb-5">
            <div className="col-12 ml-1">
              <Button color="primary">
                <Link to="/testfetch" className="nav-link text-white">Add new comment</Link>
              </Button>
            </div>
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default DishDetail;
