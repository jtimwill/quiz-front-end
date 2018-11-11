import React, { Component } from 'react';
import Joi from 'joi-browser';
import { updateQuestion, getQuestion } from '../../services/questionService.js';

class QuestionEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: {
        id: "",
        question: "",
        answer: "",
      },
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  schema = {
    id: Joi.number(),
    question: Joi.string().required().min(1).label('Question'),
    answer: Joi.string().required().min(1).label('Answer')
  };

  async componentDidMount() {
    const quiz_id = this.props.match.params.id;
    const question_id = this.props.match.params.questionId;
    try {
      const { data } = await getQuestion(quiz_id, question_id);
      const question = {
        id: data.id,
        question: data.question,
        answer: data.answer
      }
      this.setState({ question });
    } catch (exception) {
      if (exception.response && exception.response.status === 404) {
        this.props.history.replace("/not-found");
      }
    }
  }

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
      await updateQuestion(quiz_id, this.state.question.id, this.state.question);
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
            <h4>Edit Question</h4>
            <div className="form-group">
              <label htmlFor="inlineFormInputQuestion">Question</label>
              <input
                name="question"
                type="text"
                className="form-control"
                id="inlineFormInputQuestion"
                value={this.state.question.question}
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
                value={this.state.question.answer}
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

export default QuestionEdit;
