import { useContext } from 'react';

import ApiContext from '../contexts/ApiContext';

const useApi = () => useContext(ApiContext);

export default useApi;
