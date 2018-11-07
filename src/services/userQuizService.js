import http from './httpService';

export function getUserQuizzes() {
  return http.get("/user-quizzes");
};

export function getUserQuiz(user_quiz_id) {
  return http.get(`/user-quizzes/${user_quiz_id}`);
};

export function saveUserQuiz(user_quiz_object) {
  return http.post("/user-quizzes", user_quiz_object);
};

export function deleteUserQuiz(user_quiz_id) {
  return http.delete(`/user-quizzes/${user_quiz_id}`);
};

export function updateUserQuiz(user_quiz_id, user_quiz_object) {
  return http.put(`/user-quizzes/${user_quiz_id}`, user_quiz_object);
};
