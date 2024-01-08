import axios_api from "../axios/index";

const AuthService = {
  //isUserAdmin: false,

  //   getClientURL: function () {
  //     return "http://192.168.29.240:8002";
  //   },

  signUp: async function (user) {
    return axios_api.post("/auth/sign-up/", user);
  },

  getUserById: async function (userId) {
    return axios_api.get("/auth/user/" + userId);
  },

  sendEmailOTP: async function (email) {
    return axios_api.post("/auth/sendotp", { email: email });
  },

  verifyEmailOTP: async function (email, otp) {
    return axios_api.patch("/auth/email-verify", { email: email, otp: otp });
  },

  login: async function (email, password) {
    return axios_api.post("/auth/login", { email: email, password: password });
  },

  //   registerUser: async function (user) {
  //     return axios_api.post("/user/", user);
  //   },

  //   getBoardById: async function (boardId) {
  //     return axios_api.get(`/board/${boardId}/`);
  //   },

  //   isBoardAdminRegistered: async function (boardId) {
  //     return axios_api.get(`/board/${boardId}/isBoardAdminRegistered/`);
  //   },

  //   updateCreatedByInBoard: async function (boardId, userId) {
  //     return axios_api.put(`/board/created-by/${boardId}`, { createdBy: userId });
  //   },

  //   getUserByIdAndBoardId: async function (userId, boardId) {
  //     return axios_api.get(`/user/${userId}/board/${boardId}`);
  //   },

  //   getUsersByBoardId: async function (boardId) {
  //     return axios_api.get(`/user/board/${boardId}`);
  //   },

  //   showBoardPoints: async function (boardId, userId, showPoints) {
  //     const path = `/board/${boardId}/user/${userId}/show-point/${showPoints}`;
  //     console.log("showBoardPoints path =>", path);
  //     return axios_api.patch(path);
  //   },

  //   setBoardPoint: async function (userId, boardId, boardPoint) {
  //     const body = {
  //       boardPoint: boardPoint,
  //     };
  //     return axios_api.patch(`/user/${userId}/board/${boardId}`, body);
  //   },

  //   clearUsersBoardPoint: async function (boardId, userId) {
  //     return axios_api.patch(`/user/${userId}/board/${boardId}/clear-points`);
  //   },

  //   deleteUserById: async function (userId) {
  //     return axios_api.delete(`/user/${userId}`);
  //   },

  //   refreshBoard: async function (boardId) {
  //     return axios_api.get(`/board/${boardId}/refresh-board`);
  //   },

  //   getHistory: async function (boardId) {
  //     return axios_api.get(`history/board/${boardId}`);
  //   },

  //   showHistory: async function (boardId, userId, showHistory) {
  //     const path = `/board/${boardId}/user/${userId}/show-history/${showHistory}`;
  //     return axios_api.patch(path);
  //   },
};

export default AuthService;
