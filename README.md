# QuizTracker

## Project Description
This is a simple user interface for my Quiz API project. The structure of
this project is based on what I learned in the following course: https://codewithmosh.com/p/mastering-react

 The basic technology stack is:
* React (UI Library)
* Bootstrap (front-end component library)
* Joi-browser (user-input validation)
* React-router-dom (routing)

Additional resources that helped me:
* [Sort by date](https://stackoverflow.com/questions/10123953/sort-javascript-object-array-by-date)
* [Test for empty object](https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object)
* [Sticky footer](https://www.learnenough.com/css-and-layout-tutorial)
* [Protected Route Component](https://reacttraining.com/react-router/web/example/auth-workflow)
* [Sort by name](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
* [CSS Spinner](https://www.w3schools.com/howto/howto_css_loader.asp)
* [Media Queries](https://stackoverflow.com/questions/8549529/what-is-the-difference-between-screen-and-only-screen-in-media-queries)
* [Animated Dropdown](https://www.learnenough.com/css-and-layout-tutorial?single_page=1#sec-details-mobile-dropdown)
* [CSS Transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions#Defining_transitions)
* [Window.confirm](https://www.w3schools.com/jsref/met_win_confirm.asp)
* [Window.confirm in React](https://gist.github.com/primaryobjects/aacf6fa49823afb2f6ff065790a5b402)

## Project Setup
1. Install Node.js: https://nodejs.org/
2. Download project files
3. ``` $ cd quiz-frontend ``` # navigate to project's root directory
4. ``` $ npm i ``` # install the packages listed in package.json
5. ``` $ npm start ``` # start server
6. Done. If you have also setup the corresponding Quiz API project, you can navigate to http://localhost:3000/ to test the full project.

## Routes and Components
### Login/Logout
|URL|Corresponding Component|
|---|---|
/login|Login|
/logout|Logout|

### Users Resource
|URL|Corresponding Component|
|---|---|
/users/index|UserIndex|
/users/me/edit|UserNew|
/users/me/show|UserShow|

### Categories Resource
|URL|Corresponding Component|
|---|---|
/categories/index|CategoryIndex|
/categories/new|CategoryNew|
/categories/:id/edit|CategoryEdit|

### Quizzes Resource
|URL|Corresponding Component|
|---|---|
/quizzes/index|QuizIndex|
/quizzes/new|QuizNew|
/quizzes/:id/edit|QuizEdit|
/quizzes/:id/show|QuizShow|

### Questions Resource
|URL|Corresponding Component|
|---|---|
/questions/new|QuestionNew|
/questions/:id/edit|QuestionEdit|

### UserQuizzes Resource
|URL|Corresponding Component|
|---|---|
/user-quizzes/index|UserQuizIndex|
/user-quizzes/new|UserQuizNew|
/user-quizzes/:id/edit|UserQuizEdit|
/user-quizzes/:id/show|UserQuizShow|

### UserAnswers Resource
|URL|Corresponding Component|
|---|---|
/user-answers/:id/edit|UserAnswerEdit|

### Misc Components
|URL|Corresponding Component|
|---|---|
/|HomePage|
/not-found|NotFound|

## Services
These functions connect the React UI to the Node API.
### Auth Service
|Function|API URL|Result|
|---|---|---|
login|POST /login|Authenticate user, save JWT on client|
logout|N/A|Delete JWT from client|
loginWithJwt|N/A|Login without calling server|
getCurrentUser|N/A|Extract user data from JWT|
getJwt|N/A|Return JWT from client|

### HTTP Service
|Function|API URL|Result|
|---|---|---|
setJwt|N/A|Add JWT to request headers|

### User Service
|Function|API URL|Result|
|---|---|---|
getUsers|GET /users|Return all users|
getUser|GET /users/me|Return logged-in user|
saveUser|POST /users|Create new user|
deleteUser|DELETE /users/:id|Delete specified user|
updateUser|PUT /users/me|Update logged-in user|

### Category Service
|Function|API URL|Result|
|---|---|---|
getCategories|GET /categories|Return all categories|
getCategory|GET /categories/:id|Return specific category|
saveCategory|POST /categories|Create new category|
deleteCategory|DELETE /categories/:id|Delete specified category|
updateCategory|PUT /categories/:id|Update specified category|

### Quiz Service
|Function|API URL|Result|
|---|---|---|
getQuizzes|GET /quizzes|Return all quizzes|
getQuiz|GET /quizzes/:id|Return specific quiz|
saveQuiz|POST /quizzes|Create new quiz|
deleteQuiz|DELETE /quizzes/:id|Delete specified quiz|
updateQuiz|PUT /quizzes/:id|Update specified quiz|

### Question Service
|Function|API URL|Result|
|---|---|---|
getQuestions|GET /quizzes/:quizId/questions|Return all questions|
getQuestion|GET /quizzes/:quizId/questions/:id|Return specific question|
saveQuestion|POST /quizzes/:quizId/questions|Create new question|
deleteQuestion|DELETE /quizzes/:quizId/questions/:id|Delete specified question|
updateQuestion|PUT /quizzes/:quizId/questions/:id|Update specified question|

### UserQuiz Service
|Function|API URL|Result|
|---|---|---|
getUserQuizzes|GET /user-quizzes|Return all user-quizzes for current user|
getUserQuiz|GET /user-quizzes/:id|Return specific user-quiz for current user|
saveUserQuiz|POST /user-quizzes|Create new user-quiz for current user|
deleteUserQuiz|DELETE /user-quizzes/:id|Delete specified user-quiz|
updateUserQuiz|PUT /user-quizzes/:id|Update specified user-quiz|

### UserAnswer Service
|Function|API URL|Result|
|---|---|---|
deleteUserAnswer|DELETE /user-quizzes/:userQuizId/user-answers/:id|Delete specified user-answer|
updateUserAnswer|PUT /user-quizzes/:userQuizId/user-answers/:id|Update specified user-answer|
