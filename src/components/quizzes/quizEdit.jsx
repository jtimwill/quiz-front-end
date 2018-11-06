import React, { Component } from 'react';
import Joi from 'joi-browser';
import { updateQuiz, getQuiz } from '../../services/quizService.js';
import { getCategories } from '../../services/categoryService.js';

class QuizEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quiz: {
        id: "",
        title: "",
        description: "",
        difficulty: 0,
        category_id: ""
      },
      categories: [],
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  schema = {
    id: Joi.number(),
    title: Joi.string().required().min(3).label('Quiz Title'),
    description: Joi.string().min(3).label('Quiz Description'),
    difficulty: Joi.number().required().min(1).label('Difficulty'),
    category_id: Joi.string().required().label('Category')
  };

  async componentDidMount() {
    const { data: categories } = await getCategories();
    this.setState({ categories });

    const quiz_id = this.props.match.params.id;
    try {
      const { data } = await getQuiz(quiz_id);
      const quiz = {
        id: data.id,
        title: data.title,
        description: data.title,
        difficulty: data.difficulty,
        category_id: data.category_id.toString()
      };
      this.setState({ quiz });
    } catch (exception) {
      if (exception.response && exception.response.status === 404) {
        this.props.history.replace("/not-found");
      }
    }
  }

  validate() {
    const { error: errors } = Joi.validate(this.state.quiz, this.schema, { abortEarly: false });
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

    const quiz = { ...this.state.quiz };
    quiz[event.currentTarget.name] = event.currentTarget.value;

    this.setState({ quiz, errors });
  }

  async handleSubmit(event) {
    event.preventDefault();
    console.log("FANGS!");

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) {
      return;
    }

    try {
      await updateQuiz(this.state.quiz.id, this.state.quiz);
      this.props.history.push('/quizzes/index');
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
            <h4>Edit Quiz</h4>
            <div className="form-group">
              <label htmlFor="inlineFormInputTitle">Title</label>
              <input
                name="title"
                type="text"
                className="form-control"
                id="inlineFormInputTitle"
                value={this.state.quiz.title}
                onChange={this.handleChange}
              />
              {this.state.errors.title && <div className="alert alert-danger">{this.state.errors.title}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="inlineFormInputDescription">Description</label>
              <textarea
                name="description"
                type="text"
                className="form-control"
                id="inlineFormInputDescription"
                value={this.state.quiz.description}
                onChange={this.handleChange}
              />
              {this.state.errors.description && <div className="alert alert-danger">{this.state.errors.description}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="inputGroupSelect00">Difficulty</label>
              <select
                value={this.state.quiz.difficulty}
                name="difficulty"
                className="form-control"
                id="inputGroupSelect00"
                onChange={this.handleChange}
                >
                <option value=""/>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(difficulty => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty}
                  </option>
                ))}
              </select>
              {this.state.errors.difficulty && <div className="alert alert-danger">{this.state.errors.difficulty}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="inputGroupSelect01">Category</label>
              <select
                value={this.state.quiz.category_id}
                name="category_id"
                className="form-control"
                id="inputGroupSelect01"
                onChange={this.handleChange}
                >
                <option value=""/>
                {this.state.categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {this.state.errors.category_id && <div className="alert alert-danger">{this.state.errors.category_id}</div>}
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default QuizEdit;
