import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {
  Box,
  ButtonBase,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography
} from '@mui/material';
import { ApiService } from 'src/services/ApiService';
import { UserTable } from './UserTable';
import { useEffect, useState } from 'react';
import AddTwoTone from '@mui/icons-material/AddTwoTone';
import Upload from '@mui/icons-material/Upload';
import { useNavigate } from 'react-router';
import { ROUTES } from 'src/routes';
import styled from '@emotion/styled';
import { useCSVReader } from 'react-papaparse';
import { RootState, rootStoreSelector } from 'src/store';
import { useTranslation } from 'react-i18next';
import { es } from 'date-fns/locale';

const Input = styled('input')({
  display: 'none'
});

export default function UserOverview() {
  const { t, i18n } = useTranslation();

  const currentUser = rootStoreSelector((state: RootState) => state.auth.user);

  const [users, setUsers] = useState<any[]>([]);
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrganizationId, setSelectedOrganizationId] = useState<
    string | undefined
  >();
  useEffect(() => {
    if (currentUser?.isSuperAdmin) {
      ApiService.getOrganizations().then((res) => {
        setOrganizations([
          {
            id: 'all',
            name: t('ALL USERS')
          },
          ...res.data.data
        ]);
      });
    } else {
      setSelectedOrganizationId(currentUser?.organizationId);
    }
  }, [currentUser?.id]);
  const navigate = useNavigate();

  const handleNewUserClick = () => {
    navigate(ROUTES.USER.NEW);
  };

  const handleCSVUpload = async (results: any) => {
    const data = results.data
      .slice(1)
      .map((e: any) => {
        return {
          firstName: e[0],
          lastName: e[1],
          email: e[2],
          gender: e[3],
          role: e[4]
        };
      })
      .filter((e: any) => e.email);

    ApiService.signupBulk(data, selectedOrganizationId).then((res) => {
      setUsers(res.data?.data);
    });
  };

  const { CSVReader } = useCSVReader();

  const handleOrganizationChange = (event: SelectChangeEvent<string>) => {
    const orgId = event.target.value;
    if (orgId) {
      setSelectedOrganizationId(orgId);
    }
  };

  return (
    <>
      <Helmet>
        <title>
          {t('Users')} - {t('Overview')}
        </title>
      </Helmet>
      <PageTitleWrapper>
        <Grid container>
          <Typography variant="h3" sx={{ mb: 1 }}>
            {t('User Overview')}
          </Typography>
          <div
            className="d-flex"
            style={{
              marginLeft: 'auto'
            }}
          >
            {currentUser && currentUser?.isSuperAdmin && (
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
            )}
            <ButtonBase
              // onClick={() => handleBulkUserClick()}
              sx={{ ml: 'auto' }}
            >
              <CSVReader
                onUploadAccepted={(results: any) => {
                  handleCSVUpload(results);
                }}
              >
                {({
                  getRootProps,
                  acceptedFile,
                  ProgressBar,
                  getRemoveFileProps
                }: any) => (
                  <>
                    <Input
                      // accept csv

                      id="icon-button-file"
                      name="icon-button-file"
                      type="file"
                    />
                    <label htmlFor="icon-button-file">
                      <IconButton
                        {...getRootProps()}
                        component="span"
                        color="primary"
                      >
                        <Upload />

                        <Typography mx={1} variant="subtitle2">
                          {t('Add Bulk')}
                        </Typography>
                      </IconButton>
                    </label>
                  </>
                )}
              </CSVReader>
            </ButtonBase>
            <ButtonBase
              onClick={() => handleNewUserClick()}
              sx={{ ml: 'auto' }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: '8px 16px'
                }}
              >
                <AddTwoTone />

                <Typography mx={1} variant="subtitle2">
                  {t('Add')}
                </Typography>
              </div>
            </ButtonBase>
          </div>
        </Grid>
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <UserTable organizationId={selectedOrganizationId} />
      </Container>
    </>
  );
}
