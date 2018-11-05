import http from './httpService';

export function deleteQuiz(user_quiz_id, user_answer_id) {
  const path = `/user-quizzes/${user_quiz_id}/user-answers/${user_answer_id}`
  return http.delete(path);
};

export function updateQuiz(user_quiz_id, user_answer_id, user_answer_object) {
  const path = `/user-quizzes/${user_quiz_id}/user-answers/${user_answer_id}`
  return http.put(path, user_answer_object);
};
