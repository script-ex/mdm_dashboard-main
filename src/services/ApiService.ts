import axios from 'axios';
import { CONFIG } from '../config';

export class ApiService {
  static jwt = '';

  static JWT_KEY = 'SDMS_JWT_KEY';

  static startService() {
    this.jwt = localStorage.getItem(this.JWT_KEY)?.toString();
  }

  static getAuth(url: string) {
    return axios.get(url, {
      headers: {
        authorization: this.jwt
      }
    });
  }

  static postAuth(url: string, data: any) {
    return axios.post(url, data, {
      headers: {
        authorization: this.jwt
      }
    });
  }

  static putAuth(url: string, data: any) {
    return axios.put(url, data, {
      headers: {
        authorization: this.jwt
      }
    });
  }

  static deleteAuth(url: string) {
    return axios.delete(url, {
      headers: {
        authorization: this.jwt
      }
    });
  }

  static getMe() {
    return this.getAuth(`${CONFIG.API_URL}/user/auth/me`);
  }

  static login(data: any) {
    return axios.post(`${CONFIG.API_URL}/user/auth/login`, data);
  }

  static getAllMDMSessions() {
    return this.getAuth(`${CONFIG.API_URL}/user/mdm/all`);
  }

  static signup(data: any) {
    if (this.jwt) {
      return this.postAuth(`${CONFIG.API_URL}/user/auth/register`, data);
    }
    return axios.post(`${CONFIG.API_URL}/user/auth/register`, data);
  }

  static getOrganizations() {
    return this.getAuth(`${CONFIG.API_URL}/organization/all`);
  }

  static createOrganization(body: any) {
    return this.postAuth(`${CONFIG.API_URL}/organization/add`, body);
  }

  static getLicensePurchases() {
    return this.getAuth(`${CONFIG.API_URL}/license-purchase/all`);
  }

  static createLicensePurchase(body: any) {
    return this.postAuth(`${CONFIG.API_URL}/license-purchase/add`, body);
  }

  static getOrganizationById(id: string) {
    return this.getAuth(`${CONFIG.API_URL}/organization/id/${id}`);
  }

  static getUsersByOrganizationId(organizationId: string) {
    return this.getAuth(
      `${CONFIG.API_URL}/user/organization/${organizationId}`
    );
  }

  static getUsersByOrganizationIdWithoutLicense(
    licenseId: string,
    organizationId: string
  ) {
    return this.getAuth(
      `${CONFIG.API_URL}/user/organization/${organizationId}/without-license/${licenseId}`
    );
  }

  static getUsersInMyOrganizationWithMDMLicense() {
    return this.getAuth(`${CONFIG.API_URL}/user/mdm/other-users`);
  }

  static addUsersToLicensePurchase(userIds: string[], licenseId: string) {
    return this.postAuth(
      `${CONFIG.API_URL}/license-purchase/add-users/${licenseId}`,
      userIds
    );
  }

  static signupBulk(data: any, organizationId?: string) {
    return this.postAuth(`${CONFIG.API_URL}/user/organization/registerMany`, {
      users: data,
      organizationId
    });
  }

  static createEmptyMDM(title?: string) {
    return this.postAuth(`${CONFIG.API_URL}/user/mdm/new`, {
      name: title || 'Untitled',
      mdmInput: {}
    });
  }

  static fetchLatestMDM(createNewIfNoneExists = false) {
    return this.postAuth(
      `${CONFIG.API_URL}/user/mdm/latest?newIfNoneExists=${createNewIfNoneExists}`,
      {
        name: 'Untitled',
        mdmInput: {}
      }
    );
  }

  static updateMe(data: any) {
    return this.putAuth(`${CONFIG.API_URL}/user/auth/me`, data);
  }

  static updatePassword(data: any) {
    return this.putAuth(`${CONFIG.API_URL}/user/auth/me/password`, data);
  }

  static updateAvatar(form: any) {
    return this.putAuth(`${CONFIG.API_URL}/user/auth/me/avatar`, form);
  }

  static deleteMDMById(id: string) {
    return this.deleteAuth(`${CONFIG.API_URL}/user/mdm/${id}`);
  }

  static getAuthorizedSurveys() {
    return this.getAuth(`${CONFIG.API_URL}/user/organization/my-surveys`);
  }

  static updateShareMDM(id: string, data: any) {
    return this.putAuth(`${CONFIG.API_URL}/user/mdm/${id}/share`, data);
  }

  static updateUser(userId: string, data: any) {
    return this.putAuth(
      `${CONFIG.API_URL}/user/organization/user/${userId}`,
      data
    );
  }

  static getAllMDMSessionsByOrganizationId(organizationId: string) {
    return this.getAuth(
      `${CONFIG.API_URL}/user/mdm/organization/${organizationId}`
    );
  }
}
