
import api from '../api/axios';

 const AlertPost = async (data:any) => {
  const response = await api.post('chart-alert/alerts', data);
  return response;
};
export default AlertPost