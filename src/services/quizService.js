import http from './httpService';

export function getQuizzes() {
  return http.get("/quizzes");
};

export function getQuiz(quiz_id) {
  return http.get(`/quizzes/${quiz_id}`);
};

export function saveQuiz(quiz_object) {
  return http.post("/quizzes", quiz_object);
};

export function deleteQuiz(quiz_id) {
  return http.delete(`/quizzes/${quiz_id}`);
};

export function updateQuiz(quiz_id, quiz_object) {
  return http.put(`/quizzes/${quiz_id}`, quiz_object);
};
