import { ApiService } from './ApiService';

export class DataService {
  private static organizations: any[] = [];

  static async getOrganizationById(id: string) {
    const cache = this.organizations.find((org) => org.id === id);

    if (cache) {
      return cache;
    }

    const org = await ApiService.getOrganizationById(id);

    this.organizations.push(org);

    return org;
  }
}
