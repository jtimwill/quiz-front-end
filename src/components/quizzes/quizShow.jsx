import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getQuiz } from '../../services/quizService.js';
import { getCategories } from '../../services/categoryService.js';
import { deleteQuestion } from '../../services/questionService.js';
import { getCurrentUser } from '../../services/authService';
import { findCategory } from '../../utilities/findUtility.js';

class QuizShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quiz: {
        id: "",
        title: "",
        description: "",
        difficulty: 0,
        category_id: "",
        questions: []
      },
      categories: []
    };
  }

  async componentDidMount() {
    const quiz_id = this.props.match.params.id;
    const { data: categories } = await getCategories();
    this.setState({ categories });

    try {
      const { data: quiz } = await getQuiz(quiz_id);
      this.setState({ quiz });
    } catch (exception) {
      if (exception.response && exception.response.status === 404) {
        console.log(exception);
        this.props.history.replace("/not-found");
      }
    }
  }

  async handleDelete(selected_question) {
    if (!getCurrentUser().admin) {
      alert("Access Denied, Admin Only");
      return;
    }
    const old_questions = this.state.quiz.questions;
    const new_questions = old_questions.filter(question => {
      return question.id !== selected_question.id;
    });
    let quiz = { ...this.state.quiz };
    quiz.questions = new_questions;
    this.setState({ quiz });

    try {
      await deleteQuestion(this.state.quiz.id, selected_question.id);
    } catch (exception) {
      if (exception.response && exception.response.status === 404) {
        alert("This question has already been deleted.");
      }
      quiz.questions = old_questions;
      this.setState({ quiz });
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm">
            <h4 className="text-capitalize">
              <p>Title: {this.state.quiz.title}</p>
              <p>Description: {this.state.quiz.description}</p>
              <p>Difficulty: {this.state.quiz.difficulty}</p>
              <p>Category: {findCategory(this.state.quiz.category_id, this.state.categories)}</p>
              <p>Questions: {this.state.quiz.questions.length}</p>
            </h4>
          </div>
          <div className="col-sm">
            <table className="table table-sm table-bordered">
              <thead>
                <tr>
                  <th scope="col">Question</th>
                  <th scope="col">Answer</th>
                  <th scope="col" colSpan="2">
                    <Link
                      to={"/quizzes/" + this.state.quiz.id + "/questions/new"}
                      className="btn btn-primary">
                      New Question
                    </Link>
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.state.quiz.questions.map(question => (
                  <tr key={question.id}>
                    <td>{question.question}</td>
                    <td>{question.answer}</td>
                    <td>
                      <Link
                        to={"/quizzes/" + this.state.quiz.id + "/questions/" + question.id + "/edit"}
                        className="btn btn-info btn-sm">
                        Edit
                      </Link>
                    </td>
                    <td>
                      <button
                        onClick={() => this.handleDelete(question)}
                        className="btn btn-danger btn-sm">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default QuizShow;
