import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import { getQuiz } from '../../services/quizService.js';
import { getUserQuizzes } from '../../services/userQuizService.js';
import { compareDates } from '../../utilities/sortUtility.js';
import { reformatDate } from '../../utilities/dateUtility.js';
import { reformatScore } from '../../utilities/scoreUtility.js';
import Pagination from '../reusable/pagination';
import Spinner from '../reusable/spinner';
import { Line } from 'react-chartjs-2';

class UserQuizShow extends Component {
  state = {
    quiz: {},
    user_quizzes: [],
    current_page: 1,
    sort_direction: "desc",
    current_user_quiz: { user_answers: []},
    api_response: false,
    show_modal: false
  };

  chart_data = {
    labels: [],
    datasets: [
      {
        label: 'Quiz Scores',
        fill: false,
        lineTension: 0.2,
        backgroundColor: 'rgb(0,123,255,0.2)',
        borderColor: 'rgb(0,123,255,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgb(0,123,255,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 3,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: 'rgb(0,123,255,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 3,
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
      this.chart_data.labels.push(reformatDate(user_quiz.created_at));
      this.chart_data.datasets[0].data.push(reformatScore(user_quiz.score));
    })
    this.chart_data.datasets[0].data.reverse();

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
    const show_modal = !this.state.show_modal;
    if (user_quiz === this.state.current_user_quiz) {
      user_quiz = { user_answers: [] };
    }
    this.setState({ current_user_quiz: user_quiz, show_modal });
  }

  hideModal = () => {
    this.setState({ show_modal: false });
  }

  render() {
    const page_size = 5;
    const { sort_direction,
            current_page,
            user_quizzes,
            quiz,
            current_user_quiz,
            show_modal
          } = this.state;
    return (
      <Spinner ready={this.state.api_response}>
        <div className="card my-2">
          <div className="card-header bg-light">
            <h5 className="card-title">Quiz: {quiz.title}</h5>
          </div>
          <div className="card-body">
            <Line data={this.chart_data}/>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="card-text font-weight-bold">Attempts: </span>
              {user_quizzes.length}
            </li>
          </ul>
          <div className="card-body">
            <Link
              to={`/user-quizzes/new?quizId=${quiz.id}`}
              className="btn btn-lg btn-primary"
            >
              Try Again
            </Link>
          </div>
        </div>
        <div className={show_modal ? "custom-modal" : "custom-modal-hide"}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Your Answers:</h5>
                <button
                  type="button"
                  className="close"
                  onClick={this.hideModal}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <ul className="list-group list-group-flush">
                  {current_user_quiz.user_answers.map((user_answer, index) => (
                    <li key={user_answer.id} className="list-group-item">
                      Q{index} Answer: "{user_answer.answer}"
                      {user_answer.correct ? " (Right)" : " (Wrong)"}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={this.hideModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        <table className="table table-hover table-bordered">
          <thead>
            <tr>
              <th scope="col" >#</th>
              <th
                scope="col"
                onClick={this.toggleSort}
                className="custom-hover"
              >
                Date <i className={"fa fa-sort-" + sort_direction}></i>
              </th>
              <th scope="col">Score</th>
              <th scope="col">Time (sec)</th>
            </tr>
          </thead>
          <tbody>
            {this.generatePage(current_page, page_size).map((user_quiz, index) => (
              <tr
                key={user_quiz.id}
                className="custom-hover"
                onClick={() => this.handleUserQuizSelect(user_quiz)}
              >
                <th scope="row">{index}</th>
                <td>{reformatDate(user_quiz.created_at)}</td>
                <td>{reformatScore(user_quiz.score) + "%"}</td>
                <td>{user_quiz.time.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
