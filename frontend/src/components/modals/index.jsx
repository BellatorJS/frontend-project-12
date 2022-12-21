import ModalAdd from './ModalAdd.jsx';
import ModalRemove from './ModalRemove.jsx';
import ModalRename from './ModalRename.jsx';

const modals = {
  adding: ModalAdd,
  removing: ModalRemove,
  renaming: ModalRename,
};

export default (modalName) => modals[modalName];
