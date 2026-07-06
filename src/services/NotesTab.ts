
import api from '../api/axios';

 const NotesTab = async (data:any) => {
  const response = await api.post('/notes', data);
  return response;
};
export default NotesTab