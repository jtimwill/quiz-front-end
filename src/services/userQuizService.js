import http from './httpService';

export function getQuizzes() {
  return http.get("/user-quizzes");
};

export function getQuiz(user_quiz_id) {
  return http.get(`/user-quizzes/${user_quiz_id}`);
};

export function saveQuiz(user_quiz_object) {
  return http.post("/user-quizzes", user_quiz_object });
};

export function deleteQuiz(user_quiz_id) {
  return http.delete(`/user-quizzes/${user_quiz_id}`);
};

export function updateQuiz(user_quiz_id, user_quiz_object) {
  return http.put(`/user-quizzes/${user_quiz_id}`, user_quiz_object);
};
