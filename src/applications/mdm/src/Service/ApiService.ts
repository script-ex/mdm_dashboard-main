import axios from 'axios';
import { CONFIG } from '../config';

export class ApiService {
  static jwt = '';

  static JWT_KEY = 'SDMS_JWT_KEY';

  static startService(jwt = '') {
    if (jwt && jwt.length > 0) {
      localStorage.setItem(this.JWT_KEY, jwt);
      this.jwt = jwt;
    } else {
      this.jwt = localStorage.getItem(this.JWT_KEY)?.toString();
    }
  }

  static postAuth(url: string, data: any) {
    return axios.post(url, data, {
      headers: {
        authorization: this.jwt
      }
    });
  }

  static setMdmId(mdmId) {
    localStorage.setItem('MDM_ID', mdmId);
  }

  static saveReport(report, fileName) {
    if (!this.jwt) {
      this.startService();
    }
    const url = `${CONFIG.API_URL}/user/mdm/new`;
    const data = {
      mdmInput: report,
      name: fileName
    };
    return axios.post(url, data, {
      headers: {
        Authorization: this.jwt
      }
    });
  }

  static getMDMById(id) {
    if (!this.jwt) {
      this.startService();
    }
    const url = `${CONFIG.API_URL}/user/mdm/${id}`;
    return axios.get(url, {
      headers: {
        Authorization: this.jwt
      }
    });
  }

  static updateMdmSessionName(id: string, sessionName: string) {
    return axios.put(
      `${CONFIG.API_URL}/user/mdm/${id}/session-name`,
      {
        sessionName
      },
      {
        headers: {
          Authorization: this.jwt
        }
      }
    );
  }

  static updateMdmSession(id: string, session: any) {
    return axios.put(`${CONFIG.API_URL}/user/mdm/${id}/session`, session, {
      headers: {
        Authorization: this.jwt
      }
    });
  }

  static getMDMReport(id: string) {
    return axios.get(`${CONFIG.API_URL}/user/mdm/${id}/report`, {
      headers: {
        Authorization: this.jwt
      }
    });
  }

  static createEmptyMDM() {
    return this.postAuth(`${CONFIG.API_URL}/user/mdm/new`, {
      name: 'Untitled',
      mdmInput: {}
    });
  }
}
