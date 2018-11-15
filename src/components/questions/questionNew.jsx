import React, { Component } from 'react';
import Joi from 'joi-browser';
import { saveQuestion } from '../../services/questionService.js';

class QuestionNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: {
        question: "",
        answer: "",
      },
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  schema = {
    question: Joi.string().required().min(1).label('Question'),
    answer: Joi.string().required().min(1).label('Answer')
  };

  validate() {
    const { error: errors } = Joi.validate(
      this.state.question, this.schema, { abortEarly: false }
    );
    if (!errors) return null;

    const found_errors = {};
    for (let error of errors.details) {
      found_errors[error.path[0]] = error.message;
    }
    return found_errors;
  }

  validateProperty({ name, value }) {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  }

  handleChange(event) {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(event.currentTarget);
    if (errorMessage) {
      errors[event.currentTarget.name] = errorMessage;
    } else {
      delete errors[event.currentTarget.name];
    }

    const question = { ...this.state.question };
    question[event.currentTarget.name] = event.currentTarget.value;

    this.setState({ question, errors });
  }

  async handleSubmit(event) {
    const quiz_id = this.props.match.params.id;

    event.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) {
      return;
    }

    try {
      await saveQuestion(quiz_id, this.state.question);
      this.props.history.push(`/quizzes/${quiz_id}/show`);
    } catch (exception) {
      if (exception.response && exception.response.status === 400) {
        alert(exception.response.data.errors[0].message);
      }
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="card bg-light">
          <div className="card-body">
            <h5>New Question</h5>
            <div className="form-group">
              <label htmlFor="inlineFormInputQuestion">Question</label>
              <input
                name="question"
                type="text"
                className="form-control"
                id="inlineFormInputQuestion"
                onChange={this.handleChange}
              />
              {this.state.errors.question &&
                <div className="alert alert-danger">
                  {this.state.errors.question}
                </div>}
            </div>
            <div className="form-group">
              <label htmlFor="inlineFormInputAnswer">Answer</label>
              <input
                name="answer"
                type="text"
                className="form-control"
                id="inlineFormInputAnswer"
                onChange={this.handleChange}
              />
              {this.state.errors.answer &&
                <div className="alert alert-danger">
                  {this.state.errors.answer}
                </div>}
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default QuestionNew;
