import React, { Component } from 'react';
import { saveUserQuiz } from '../../services/userQuizService.js';
import { getQuiz } from '../../services/quizService.js';
import { getCurrentUser } from '../../services/authService.js';
import GenericQuiz from '../reusable/genericQuiz';
import MusicQuiz from '../reusable/musicQuiz';
import MuscleQuiz from '../reusable/muscleQuiz';

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
      start_time: 0,
      question_index: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
  }

  async componentDidMount() {
    const quiz_id = this.getQueryParam("?quizId=", this.props.location.search);
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
    const value = event.currentTarget.value;
    const user_quiz = { ...this.state.user_quiz };
    user_quiz.user_answers[event.currentTarget.name].answer = value;

    this.setState({ user_quiz });
  }

  handleAnswer(user_answer) {
    let user_quiz = { ...this.state.user_quiz };
    let question_index = this.state.question_index;
    user_quiz.user_answers[question_index].answer = user_answer;
    this.setState({ user_quiz });
    question_index++;
    if (question_index === this.state.quiz.questions.length) {
      this.handleSubmit();
    } else {
      this.setState({ question_index });
    }
  }

  async handleSubmit(event) {
    if (event) { event.preventDefault(); }
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
    const { quiz, question_index } = this.state;

    return (
      <div>
        {quiz.category_id === 1 && (
          <MusicQuiz
            question={quiz.questions[question_index].question}
            onAnswer={this.handleAnswer}
          />
        )}
        {quiz.category_id === 2 && (
          <MuscleQuiz
            question={quiz.questions[question_index].question}
            onAnswer={this.handleAnswer}
          />
        )}
        {quiz.category_id > 2 && (
          <GenericQuiz
            quiz={this.state.quiz}
            onFormSubmit={this.handleSubmit}
            onInputChange={this.handleChange}
          />
        )}
      </div>
    );
  }
}

export default UserQuizNew;
