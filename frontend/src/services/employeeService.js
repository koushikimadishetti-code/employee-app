import axios from 'axios';

const API = '/api/employees';

const getHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});

export const getAllEmployees    = ()       => axios.get(API, getHeaders());
export const getEmployee        = (id)     => axios.get(`${API}/${id}`, getHeaders());
export const createEmployee     = (data)   => axios.post(API, data, getHeaders());
export const updateEmployee     = (id, data) => axios.put(`${API}/${id}`, data, getHeaders());
export const deleteEmployee     = (id)     => axios.delete(`${API}/${id}`, getHeaders());
export const searchEmployees    = (query)  => axios.get(`${API}/search?query=${query}`, getHeaders());
export const getByDepartment    = (dept)   => axios.get(`${API}/department/${dept}`, getHeaders());
