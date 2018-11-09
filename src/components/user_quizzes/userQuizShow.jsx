import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import { getQuiz } from '../../services/quizService.js';
import { getUserQuizzes } from '../../services/userQuizService.js';
import { compareDates } from '../../utilities/sortUtility.js';
import { findCategory } from '../../utilities/findUtility.js';
import { reformatDate } from '../../utilities/dateUtility.js';
import './user_quiz.css';
import Pagination from '../reusable/pagination';
import Spinner from '../reusable/spinner';
import {Line} from 'react-chartjs-2';

class UserQuizShow extends Component {
  state = {
    quiz: {},
    user_quizzes: [],
    current_page: 1,
    sort_direction: "desc",
    current_user_quiz: {},
    api_response: false
  };

  data = {
    labels: [],
    datasets: [
      {
        label: 'Quiz Scores',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: []
      }
    ]
  };

  async componentDidMount() {
    const quiz_id = this.props.match.params.id;
    let { data: user_quizzes } = await getUserQuizzes();
    user_quizzes = user_quizzes.filter(uq => uq.quiz_id === Number(quiz_id));

    user_quizzes.sort(compareDates);
    this.setState({ user_quizzes, api_response: true });
    user_quizzes.forEach((user_quiz) => {
      this.data.labels.push(reformatDate(user_quiz.created_at));
      this.data.datasets[0].data.push(this.reformatScore(user_quiz.score));
    })

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

  handlePageChange = (page_number, page_size) => {
    const length = this.state.user_quizzes.length;
    const number_of_pages = Math.ceil(length / page_size);
    if (page_number <= 0 ||  page_number > number_of_pages) {
      return;
    }
    this.setState({ current_page: page_number });
  };

  toggleSort = () => {
    const old_direction = this.state.sort_direction;
    const user_quizzes = [ ...this.state.user_quizzes ];
    user_quizzes.reverse();
    let sort_direction;
    sort_direction = old_direction === "desc" ? "asc" : "desc";

    this.setState({ user_quizzes, sort_direction });
  }

  generatePage(page, page_size) {
    let user_quizzes = [ ...this.state.user_quizzes ];
    const start_index = (page-1)*page_size;
    const end_index = start_index + page_size;
    const user_quiz_slice = user_quizzes.slice(start_index,end_index);
    return user_quiz_slice;
  }

  handleUserQuizSelect = user_quiz => {
    if (user_quiz === this.state.current_user_quiz) {
      user_quiz = {};
    }
    this.setState({ current_user_quiz: user_quiz });
  }

  reformatScore(score) {
    return (score*100).toPrecision(3);
  }


  render() {
    const page_size = 5;
    const { sort_direction,
            current_page,
            user_quizzes,
            quiz,
            current_user_quiz
          } = this.state;

    return (
      <Spinner ready={this.state.api_response}>
        <h4>Quiz: {quiz.title}</h4>

        <div>
          <Line data={this.data} />
        </div>

        <h4>Attempts: {user_quizzes.length}</h4>
        <button onClick={this.toggleSort} className="btn btn-info btn-sm">
          {"Sort by date "}
          <i className={"fa fa-sort-" + sort_direction}></i>
        </button>

        {this.generatePage(current_page, page_size).map((user_quiz, index) => (
          <div key={user_quiz.id} className={"my-1 card " + (user_quiz === current_user_quiz ? "border-primary" : "")}>
            <div className="card-header custom-hover-cursor" onClick={() => this.handleUserQuizSelect(user_quiz)}>
              <div className="">
                <span className="font-weight-bold">Date: {reformatDate(user_quiz.created_at)} </span>
                <div className="float-right">
                  <span className="font-weight-bold">Score: {this.reformatScore(user_quiz.score) + "%"} </span>
                  <span className="font-weight-bold">Time: {user_quiz.time} </span>
                </div>
              </div>
              <div className={user_quiz === current_user_quiz ? "custom-show" : "custom-hide-2"}>
                <div className="card-body">
                  <h5 className="card-title">Description: </h5>
                  <ul className="list-group list-group-flush">
                    {user_quiz.user_answers.map(user_answer => (
                      <li key={user_answer.id} className="list-group-item">
                        Your Answer: "{user_answer.answer}" Correct: {user_answer.correct.toString()}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}

        <Pagination
          page_size={page_size}
          item_count={user_quizzes.length}
          current_page={current_page}
          onPageChange={this.handlePageChange}
        />
      </Spinner>
    );
  }
}

export default UserQuizShow;
