import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import { getQuizzes, deleteQuiz } from '../../services/quizService.js';
import { getCategories } from '../../services/categoryService.js';
import { getCurrentUser } from '../../services/authService';
import { compareDates } from '../../utilities/sortUtility.js';
import { findCategory } from '../../utilities/findUtility.js';
import './quiz.css';
import Pagination from '../reusable/pagination';
import Spinner from '../reusable/spinner';
import QuizHead from './quizHead'
import QuizBody from './quizBody';

class QuizIndex extends Component {
  state = {
    quizzes: [],
    categories: [],
    current_page: 1,
    sort_direction: "desc",
    current_quiz: {},
    api_response: false
  };

  async componentDidMount() {
    const { data: quizzes } = await getQuizzes();
    const { data: categories } = await getCategories();
    quizzes.sort(compareDates);
    this.setState({ quizzes, categories, api_response: true });
  }

  confirmDelete(name) {
    return window.confirm(`Are you sure you want to delete this ${name}?`);
  }

  handleQuizDelete = async selected_quiz => {
    if (!getCurrentUser().admin) {
      alert("Access Denied, Admin Only");
      return;
    }

    if (!this.confirmDelete("quiz")) { return; }
    const old_quizzes = this.state.quizzes;
    const new_quizzes = old_quizzes.filter(q => q.id !== selected_quiz.id);

    this.setState({ quizzes: new_quizzes });

    try {
      await deleteQuiz(selected_quiz.id);
    } catch (exception) {
      if (exception.response && exception.response.status === 404) {
        alert("This quiz has already been deleted.");
      }
      this.setState({ quizzes: old_quizzes });
    }
  };

  handlePageChange = (page_number, page_size) => {
    const length = this.state.quizzes.length;
    const number_of_pages = Math.ceil(length / page_size);
    if (page_number <= 0 ||  page_number > number_of_pages) {
      return;
    }
    this.setState({ current_page: page_number });
  };

  toggleSort = () => {
    const old_direction = this.state.sort_direction;
    const quizzes = [ ...this.state.quizzes ];
    quizzes.reverse();
    let sort_direction;
    sort_direction = old_direction === "desc" ? "asc" : "desc";

    this.setState({ quizzes, sort_direction });
  }

  generatePage(page, page_size) {
    let quizzes = [ ...this.state.quizzes ];
    const start_index = (page-1)*page_size;
    const end_index = start_index + page_size;
    const quiz_slice = quizzes.slice(start_index,end_index);
    return quiz_slice;
  }

  handleQuizSelect = quiz => {
    if (quiz === this.state.current_quiz) {
      quiz = {};
    }
    this.setState({ current_quiz: quiz });
  }

  render() {
    const page_size = 5;
    const { sort_direction,
            current_page,
            current_quiz,
            quizzes,
            categories
          } = this.state;

    return (
      <Spinner ready={this.state.api_response}>
        <h4>
          {current_quiz.title ?
            `Selected Quiz: ${current_quiz.title}` :
            `Select a Quiz`}
        </h4>

        <Link to="/quizzes/new" className="btn btn-primary mr-1">
          New Quiz
        </Link>
        <button onClick={this.toggleSort} className="btn btn-info btn-sm">
          {"date "}
          <i className={"fa fa-sort-" + sort_direction}></i>
        </button>

        {this.generatePage(current_page, page_size).map((quiz, index) => (
          <div
            key={quiz.id}
            className={"my-1 card " + (quiz === current_quiz ? "border-primary" : "")}
          >
            <QuizHead
              quiz={quiz}
              onQuizSelect={this.handleQuizSelect}
              onQuizDelete={this.handleQuizDelete}
            />

            <QuizBody
              quiz={quiz}
              current_quiz={current_quiz}
              index={index}
              category={findCategory(quiz.category_id, categories)}
            />
          </div>
        ))}

        <Pagination
          page_size={page_size}
          item_count={quizzes.length}
          current_page={current_page}
          onPageChange={this.handlePageChange}
        />
      </Spinner>
    );
  }
}

export default QuizIndex;
