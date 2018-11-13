import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import { getQuizzes } from '../../services/quizService.js';
import { getUserQuizzes } from '../../services/userQuizService.js';
import { compareDates } from '../../utilities/sortUtility.js';
import { reformatDate } from '../../utilities/dateUtility.js';
import { reformatScore } from '../../utilities/scoreUtility.js';
import Pagination from '../reusable/pagination';
import Spinner from '../reusable/spinner';

class UserQuizIndex extends Component {
  state = {
    grouped_user_quizzes: [],
    current_page: 1,
    sort_direction: "desc",
    api_response: false
  };

  async componentDidMount() {
    const { data: user_quizzes } = await getUserQuizzes();
    const { data: quizzes } = await getQuizzes();
    const grouped_user_quizzes = this.groupUserQuizzes(quizzes, user_quizzes);
    grouped_user_quizzes.sort(compareDates);
    this.setState({ grouped_user_quizzes, api_response: true });
  }

  groupUserQuizzes(quizzes, user_quizzes) {
    let quiz_titles = {};
    let grouped_user_quizzes = {};
    let grouped_user_quizzes_array = [];

    quizzes.forEach(quiz => quiz_titles[quiz.id] = quiz.title );

    for (let i = 0, length = user_quizzes.length; i < length; i++) {
      let quiz_id = user_quizzes[i].quiz_id;
      if (!grouped_user_quizzes[quiz_id]) {
        grouped_user_quizzes[quiz_id] = {
          id: quiz_id,
          title: quiz_titles[quiz_id],
          attempts: 1,
          last_score: user_quizzes[i].score,
          created_at: user_quizzes[i].created_at
        }
      } else {
        grouped_user_quizzes[quiz_id].attempts++;
        if (grouped_user_quizzes[quiz_id].created_at < user_quizzes[i].created_at) {
          grouped_user_quizzes[quiz_id].last_score = user_quizzes[i].score;
          grouped_user_quizzes[quiz_id].created_at = user_quizzes[i].created_at;
        }
      }
    }

    for (let i in grouped_user_quizzes) {
      grouped_user_quizzes_array.push(grouped_user_quizzes[i]);
    }
    return grouped_user_quizzes_array;
  }

  handlePageChange = (page_number, page_size) => {
    const length = this.state.grouped_user_quizzes.length;
    const number_of_pages = Math.ceil(length / page_size);
    if (page_number <= 0 ||  page_number > number_of_pages) {
      return;
    }
    this.setState({ current_page: page_number });
  };

  toggleSort = () => {
    const old_direction = this.state.sort_direction;
    const grouped_user_quizzes = [ ...this.state.grouped_user_quizzes ];
    grouped_user_quizzes.reverse();
    let sort_direction;
    sort_direction = old_direction === "desc" ? "asc" : "desc";

    this.setState({ grouped_user_quizzes, sort_direction });
  }

  generatePage(page, page_size) {
    let grouped_user_quizzes = [ ...this.state.grouped_user_quizzes ];
    const start_index = (page-1)*page_size;
    const end_index = start_index + page_size;
    const user_quiz_slice = grouped_user_quizzes.slice(start_index,end_index);
    return user_quiz_slice;
  }

  render() {
    const page_size = 3;
    const { sort_direction,
            current_page,
            grouped_user_quizzes
          } = this.state;

    return (
      <Spinner ready={this.state.api_response}>
        <h5>Select A Quiz</h5>
        <button onClick={this.toggleSort} className="btn btn-info btn-sm my-1">
          {"Sort by date "}
          <i className={"fa fa-sort-" + sort_direction}></i>
        </button>

          {this.generatePage(current_page, page_size).map((user_quiz) => (
            <div key={user_quiz.id} className="list-group">
              <Link
                to={`/user-quizzes/${user_quiz.id}/show`}
                className="list-group-item list-group-item-action"
              >
                <h5 className="mb-1">{user_quiz.title}</h5>
                <p className="mb-1">Times attempted: {user_quiz.attempts}</p>
                <p className="mb-1">
                  Last score: {reformatScore(user_quiz.last_score) + "%"}
                </p>
                <p className="mb-1">
                  Last attempted: {reformatDate(user_quiz.created_at)}
                </p>
              </Link>
            </div>
          ))}

        <Pagination
          page_size={page_size}
          item_count={grouped_user_quizzes.length}
          current_page={current_page}
          onPageChange={this.handlePageChange}
        />
      </Spinner>
    );
  }
}

export default UserQuizIndex;
