import React, { Component } from 'react';
import { saveUserQuiz } from '../../services/userQuizService.js';
import { getQuiz } from '../../services/quizService.js';
import { getCurrentUser } from '../../services/authService.js';

class UserQuizNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_quiz: {
        user_id: "",
        quiz_id: "",
        time: 0,
        user_answers: []
      },
      quiz: {
        questions: []
      },
      start_time: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    const quiz_id = this.getQueryParam("?quiId=", this.props.location.search);
    const { data: quiz } = await getQuiz(quiz_id);
    let user_quiz = { ...this.state.user_quiz };
    user_quiz.user_id = getCurrentUser().id.toString();
    user_quiz.quiz_id = quiz_id;

    for (let i = 0; i < quiz.questions.length; i++) {
      user_quiz.user_answers[i] = {
        question_id: quiz.questions[i].id,
        answer: ""
      }
    }

    const start_time = Date.now();
    this.setState({ quiz, user_quiz, start_time });
  }

  getQueryParam(param, search) {
    let id = search.split("");
    id.splice(0, param.length);
    return id.join("");
  }

  handleChange(event) {
    const user_quiz = { ...this.state.user_quiz };
    user_quiz.user_answers[event.currentTarget.name].answer = event.currentTarget.value;

    this.setState({ user_quiz });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const user_quiz = { ...this.state.user_quiz };
    user_quiz.time = (Date.now() - this.state.start_time)/1000;
    this.setState({ user_quiz });

    try {
      await saveUserQuiz(user_quiz);
      this.props.history.replace("/user-quizzes/index");
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
            <h4>Quiz Name: {this.state.quiz.title}</h4>
            {this.state.quiz.questions.map((question, index) => (
              <div key={question.id} className="form-group">
                <label htmlFor={"inlineFormInputTitle" + index}>{question.question}</label>
                <input
                  name={index}
                  type="text"
                  className="form-control"
                  id={"inlineFormInputTitle" + index}
                  onChange={this.handleChange}
                />
              </div>
            ))}
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default UserQuizNew;
