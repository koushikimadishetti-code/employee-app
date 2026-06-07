import axios from 'axios';

const BASE_URL = 'https://employee-app-production.up.railway.app/api/employees';
const employeeService = {
  getAll: () => axios.get(BASE_URL),

  getById: (id) => axios.get(`${BASE_URL}/${id}`),

  create: (employee) => axios.post(BASE_URL, employee),

  update: (id, employee) => axios.put(`${BASE_URL}/${id}`, employee),

  delete: (id) => axios.delete(`${BASE_URL}/${id}`),

  search: (query) => axios.get(`${BASE_URL}/search?query=${query}`),

  getByDepartment: (dept) => axios.get(`${BASE_URL}/department/${dept}`),
};

export default employeeService;
