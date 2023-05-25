import axios from "axios";
const baseURL = '';

const getAllPayloads = async (uuid) => {
  const response = await axios.get(`${baseURL}/hook/${uuid}`);

  return response.data;
};

const createBin = async () => {
  const response = await axios.post(`${baseURL}/hook/new`);

  return response.data;
};

const deleteBin = async (uuid) => {
  await axios.delete(`${baseURL}/${uuid}`);
};

const exported = {
  getAllPayloads,
  createBin,
  deleteBin,
};

export default exported;

