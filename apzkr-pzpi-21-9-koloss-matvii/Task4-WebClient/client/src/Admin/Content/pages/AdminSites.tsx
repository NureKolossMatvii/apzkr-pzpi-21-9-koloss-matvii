import React, { useState, useMemo, useEffect } from 'react'
import { Button } from '../../../components/UI/Button/Button';
import { TableWrapper } from '../components/TableWrapper/TableWrapper';
import tablePageClasses from '../styles/TablePage.module.css';
import tableWrapperCl from '../components/TableWrapper/TableWrapper.module.css';
import { getSites } from '../http/siteApi';
import { Modal } from '../../../components/UI/Modal/Modal';
import { SiteCreateForm } from '../components/Site/SiteCreateForm/SiteCreateForm';
import { SiteDeleteForm } from '../components/Site/SiteDeleteForm/SiteDeleteForm';
import { SiteEditForm } from '../components/Site/SiteEditForm/SiteEditForm';
import { Loader } from '../../components/UI/Loader/Loader';

export interface ISite {
    id: number,
    name: string,
}

const headColumns:string[] = ["#", "Назва", "Контроллери"];

export const AdminSites = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false)
  const [deletableSite, setDeletableSite] = useState<ISite>();
  const [editableSite, setEditableSite] = useState<ISite>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleCloseCreateModal = () => setShowCreateModal(false);
  const handleShowCreateModal = () => setShowCreateModal(true);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = (site:ISite) => {
    setDeletableSite(site);
    setShowDeleteModal(true);
  }

  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowEditModal = (site:ISite) => {
    setEditableSite(site);
    setShowEditModal(true);
  }

  const [sites, setSites] = useState<ISite[]>([]);

  const filteredSites = useMemo<ISite[]>(() =>
    sites.map((site):ISite => ({ id: site.id, name: site.name })),
  [sites]
  );

  const fetchSites = async () => {
    setLoading(true);
    await getSites()
      .then((data) => setSites(data))
      .catch(() => alert("Щось пішло не так, спробуйте ще раз"))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetchSites();
  }, [])

  return (
    <div className={tablePageClasses.container}>
    {loading && <Loader />}
      <Modal
        onClose={handleCloseCreateModal}
        show={showCreateModal}
        title="Створення сайту"
      >
        <SiteCreateForm fetchSites={fetchSites} handleCloseCreateModal={handleCloseCreateModal}></SiteCreateForm>
      </Modal>
      <Modal
        onClose={handleCloseDeleteModal}
        show={showDeleteModal}
        title="Видалення сайту"
      >
        <SiteDeleteForm fetchSites={fetchSites} site={deletableSite} handleCloseDeleteModal={handleCloseDeleteModal}></SiteDeleteForm>
      </Modal>
      <Modal
        onClose={handleCloseEditModal}
        show={showEditModal}
        title="Редагування сайту"
      >
        <SiteEditForm fetchSites={fetchSites} site={editableSite} handleCloseEditModal={handleCloseEditModal}></SiteEditForm>
      </Modal>
      <div className={tablePageClasses.content}>
        <div className={tablePageClasses.createButton}>
          <Button onClick={handleShowCreateModal} type="button" variant="primary">
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
              {filteredSites?.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {Object.values(row).map((value, colIndex) => (
                    <td key={colIndex}>{value}</td>
                  ))}
                  <td>
                    <div className={tableWrapperCl.controlls}>
                      <div className={tableWrapperCl.button}><Button type="button" variant='warning' onClick={() => handleShowEditModal(row)}>Редагувати</Button></div>
                      <div className={tableWrapperCl.button}><Button type="button" variant='danger' onClick={() => handleShowDeleteModal(row)}>Видалити</Button></div>
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
