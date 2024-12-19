import { FC, ChangeEvent, useState, useEffect } from 'react';
import {
  Tooltip,
  Box,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Typography,
  useTheme,
  Modal,
  ButtonBase,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Avatar
} from '@mui/material';

import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import ShareIcon from '@mui/icons-material/Share';

import Label from 'src/components/Label';
import { IMDMSession } from 'src/models/IMDMSession';
import { ApiService } from 'src/services/ApiService';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { AddUsersToMySession } from './AddUsersToMySession';
import { RootState, rootStoreSelector } from 'src/store';
import { RemoveRedEyeOutlined } from '@mui/icons-material';

interface RecentOrdersTableProps {
  className?: string;
}

interface Filters {
  status?: IMDMSession['status'];
}

const getStatusLabel = (
  mdmSessionStatus: IMDMSession['status']
): JSX.Element => {
  const map = {
    failed: {
      text: 'Failed',
      color: 'error'
    },
    completed: {
      text: 'Completed',
      color: 'success'
    },
    pending: {
      text: 'Pending',
      color: 'warning'
    }
  };

  const { text, color }: any = map[mdmSessionStatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (
  mdmSessions: IMDMSession[],
  filters: Filters
): IMDMSession[] => {
  return mdmSessions.filter((mdmSession) => {
    let matches = true;

    if (filters.status && mdmSession.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  mdmSessions: any[],
  page: number,
  limit: number
): IMDMSession[] => {
  return mdmSessions.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable: FC<RecentOrdersTableProps> = () => {
  const [mdmSessions, setMDMSessions] = useState<IMDMSession[]>([]);
  const [_allMDMSessions, setAllMDMSessions] = useState<IMDMSession[]>([]);
  const [selectedMdmSessions, setSelectedMdmSessions] = useState<string[]>([]);
  const selectedBulkActions = selectedMdmSessions.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });
  const [organizations, setOrganizations] = useState([]);
  const [orgUsers, setOrgUsers] = useState<any[]>([]);
  const [selectedOrganizationId, setSelectedOrganizationId] = useState<
    string | undefined
  >();

  useEffect(() => {
    if (currentUser?.isSuperAdmin) {
      ApiService.getOrganizations().then((res) => {
        setOrganizations([
          {
            id: 'me',
            name: 'Me'
          },
          ...res.data.data
        ]);
      });
    }
    ApiService.getAllMDMSessions().then((res) => {
      setMDMSessions(res.data.data);
    });
  }, []);

  useEffect(() => {
    if (selectedOrganizationId && selectedOrganizationId !== 'me') {
      ApiService.getAllMDMSessionsByOrganizationId(selectedOrganizationId).then(
        (res) => {
          setMDMSessions(res.data.data);
          setAllMDMSessions(res.data.data);

          ApiService.getUsersByOrganizationId(selectedOrganizationId).then(
            (res) => {
              setOrgUsers(res.data.data);
            }
          );
        }
      );
    } else {
      ApiService.getAllMDMSessions().then((res) => {
        setMDMSessions(res.data.data);
        setAllMDMSessions(res.data.data);
      });
    }
  }, [selectedOrganizationId]);

  const [currentMDMSession, setCurrentMDMSession] = useState<IMDMSession>();

  const statusOptions = [
    {
      id: 'all',
      name: 'All'
    },
    {
      id: 'completed',
      name: 'Completed'
    },
    {
      id: 'pending',
      name: 'Pending'
    }
  ];

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
  };

  const handleSelectAllMdmSessions = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedMdmSessions(
      event.target.checked ? mdmSessions.map((mdmSession) => mdmSession.id) : []
    );
  };
  const currentUser = rootStoreSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  const handleSelectOneMdmSession = (
    event: ChangeEvent<HTMLInputElement>,
    mdmSessionId: string
  ): void => {
    if (!selectedMdmSessions.includes(mdmSessionId)) {
      setSelectedMdmSessions((prevSelected) => [...prevSelected, mdmSessionId]);
    } else {
      setSelectedMdmSessions((prevSelected) =>
        prevSelected.filter((id) => id !== mdmSessionId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredMdmSessions = applyFilters(mdmSessions, filters);
  const paginatedMdmSessions = applyPagination(
    filteredMdmSessions,
    page,
    limit
  );
  const selectedSomeMdmSessions =
    selectedMdmSessions.length > 0 &&
    selectedMdmSessions.length < mdmSessions.length;
  const selectedAllMdmSessions =
    selectedMdmSessions.length === mdmSessions.length;
  const theme = useTheme();

  const handleContinueSession = (sessionId: string) => {
    navigate('/surveys/mdm/' + sessionId + '/identify-the-issue');
  };

  const handleDeleteMDM = (sessionId: string) => {
    ApiService.deleteMDMById(sessionId)
      .then((res) => {
        if (res.status === 200) {
          window.location.reload();
        }
      })
      .catch((err) => {});
  };

  const { t } = useTranslation();
  const handleShareSession = (session: any) => {
    setCurrentMDMSession(session);
    handleOpen();
  };
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);

    ApiService.getAllMDMSessions().then((res) => {
      setMDMSessions(res.data.data);
    });
  };

  const handleUpdate = (session: any) => {
    setCurrentMDMSession(session);
  };

  const amIEditor = (session: any) => {
    return (
      currentUser?.isSuperAdmin ||
      session.userId === currentUser.id ||
      (session.sharedWithUsers &&
        session?.sharedWithUsers.find(
          (user) => user.userId === currentUser.id && user.role === 'EDITOR'
        ))
    );
  };

  const handleOrganizationChange = (event: SelectChangeEvent<string>) => {
    const orgId = event.target.value;
    if (orgId) {
      setSelectedOrganizationId(orgId);
    }
  };

  const handleUserChange = (event: SelectChangeEvent<string>) => {
    const userId = event.target.value;
    if (userId) {
      console.log(
        userId,
        _allMDMSessions.length,
        _allMDMSessions.map((e) => e.userId),
        _allMDMSessions.filter((session) => {
          return (
            session.userId === userId ||
            session.sharedWithUsers.find((user) => user.userId === userId)
          );
        })
      );
      setMDMSessions(
        _allMDMSessions.filter((session) => {
          return (
            session.userId === userId ||
            session.sharedWithUsers.find((user) => user.userId === userId)
          );
        })
      );
    }
  };

  const getOtherUsename = (mdmSession) => {
    let user = mdmSession.ownerUser;

    if (!user) {
      user = orgUsers.find((user) => user.id === mdmSession.userId);
    }
    if (user) {
      return (
        <Box display={'flex'} alignItems="center">
          <Avatar sx={{ width: 18, height: 18, mr: 1 }} src={user.avatarPath} />
          {user.firstName} {user.lastName}
        </Box>
      );
    }
    return 'Other';
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="Add User To Session"
        aria-describedby="Add User To Session"
      >
        <AddUsersToMySession
          handleUpdate={handleUpdate}
          handleClose={handleClose}
          mdmSession={currentMDMSession}
        />
      </Modal>
      {currentUser && currentUser?.isSuperAdmin && (
        <>
          <ButtonBase
            style={{
              width: '200px'
            }}
          >
            <FormControl fullWidth variant="outlined">
              <InputLabel>Organization</InputLabel>
              <Select
                onChange={handleOrganizationChange}
                label="Organization"
                autoWidth
              >
                {organizations.map((organization) => (
                  <MenuItem key={organization.id} value={organization.id}>
                    {organization.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </ButtonBase>
        </>
      )}
      {currentUser && currentUser?.isSuperAdmin && (
        <>
          <ButtonBase
            style={{
              width: '200px',
              marginLeft: '2rem'
            }}
          >
            <Select
              onChange={handleUserChange}
              placeholder="Users"
              aria-label="Users"
              label="Users"
              aria-placeholder="Users"
              fullWidth
            >
              {orgUsers.map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  <Box display={'flex'} alignItems="center">
                    <Avatar
                      sx={{ width: 18, height: 18, mr: 1 }}
                      src={user.avatarPath}
                    />
                    {user.firstName} {user.lastName}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </ButtonBase>
        </>
      )}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllMdmSessions}
                  indeterminate={selectedSomeMdmSessions}
                  onChange={handleSelectAllMdmSessions}
                />
              </TableCell>
              <TableCell>{t('Session ID')}</TableCell>
              <TableCell>{t('Name')}</TableCell>
              <TableCell>{t('Date')}</TableCell>
              <TableCell>{t('Status')}</TableCell>
              <TableCell>{t('Owned By')}</TableCell>
              <TableCell>{t('Actions')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedMdmSessions.map((mdmSession) => {
              const isMdmSessionSelected = selectedMdmSessions.includes(
                mdmSession.id
              );
              const amIEditorOfThisSession = amIEditor(mdmSession);
              return (
                <TableRow
                  hover
                  key={mdmSession.id}
                  selected={isMdmSessionSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isMdmSessionSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneMdmSession(event, mdmSession.id)
                      }
                      value={isMdmSessionSelected}
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
                      {mdmSession.id}
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
                      {mdmSession.reportName}
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
                      {mdmSession.createdAt}
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
                      {mdmSession.status}
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
                      {mdmSession.userId === currentUser.id
                        ? 'Me'
                        : getOtherUsename(mdmSession)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Tooltip
                      title={amIEditorOfThisSession ? 'Continue' : 'View'}
                      arrow
                    >
                      <IconButton
                        onClick={() => handleContinueSession(mdmSession.id)}
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        {amIEditorOfThisSession ? (
                          <PlayCircleFilledIcon fontSize="small" />
                        ) : (
                          <RemoveRedEyeOutlined fontSize="small" />
                        )}
                      </IconButton>
                    </Tooltip>
                    {mdmSession.userId === currentUser.id ? (
                      <>
                        <Tooltip title="Share" arrow>
                          <IconButton
                            onClick={() => handleShareSession(mdmSession)}
                            sx={{
                              '&:hover': {
                                background: theme.colors.primary.lighter
                              },
                              color: theme.palette.primary.main
                            }}
                            color="inherit"
                            size="small"
                          >
                            <ShareIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete" arrow>
                          <IconButton
                            sx={{
                              '&:hover': {
                                background: theme.colors.error.lighter
                              },
                              color: theme.palette.error.main
                            }}
                            color="inherit"
                            size="small"
                            onClick={() => handleDeleteMDM(mdmSession.id)}
                          >
                            <DeleteTwoToneIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </>
                    ) : null}
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
          count={filteredMdmSessions.length}
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

RecentOrdersTable.propTypes = {};

RecentOrdersTable.defaultProps = {};

export default RecentOrdersTable;
