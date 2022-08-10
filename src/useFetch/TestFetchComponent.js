import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { baseUrl } from "../shared/baseUrl";

export function RenderComments({ comments }) {
  const comment = comments.map((item) => {
    return (
      <div>
        <h6>{"id: " + item.id + " rating: " + item.rating}</h6>
        <p>{item.comment}</p>
        <p>
          {item.author}
          {item.data}
        </p>
      </div>
    );
  });
  return (
    <div className="col-12 col-sm-7">
      <h2>Commnets</h2>
      {comment}
    </div>
  );
}

class TestFetchComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: [],
      comments: [],
      id: -1,
      dishId: -1,
      rating: 1,
      comment: "",
      author: "",
      data: new Date(),
    };
    this.fetchDishes();
    this.fetchComponent();

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  fetchDishes() {
    return fetch(baseUrl + "dishes")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ dishes: data });
      });
  }

  fetchComponent() {
    return fetch(baseUrl + "comments")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ comments: data });
      });
  }

  handleInputChange(event) {
    const nameControl = event.target.name;
    const value = event.target.value;
    this.setState({ [nameControl]: value });
    console.log(nameControl + "," + value);
  }

  handleSubmit(dish) {
    const newComment = {
      id: this.state.comments.length,
      dishId: dish.id,
      rating: this.state.rating,
      author: this.state.author,
      comment: this.state.comment,
      date: this.state.date,
    };
    console.log(newComment);
    console.log(newComment.date.toString());
    this.addComment(newComment);
  }

  addComment(newComment) {
    return fetch(baseUrl + "comments", {
      method: "POST",
      body: JSON.stringify(newComment),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    }).then((response) => {
      if (response.ok) {
        console.log(response);
        this.setState({ comments: this.state.comments.concat(newComment) });
      }
    });
  }

  render() {
    const content = this.state.dishes.map((dish) => {
      return (
        <div className="row">
          <div className="col-12 col-sm-3" key={dish.id}>
            <Card>
              <CardImg top src={baseUrl + dish.image} alt={dish.name} />
              <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
              </CardBody>
            </Card>
          </div>
          <div className="col-12 col-sm-5" key={dish.id}>
            <h4>Comments</h4>
            <RenderComments
              comments={this.state.comments.filter(
                (comment) => comment.dishId === parseInt(dish.id, 10)
              )}
            />
          </div>
          <div className="col-12 col-sm-4" key={dish.id}>
            <h4>Your Comments</h4>
            <Form>
              <FormGroup>
                <Label for="author">Author: </Label>
                <Input
                  type="text"
                  id="author"
                  name="author"
                  placeholder="author"
                  value={this.state.author}
                  onChange={this.handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="comment">Comment: </Label>
                <Input
                  type="text"
                  id="comment"
                  name="comment"
                  placeholder="comment"
                  value={this.state.comment}
                  onChange={this.handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="rating">Rating: </Label>
                <Input
                  type="number"
                  id="rating"
                  name="rating"
                  placeholder="rating"
                  value={this.state.rating}
                  min="1"
                  max="5"
                  onChange={this.handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Button onClick={this.handleSubmit.bind(this, dish)}>
                  Submit
                </Button>
              </FormGroup>
            </Form>
          </div>
        </div>
      );
    });

    return <div className="col-12">{content}</div>;
  }
}

export default TestFetchComponent;
