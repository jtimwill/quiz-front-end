import http from './httpService';

export function getQuestions(user_quiz_id) {
  return http.get(`/quizzes/${user_quiz_id}/questions`);
};

export function getQuestion(user_quiz_id, question_id) {
  return http.get(`/quizzes/${user_quiz_id}/questions/${question_id}`);
};

export function saveQuestion(user_quiz_id, question_object) {
  return http.post(`/quizzes/${user_quiz_id}/questions`, question_object);
};

export function deleteQuestion(user_quiz_id, question_id) {
  return http.delete(`/quizzes/${user_quiz_id}/questions/${question_id}`);
};

export function updateQuestion(user_quiz_id, question_id, question_object) {
  const path = `/quizzes/${user_quiz_id}/questions/${question_id}`;
  return http.put(path, question_object);
};
