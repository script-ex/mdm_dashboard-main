import {
  Box,
  Checkbox,
  IconButton,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { ApiService } from 'src/services/ApiService';
import { DataService } from 'src/services/DataService';
import { AddUsersToLicenseModal } from './AddUsersToLicenseModal';
import { PersonAdd, PlusOne } from '@mui/icons-material';

import { useTranslation } from 'react-i18next';

const applyPagination = (
  licensePurchases: any[],
  page: number,
  limit: number
): any[] => {
  return licensePurchases.slice(page * limit, page * limit + limit);
};
export const LicensePurchaseTable = () => {
  const [licensePurchases, setLicensePurchases] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [currentLicensePurchase, setCurrentLicensePurchase] = useState(null);
  const key = JSON.stringify(
    licensePurchases.map((e) => e.organizationId).sort()
  );
  const { t, i18n } = useTranslation();

  useEffect(() => {
    ApiService.getLicensePurchases().then((licensePurchases) => {
      setLicensePurchases(licensePurchases.data?.data);
    });
  }, []);

  useEffect(() => {
    Promise.all(
      licensePurchases.map((e) => {
        return DataService.getOrganizationById(e.organizationId).then((res) => {
          return res.data.data;
        });
      })
    ).then((res) => {
      setOrganizations(res);
    });
  }, [key]);
  const [selectedLicensePurchases, setSelectedLicensePurchases] = useState<
    string[]
  >([]);
  const selectedBulkActions = selectedLicensePurchases.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);

  const handleSelectAllLicensePurchases = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedLicensePurchases(
      event.target.checked
        ? licensePurchases.map((licensePurchase) => licensePurchase.id)
        : []
    );
  };

  const handleSelectOneLicensePurchase = (
    event: ChangeEvent<HTMLInputElement>,
    licensePurchaseId: string
  ): void => {
    if (!selectedLicensePurchases.includes(licensePurchaseId)) {
      setSelectedLicensePurchases((prevSelected) => [
        ...prevSelected,
        licensePurchaseId
      ]);
    } else {
      setSelectedLicensePurchases((prevSelected) =>
        prevSelected.filter((id) => id !== licensePurchaseId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredLicensePurchases = licensePurchases;
  const paginatedLicensePurchases = applyPagination(
    filteredLicensePurchases,
    page,
    limit
  );
  const selectedSomeLicensePurchases =
    selectedLicensePurchases.length > 0 &&
    selectedLicensePurchases.length < licensePurchases.length;
  const selectedAllLicensePurchases =
    selectedLicensePurchases.length === licensePurchases.length;
  const theme = useTheme();

  const getOrganizationById = (id) => {
    return organizations.find((e) => e.id === id);
  };
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);

    ApiService.getLicensePurchases().then((licensePurchases) => {
      setLicensePurchases(licensePurchases.data?.data);
    });
  };

  const handleAddUserToLicense = (licensePurchase) => {
    setCurrentLicensePurchase(licensePurchase);
    handleOpen();
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AddUsersToLicenseModal
          handleClose={handleClose}
          licensePurchase={currentLicensePurchase}
        />
      </Modal>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllLicensePurchases}
                  indeterminate={selectedSomeLicensePurchases}
                  onChange={handleSelectAllLicensePurchases}
                />
              </TableCell>
              <TableCell>{t('ID')}</TableCell>
              <TableCell>{t('Organization')}</TableCell>
              <TableCell>{t('Purchased Date')}</TableCell>
              <TableCell>{t('Product')}</TableCell>
              <TableCell>{t('Left Amount')}</TableCell>
              <TableCell>{t('Status')}</TableCell>
              <TableCell>{t('Action')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedLicensePurchases.map((licensePurchase) => {
              const isLicensePurchaseSelected =
                selectedLicensePurchases.includes(licensePurchase.id);
              return (
                <TableRow
                  hover
                  key={licensePurchase.id}
                  selected={isLicensePurchaseSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isLicensePurchaseSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneLicensePurchase(
                          event,
                          licensePurchase.id
                        )
                      }
                      value={isLicensePurchaseSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {licensePurchase.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {
                        getOrganizationById(licensePurchase.organizationId)
                          ?.name
                      }
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {licensePurchase.createdAt}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {licensePurchase.product}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {licensePurchase.left} / {licensePurchase.amount}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {licensePurchase.active ? t('Active') : t('Inactive')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Add Users" arrow>
                      <IconButton
                        onClick={() => handleAddUserToLicense(licensePurchase)}
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <PersonAdd fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredLicensePurchases.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </>
  );
};
