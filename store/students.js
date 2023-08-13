import axios from "axios";

export const state = () => ({
  loading: false,
  student: {},
  students: [],
  idsStudents: [],
});

export const getters = {};

export const mutations = {
  SET_LOADING(state, value) {
    state.loading = value;
  },
  SET_STUDENTS(state, students) {
    state.students = students;
  },
  SET_IDS_STUDENTS(state, idsStudents) {
    const existingIds = new Set(state.idsStudents);
    const newIds = idsStudents.filter((id) => !existingIds.has(id));
    state.idsStudents = [...state.idsStudents, ...newIds];
  },
};

export const actions = {
  getAllStudents({ commit }) {
    commit("SET_LOADING", true);
    return axios
      .get(`${process.env.CECAR_API}/planner/students/`)
      .then((response) => {
        //console.log("getAllStudents", );
        if (response.data.students.length > 0) {
          console.log("getAllStudents", response.data);
          let { students, plans } = response.data;
          students.forEach((student) => {
            student.plansLengt = student.plans.length;
            student.plans.forEach((plan) => {
              student.history = plan.history.name;
              student.historyId = plan.history._id;
            });
            let field = `student_${student._id}`;
            student.path = plans[field];
          });
          console.log("SET_STUDENTS", students);
          commit("SET_STUDENTS", students);
        }
        commit("SET_LOADING", false);
      })
      .catch((error) => {
        console.error(error);
        commit("SET_LOADING", false);
        throw error; // Permite que el componente maneje el error si es necesario
      });
  },
  getStudent({ commit }, userId) {
    commit("SET_LOADING", true);

    return axios
      .get(`${process.env.CECAR_API}/planner/student/${userId}`)
      .then((response) => {
        console.log("getStudent", response.data);
        let { student, plans } = response.data;
        student.plans.forEach((plan) => {
          student.history = plan.history.name;
          student.historyId = plan.history._id;
        });
        let field = `student_${student._id}`;
        student.path = plans[field];
        commit("SET_STUDENTS", [student]);
        commit("SET_LOADING", false);
      })
      .catch((error) => {
        console.error(error);
        commit("SET_LOADING", false);
        throw error; // Permite que el componente maneje el error si es necesario
      });
  },
  updateStudents({ commit }, students) {
    commit("SET_STUDENTS", students);
  },
  updateIdsStudents({ commit }, idsStudents) {
    commit("SET_IDS_STUDENTS", idsStudents);
  },
};
