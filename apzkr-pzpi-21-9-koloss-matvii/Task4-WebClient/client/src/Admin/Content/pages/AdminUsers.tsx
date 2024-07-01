import React, { useState, useEffect } from 'react'
import { Button } from '../../../components/UI/Button/Button';
import { Modal } from '../../../components/UI/Modal/Modal';
import { TableWrapper } from '../components/TableWrapper/TableWrapper';
import { UserCreateForm } from '../components/User/UserCreate/UserCreateForm';
import { getUsers } from '../http/userApi';
import tablePageClasses from '../styles/TablePage.module.css';
import tableWrapperCl from '../components/TableWrapper/TableWrapper.module.css';
import { UserDeleteForm } from '../components/User/UserDeleteForm/UserDeleteForm';
import { Loader } from '../../components/UI/Loader/Loader';
import { ADMIN_ROLE } from '../../../consts';
import { UserEditForm } from '../components/User/UserEditForm/UserEditForm';

export interface IUser {
  login: string,
  role: string,
}

const headColumns: string[] = [
    "Логін",
    "Ролі",
    "Котроллери"
  ];

export const AdminUsers = () => {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [deletableUser, setDeletableUser] = useState<IUser>();
    const [editableUser, setEditableUser] = useState<IUser>();
    const [users, setUsers] = useState<IUser[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
  
    const handleCloseCreateModal = () => setShowCreateModal(false);
    const handleShowCreateModal = () => setShowCreateModal(true);
    const handleShowDeleteModal = (user:IUser) => {
      setDeletableUser(user);
      setShowDeleteModal(true);
    }

    const handleCloseDeleteModal = () => setShowDeleteModal(false);

    const handleShowEditModal = (user:IUser) => {
      setEditableUser(user);
      setShowEditModal(true);
    }

    const handleCloseEditModal = () => setShowEditModal(false);

    useEffect(() => {
      fetchUsers()
    }, [])
  
    const fetchUsers = async () => {
      setLoading(true);
      await getUsers()
        .then((data) => setUsers(data))
        .catch(() => alert("Щось пішло не так, спробуйте ще раз"))
        .finally(() => setLoading(false));
    }
  
    return (
      <div className={tablePageClasses.container}>
      {loading && <Loader />}
        <Modal
          onClose={handleCloseCreateModal}
          show={showCreateModal}
          title="Створення акаунту"
        >
          <UserCreateForm fetchUsers={fetchUsers} handleCloseCreateModal={handleCloseCreateModal}></UserCreateForm>
        </Modal>
        <Modal
          onClose={handleCloseDeleteModal}
          show={showDeleteModal}
          title="Видалення менеджера"
        >
            <UserDeleteForm fetchUsers={fetchUsers} handleCloseDeleteModal={handleCloseDeleteModal} user={deletableUser}></UserDeleteForm>
        </Modal>
        <Modal
          onClose={handleCloseEditModal}
          show={showEditModal}
          title="Редагування паролю"
        >
            <UserEditForm fetchUsers={fetchUsers} handleCloseEditModal={handleCloseEditModal} user={editableUser}></UserEditForm>
        </Modal>
        <div className={tablePageClasses.content}>
          <div className={tablePageClasses.createButton}>
            <Button onClick={handleShowCreateModal} type="button" variant='primary'>
              Створити
            </Button>
          </div>
          <TableWrapper>
            <table>
              <thead>
                <tr>
                  {headColumns?.map((item) => (
                    <th key={item}>{item}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users?.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {Object.values(row).map((value, colIndex) => (
                      <td key={colIndex}>{value}</td>
                    ))}
                    <td>
                    <div className={tableWrapperCl.controlls}>
                      <div className={tableWrapperCl.button}><Button type="button" variant='warning' onClick={() => handleShowEditModal(row)}>Змінити пароль</Button></div>
                      {row.role !== ADMIN_ROLE && <div className={tableWrapperCl.button}><Button type="button" variant='danger' onClick={() => handleShowDeleteModal(row)}>Видалити</Button></div>}
                    </div>
                  </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableWrapper>
        </div>
      </div>
    )
}
