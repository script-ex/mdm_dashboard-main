import {
  Box,
  Checkbox,
  IconButton,
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
import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

const applyPagination = (
  organizations: any[],
  page: number,
  limit: number
): any[] => {
  return organizations.slice(page * limit, page * limit + limit);
};
export const OrganizationTable = ({ organizations }) => {
  const [selectedOrganizations, setSelectedOrganizations] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedOrganizations.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);

  const { t } = useTranslation();

  const handleSelectAllOrganizations = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedOrganizations(
      event.target.checked
        ? organizations.map((organization) => organization.id)
        : []
    );
  };

  const handleSelectOneOrganization = (
    event: ChangeEvent<HTMLInputElement>,
    organizationId: string
  ): void => {
    if (!selectedOrganizations.includes(organizationId)) {
      setSelectedOrganizations((prevSelected) => [
        ...prevSelected,
        organizationId
      ]);
    } else {
      setSelectedOrganizations((prevSelected) =>
        prevSelected.filter((id) => id !== organizationId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredOrganizations = organizations;
  const paginatedOrganizations = applyPagination(
    filteredOrganizations,
    page,
    limit
  );
  const selectedSomeOrganizations =
    selectedOrganizations.length > 0 &&
    selectedOrganizations.length < organizations.length;
  const selectedAllOrganizations =
    selectedOrganizations.length === organizations.length;
  const theme = useTheme();

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllOrganizations}
                  indeterminate={selectedSomeOrganizations}
                  onChange={handleSelectAllOrganizations}
                />
              </TableCell>
              <TableCell>{t('Organization ID')}</TableCell>
              <TableCell>{t('Name')}</TableCell>
              <TableCell>{t('Joined Date')}</TableCell>
              <TableCell>{t('Status')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedOrganizations.map((organization) => {
              const isOrganizationSelected = selectedOrganizations.includes(
                organization.id
              );
              return (
                <TableRow
                  hover
                  key={organization.id}
                  selected={isOrganizationSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isOrganizationSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneOrganization(event, organization.id)
                      }
                      value={isOrganizationSelected}
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
                      {organization.id}
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
                      {organization.name}
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
                      {organization.createdAt}
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
                      {organization.status ? t('Active') : t('Inactive')}
                    </Typography>
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
          count={filteredOrganizations.length}
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
